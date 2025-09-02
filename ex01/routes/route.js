//@ Importa as bibliotecas e arquivos
const express = require("express");
const routerApp = express.Router();
const calc = require("../controller/calculadora");

//@ Configura as rotas para corresponder ao arquivo de teste
routerApp.post("/fCalculo", calc.fCalculo);

//@ Exporta a variável com as rotas
module.exports = routerApp;