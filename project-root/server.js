"use strict";

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const clientesRoutes = require("./routes/clientesRoutes");

const serverPort = 8080;

// Cria o aplicativo express
const app = express();

// Carrega o documento do Swagger
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "api", "openapi.yaml"), "utf8")
);

// Middleware para analisar JSON
app.use(express.json());

// Middleware para o Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Utiliza suas rotas
app.use("/", clientesRoutes);

// Iniciando o servidor
http.createServer(app).listen(serverPort, () => {
  console.log(`Seu servidor está ouvindo na porta ${serverPort}`);
  console.log(
    `Swagger-ui está disponível em http://localhost:${serverPort}/api-docs`
  );
});
