
import UsuarioEntity from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";


export default class UsuarioController {

    #repo;
    constructor() {
        this.#repo = new UsuarioRepository();
    }

    async cadastrar(req, res) {
        try {
            let { nome, email, senha } = req.body;
            if(!nome || !email || !senha) return res.status(400).json({ msg: "Todos os parametros são necessarios!" });

            let entidade = new UsuarioEntity(0, nome, email, senha);
            let resultCadastro = await this.#repo.cadastrar(entidade);

            if(resultCadastro) return res.status(201).json(resultCadastro);
            throw new Error("Falha ao salvar no banco de dados.");
        } catch(err) {
            console.log(err);
            return res.status(500).json({ msg: "Erro interno no servidor!" });
        }
    }

    async login(req, res) {
        try {
            let { email, senha } = req.body;
            if(!email || !senha) return res.status(400).json({ msg: "Todos os parametros são necessarios!" });

            let usuario = await this.#repo.login(email, senha);
            if(usuario.usu_id !== 0) {
                return res.status(200).json(usuario);
            } else {
                return res.status(400).json({ msg: "Usuario falha!" });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({ msg: "Erro interno no servidor!" });
        }
    }

}