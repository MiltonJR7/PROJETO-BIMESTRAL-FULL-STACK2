
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API para criação do projeto bimestral do jogo Black Jack.",
        description: "Documentação do back end do projeto."
    },
    host: "localhost:5000"
}

const outputFile = "./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc)
.then(async () => {
    await import("./server.js");
});