
import Entity from "./entity.js";
import UsuarioEntity from "./usuarioEntity.js";


export default class SalaEntity extends Entity {

    #id;
    #nome;
    #usuID;

    get id() { return this.#id; } set id(value) { this.#id = value; }
    get nome() { return this.#nome; } set nome(value) { this.#nome = value; }
    get usuID() { return this.#usuID; } set usuID(value) { this.#usuID = value; }

    constructor(id, nome, usuID) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#usuID = usuID;
    }

    static toMap(row) {
        return new SalaEntity(row["sal_id"], row["sal_nome"], new UsuarioEntity(row["usu_id"]));
    }
}