
import Entity from "./entity.js";
import SalaEntity from "./salaEntity.js";
import UsuarioEntity from "./usuarioEntity.js";


export default class ParticipanteEntity extends Entity {

    #id;
    #dataEntrada;
    #dataSaida;
    #ordem;
    #saldo;
    #salID;
    #usuID;

    get id() { return this.#id; } set id(value) { this.#id = value; }
    get dataEntrada() { return this.#dataEntrada; } set dataEntrada(value) { this.#dataEntrada = value; }
    get dataSaida() { return this.#dataSaida; } set dataSaida(value) { this.#dataSaida = value; }
    get ordem() { return this.#ordem; } set ordem(value) { this.#ordem = value; }
    get saldo() { return this.#saldo; } set saldo(value) { this.#saldo = value; }
    get salID() { return this.#salID; } set salID(value) { this.#salID = value; }
    get usuID() { return this.#usuID; } set usuID(value) { this.#usuID = value; }
    
    constructor(id, dataEntrada, dataSaida, ordem, saldo, salID, usuID) {
        super();
        this.#id = id;
        this.#dataEntrada = dataEntrada;
        this.#dataSaida = dataSaida;
        this.#ordem = ordem;
        this.#saldo = saldo;
        this.#salID = salID;
        this.#usuID = usuID;
    }

    static toMap(row) {
        return new ParticipanteEntity(row['par_id'], row['par_dtentrada'], row['par_dtsaida'], row['par_ordem'], row['par_saldo'], new SalaEntity(row['sal_id']), new UsuarioEntity(row['usu_id']));
    }
}