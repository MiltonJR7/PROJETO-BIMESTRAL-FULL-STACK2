
import Database from "../db/database.js";
import ParticipanteEntity from "../entities/participanteEntity.js";
import SalaEntity from "../entities/salaEntity.js";
import ParticipanteRepository from "../repositories/participanteRepository.js";
import SalaRepository from "../repositories/salaRepository.js";


export default class SalaController {

    #salaRepo;
    #participanteRepo;
    constructor() {
        this.#salaRepo = new SalaRepository();
        this.#participanteRepo = new ParticipanteRepository();
    }

    async criar(req, res) {
        let banco = new Database();

        try {
            let { nome } = req.body;
            let id = req.usuario.id;
            if(!nome || !id) return res.status(400).json({ msg: "Todos os parametros são necessarios!" });

            await banco.AbreTransacao();

            this.#salaRepo.banco = banco;
            this.#participanteRepo.banco = banco;

            let entidadeSala = new SalaEntity(0, nome, id);
            let idSala = await this.#salaRepo.criar(entidadeSala);

            if(idSala) {
                let entidadePart = new ParticipanteEntity(0, null, null, null, null, idSala, id);
                let resultPaticipante = await this.#participanteRepo.inserirParticipante(entidadePart);

                if(resultPaticipante) {
                    await banco.Commit();
                    return res.status(201).json(resultPaticipante);
                } else {
                    return res.status(400).json({ msg: "Não foi possivel concluir o processo de inicialização de participante." });
                }

            } else {
                throw new Error("Falha na criação da sala! Tente novamente.");
            }

        } catch(err) {
            console.log(err);
            await banco.Rollback();
            return res.status(500).json({ msg: "Erro interno no servidor!" });
        }
    }

    async listar(req, res) {
        try {
            let result = await this.#salaRepo.listar();

            if(result) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json({ msg: "Falha teste --- preciso trocar isso depois." })
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({ msg: "Erro interno no servidor!" });
        }
    }

}