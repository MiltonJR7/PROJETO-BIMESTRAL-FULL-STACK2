
import Database from '../db/database.js';
import UsuarioEntity from '../entities/usuarioEntity.js';

export default class UsuarioRepository {

    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async cadastrar(entidade) {
        let sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha) values (?, ?, ?)";
        let values = [entidade.nome, entidade.email, entidade.senha];
        let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, values);

        if(idGerado) {
            entidade.id = idGerado;
            return true;
        }
        return false;
    }

    async login(email, senha) {
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let values = [email, senha];
        let rows = await this.#banco.ExecutaComando(sql, values);



        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        };
        return false; 
    }

    async obterPorId(id) {
        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];
        let rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        }
        return null;
    }

}