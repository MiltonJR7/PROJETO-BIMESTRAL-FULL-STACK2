

import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = express.Router();
const controller = new UsuarioController();

router.post("/login", (req, res)=> {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Função para login de usuario no sistema'
    controller.login(req, res);
});

router.post("/register", (req, res)=> {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = 'Função para cadastro de usuario no sistema'
    controller.cadastrar(req, res);
});

export default router;