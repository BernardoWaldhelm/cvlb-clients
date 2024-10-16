"use strict";

const sqlite3 = require("sqlite3").verbose();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database("./db.js", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");

    // Cria a tabela Clientes, se não existir
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
        } else {
          db.get("SELECT COUNT(*) as count FROM Clientes", (err, row) => {
            if (err) {
              console.error("Erro ao contar registros:", err.message);
            } else if (row.count <= 10) {
              const clientes = [
                {
                  docNumber: 12345678901,
                  nome: "João",
                  sobrenome: "Silva",
                  email: "joao.silva@example.com",
                  telefone: "(12) 34567-8901",
                  nascimento: "1990-05-20",
                },
                {
                  docNumber: 10987654321,
                  nome: "Maria",
                  sobrenome: "Fernandes",
                  email: "maria.fernandes@example.com",
                  telefone: "(98) 76543-2109",
                  nascimento: "1985-10-10",
                },
                {
                  docNumber: 32112345678,
                  nome: "Pedro",
                  sobrenome: "Souza",
                  email: "pedro.souza@example.com",
                  telefone: "(11) 22334-4455",
                  nascimento: "1993-01-15",
                },
                {
                  docNumber: 45678912300,
                  nome: "Ana",
                  sobrenome: "Pereira",
                  email: "ana.pereira@example.com",
                  telefone: "(99) 88776-5543",
                  nascimento: "1987-03-25",
                },
                {
                  docNumber: 78901234567,
                  nome: "Lucas",
                  sobrenome: "Gomes",
                  email: "lucas.gomes@example.com",
                  telefone: "(11) 98877-6655",
                  nascimento: "1992-12-30",
                },
                {
                  docNumber: 23456789012,
                  nome: "Mariana",
                  sobrenome: "Oliveira",
                  email: "mariana.oliveira@example.com",
                  telefone: "(22) 11334-4455",
                  nascimento: "1980-07-10",
                },
                {
                  docNumber: 34567890123,
                  nome: "Carlos",
                  sobrenome: "Santos",
                  email: "carlos.santos@example.com",
                  telefone: "(33) 22556-6699",
                  nascimento: "1975-02-17",
                },
                {
                  docNumber: 45678901234,
                  nome: "Fernanda",
                  sobrenome: "Costa",
                  email: "fernanda.costa@example.com",
                  telefone: "(44) 55667-7788",
                  nascimento: "1995-11-11",
                },
                {
                  docNumber: 56789012345,
                  nome: "Felipe",
                  sobrenome: "Almeida",
                  email: "felipe.almeida@example.com",
                  telefone: "(55) 66778-8899",
                  nascimento: "2000-08-08",
                },
                {
                  docNumber: 67890123456,
                  nome: "Beatriz",
                  sobrenome: "Moura",
                  email: "beatriz.moura@example.com",
                  telefone: "(66) 77889-9000",
                  nascimento: "1999-01-20",
                },
                {
                  docNumber: 78901234567,
                  nome: "Rafael",
                  sobrenome: "Cardoso",
                  email: "rafael.cardoso@example.com",
                  telefone: "(77) 88990-0111",
                  nascimento: "1984-04-18",
                },
                {
                  docNumber: 89012345678,
                  nome: "Patrícia",
                  sobrenome: "Mendes",
                  email: "patricia.mendes@example.com",
                  telefone: "(88) 99001-1222",
                  nascimento: "1983-06-06",
                },
                {
                  docNumber: 90123456789,
                  nome: "Thiago",
                  sobrenome: "Ribeiro",
                  email: "thiago.ribeiro@example.com",
                  telefone: "(99) 00112-2333",
                  nascimento: "1991-09-09",
                },
                {
                  docNumber: 11234567890,
                  nome: "Camila",
                  sobrenome: "Faria",
                  email: "camila.faria@example.com",
                  telefone: "(10) 11223-3444",
                  nascimento: "1996-10-21",
                },
                {
                  docNumber: 22345678901,
                  nome: "Juliana",
                  sobrenome: "Araújo",
                  email: "juliana.araujo@example.com",
                  telefone: "(11) 22334-4555",
                  nascimento: "1990-12-12",
                },
                {
                  docNumber: 33456789012,
                  nome: "Ricardo",
                  sobrenome: "Martins",
                  email: "ricardo.martins@example.com",
                  telefone: "(22) 33445-5666",
                  nascimento: "1978-05-05",
                },
                {
                  docNumber: 44567890123,
                  nome: "Larissa",
                  sobrenome: "Ferreira",
                  email: "larissa.ferreira@example.com",
                  telefone: "(33) 44556-6777",
                  nascimento: "2002-07-07",
                },
                {
                  docNumber: 55678901234,
                  nome: "Rodrigo",
                  sobrenome: "Barbosa",
                  email: "rodrigo.barbosa@example.com",
                  telefone: "(44) 55667-7888",
                  nascimento: "1981-08-30",
                },
                {
                  docNumber: 66789012345,
                  nome: "Eduardo",
                  sobrenome: "Pinto",
                  email: "eduardo.pinto@example.com",
                  telefone: "(55) 66778-8999",
                  nascimento: "1989-03-03",
                },
                {
                  docNumber: 77890123456,
                  nome: "Viviane",
                  sobrenome: "Rocha",
                  email: "viviane.rocha@example.com",
                  telefone: "(66) 77889-9000",
                  nascimento: "1997-02-14",
                },
              ];

              const insertQuery = `INSERT INTO Clientes (docNumber, nome, sobrenome, email, telefone, nascimento) VALUES (?, ?, ?, ?, ?, ?)`;
              clientes.forEach((cliente) => {
                db.run(insertQuery, [
                  cliente.docNumber,
                  cliente.nome,
                  cliente.sobrenome,
                  cliente.email,
                  cliente.telefone,
                  cliente.nascimento,
                ]);
              });
            }
          });
        }
      }
    );
  }
});

module.exports = db;
