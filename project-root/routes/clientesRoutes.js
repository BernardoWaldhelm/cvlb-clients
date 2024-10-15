"use strict";

const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesControlles");

router.get("/clientes", clientesController.getAllClientes);
router.post("/novoCliente", clientesController.addCliente);
router.get("/clientes/:docNumber", clientesController.getClienteByDocNumber);
router.put("/clientes/:docNumber", clientesController.updateCliente);
router.delete("/clientes/:docNumber", clientesController.deleteCliente);

module.exports = router;
