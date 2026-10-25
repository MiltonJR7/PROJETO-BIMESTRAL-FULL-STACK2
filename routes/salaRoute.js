

import express from 'express';
import SalaController from '../controllers/salaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const controller = new SalaController();
let auth = new AuthMiddleware();

router.post("/", auth.validar, (req, res)=> {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Função para criar salas do jogo'
    controller.criar(req, res);
});

router.get("/", auth.validar, (req, res)=> {
    // #swagger.tags = ['Salas']
    // #swagger.summary = 'Função para listar salas do jogo existentes'
    controller.listar(req, res);
});

export default router;