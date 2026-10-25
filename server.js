

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import http from 'http'
const server = http.createServer(app);

import { Server } from 'socket.io'
import socketInit from './sockets/socket.js';

import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

import usuarioRoute from './routes/usuarioRoute.js';
import salaRoute from './routes/salaRoute.js';

const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const io = new Server(server);
socketInit(io);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

app.use('/usuario', usuarioRoute);
app.use('/salas', salaRoute);

const port = 5000;
server.listen(port, function() {
    console.log(`Backend em execução na porta ${port}.`);
});
