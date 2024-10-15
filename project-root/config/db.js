"use strict";

const sqlite3 = require("sqlite3").verbose();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database("./db.js", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");

    db.run(
      `CREATE TABLE IF NOT EXISTS Clientes (
            docNumber INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            sobrenome TEXT,
            email TEXT NOT NULL,
            telefone TEXT,
            nascimento DATE
        )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela:", err.message);
        }
      }
    );
  }
});

module.exports = db;
