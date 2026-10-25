
import Database from "../db/database.js";
import SalaEntity from "../entities/salaEntity.js";


export default class SalaRepository {

    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async criar(entidade) {
        let sql = "insert into tb_sala (sal_nome, usu_id) values (?, ?)";
        let values = [entidade.nome, entidade.usuID];
        let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, values);

        if(idGerado) {
            entidade.id = idGerado;
            return idGerado;
        }
        return null;
    }

    async listar() {
        let sql = "select * from tb_sala";
        let rows = await this.#banco.ExecutaComando(sql);
        let lista = [];

        if(rows.length > 0) {
            for(let i = 0; i < rows.length; i++) {
                lista.push(SalaEntity.toMap(rows[i]));
            }
            return lista;
        }
        return null;
    }

    async buscaPorID(id) {

    }
}