
import Database from "../db/database.js";


export default class ParticipanteRepository {
    
    #banco;
    constructor() {
        this.#banco = new Database();
    }

    async inserirParticipante(entidade) {
        let sql = "insert into tb_participante (par_dtentrada, par_ordem, par_saldo, sal_id, usu_id) values (NOW(), 1, 1000, ?, ?)";
        let values = [entidade.salID, entidade.usuID];
        let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, values);

        if(idGerado) {
            entidade.id = idGerado;
            return true;
        }
        return false;
    }
}