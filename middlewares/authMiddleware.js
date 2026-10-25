

import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UsuarioRepository from '../repositories/usuarioRepository.js';

const SEGREDO = process.env.SEGREDO_JWT;

export default class AuthMiddleware {

    gerarJWT(id, nome, email) {
        let token = jwt.sign({ id, nome, email }, SEGREDO);
        return token;
    }

    async validar(req, res, next) {
        let token = req.cookies['token-projeto'];

        if(token) {
            let payload = jwt.verify(token, SEGREDO);
            let idUsuario = payload.id;
            
            let repo = new UsuarioRepository();
            let usuarioEncontrado = await repo.obterPorId(idUsuario);

            if(usuarioEncontrado){
                req.usuario = usuarioEncontrado;
                next();
            }
            else{
                return res.status(404).json({msg: "Usuário não encontrado!"});
            }
        }
        else {
            return res.status(401).json({msg: "Token inexistente!"});
        }
    }
}