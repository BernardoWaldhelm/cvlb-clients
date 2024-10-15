"use strict";

const db = require("../config/db");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       required:
 *         - docNumber
 *         - nome
 *         - email
 *       type: object
 *       properties:
 *         docNumber:
 *           type: integer
 *           example: 128
 *         nome:
 *           type: string
 *           example: José
 *         sobrenome:
 *           type: string
 *           example: da Silva
 *         email:
 *           type: string
 *           format: email
 *           example: silva@mail.com
 *         telefone:
 *           type: string
 *           example: "2299999999"
 *         nascimento:
 *           type: string
 *           format: date
 *           example: 2001-08-31
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     responses:
 *       200:
 *         description: Um vetor json de objetos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
exports.getAllClientes = (req, res) => {
  const query = "SELECT * FROM Clientes";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};

/**
 * @swagger
 * /novoCliente:
 *   post:
 *     summary: Adiciona um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro no cadastro do cliente
 */
exports.addCliente = (req, res) => {
  const { docNumber, nome, sobrenome, email, telefone, nascimento } = req.body;

  if (!req.body) {
    return res
      .status(400)
      .json({ message: "O corpo da requisição não pode estar vazio." });
  }

  const query =
    "INSERT INTO Clientes (docNumber, nome, sobrenome, email, telefone, nascimento) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(
    query,
    [docNumber, nome, sobrenome, email, telefone, nascimento],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "Erro ao cadastrar cliente" });
      }
      res
        .status(200)
        .json({ docNumber, nome, sobrenome, email, telefone, nascimento });
    }
  );
};

/**
 * @swagger
 * /clientes/{docNumber}:
 *   get:
 *     summary: Retorna um cliente pelo seu docNumber
 *     parameters:
 *       - name: docNumber
 *         in: path
 *         required: true
 *         description: O número do documento do cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Documento JSON contendo os dados de um cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */
exports.getClienteByDocNumber = (req, res) => {
  const docNumber = req.params.docNumber;
  const query = "SELECT * FROM Clientes WHERE docNumber = ?";

  db.get(query, [docNumber], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.status(200).json(row);
  });
};

/**
 * @swagger
 * /clientes/{docNumber}:
 *   put:
 *     summary: Edita um cliente pelo seu docNumber
 *     parameters:
 *       - name: docNumber
 *         in: path
 *         required: true
 *         description: O número do documento do cliente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */
exports.updateCliente = (req, res) => {
  const docNumber = req.params.docNumber;
  const { nome, sobrenome, email, telefone, nascimento } = req.body;

  const query =
    "UPDATE Clientes SET nome = ?, sobrenome = ?, email = ?, telefone = ?, nascimento = ? WHERE docNumber = ?";
  db.run(
    query,
    [nome, sobrenome, email, telefone, nascimento, docNumber],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "Erro ao atualizar cliente" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
      res
        .status(200)
        .json({ docNumber, nome, sobrenome, email, telefone, nascimento });
    }
  );
};

/**
 * @swagger
 * /clientes/{docNumber}:
 *   delete:
 *     summary: Remove um cliente pelo seu docNumber
 *     parameters:
 *       - name: docNumber
 *         in: path
 *         required: true
 *         description: O número do documento do cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
exports.deleteCliente = (req, res) => {
  const docNumber = req.params.docNumber;
  const query = "DELETE FROM Clientes WHERE docNumber = ?";

  db.run(query, [docNumber], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.status(200).json({ message: "Cliente removido com sucesso" });
  });
};
