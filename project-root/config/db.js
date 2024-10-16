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
                  docNumber: 1,
                  nome: "João",
                  sobrenome: "Silva",
                  email: "joao.silva@example.com",
                  telefone: "123456789",
                  nascimento: "1990-05-20",
                },
                {
                  docNumber: 2,
                  nome: "Maria",
                  sobrenome: "Fernandes",
                  email: "maria.fernandes@example.com",
                  telefone: "987654321",
                  nascimento: "1985-10-10",
                },
                {
                  docNumber: 3,
                  nome: "Pedro",
                  sobrenome: "Souza",
                  email: "pedro.souza@example.com",
                  telefone: "1122334455",
                  nascimento: "1993-01-15",
                },
                {
                  docNumber: 4,
                  nome: "Ana",
                  sobrenome: "Pereira",
                  email: "ana.pereira@example.com",
                  telefone: "998877665",
                  nascimento: "1987-03-25",
                },
                {
                  docNumber: 5,
                  nome: "Lucas",
                  sobrenome: "Gomes",
                  email: "lucas.gomes@example.com",
                  telefone: "11988776655",
                  nascimento: "1992-12-30",
                },
                {
                  docNumber: 6,
                  nome: "Mariana",
                  sobrenome: "Oliveira",
                  email: "mariana.oliveira@example.com",
                  telefone: "2211334455",
                  nascimento: "1980-07-10",
                },
                {
                  docNumber: 7,
                  nome: "Carlos",
                  sobrenome: "Santos",
                  email: "carlos.santos@example.com",
                  telefone: "3322556699",
                  nascimento: "1975-02-17",
                },
                {
                  docNumber: 8,
                  nome: "Fernanda",
                  sobrenome: "Costa",
                  email: "fernanda.costa@example.com",
                  telefone: "4455667788",
                  nascimento: "1995-11-11",
                },
                {
                  docNumber: 9,
                  nome: "Felipe",
                  sobrenome: "Almeida",
                  email: "felipe.almeida@example.com",
                  telefone: "5566778899",
                  nascimento: "2000-08-08",
                },
                {
                  docNumber: 10,
                  nome: "Beatriz",
                  sobrenome: "Moura",
                  email: "beatriz.moura@example.com",
                  telefone: "6677889900",
                  nascimento: "1999-01-20",
                },
                {
                  docNumber: 11,
                  nome: "Rafael",
                  sobrenome: "Cardoso",
                  email: "rafael.cardoso@example.com",
                  telefone: "7788990011",
                  nascimento: "1984-04-18",
                },
                {
                  docNumber: 12,
                  nome: "Patrícia",
                  sobrenome: "Mendes",
                  email: "patricia.mendes@example.com",
                  telefone: "8899001122",
                  nascimento: "1983-06-06",
                },
                {
                  docNumber: 13,
                  nome: "Thiago",
                  sobrenome: "Ribeiro",
                  email: "thiago.ribeiro@example.com",
                  telefone: "9900112233",
                  nascimento: "1991-09-09",
                },
                {
                  docNumber: 14,
                  nome: "Camila",
                  sobrenome: "Faria",
                  email: "camila.faria@example.com",
                  telefone: "0011223344",
                  nascimento: "1996-10-21",
                },
                {
                  docNumber: 15,
                  nome: "Juliana",
                  sobrenome: "Araújo",
                  email: "juliana.araujo@example.com",
                  telefone: "1122334455",
                  nascimento: "1990-12-12",
                },
                {
                  docNumber: 16,
                  nome: "Ricardo",
                  sobrenome: "Martins",
                  email: "ricardo.martins@example.com",
                  telefone: "2233445566",
                  nascimento: "1978-05-05",
                },
                {
                  docNumber: 17,
                  nome: "Larissa",
                  sobrenome: "Ferreira",
                  email: "larissa.ferreira@example.com",
                  telefone: "3344556677",
                  nascimento: "2002-07-07",
                },
                {
                  docNumber: 18,
                  nome: "Rodrigo",
                  sobrenome: "Barbosa",
                  email: "rodrigo.barbosa@example.com",
                  telefone: "4455667788",
                  nascimento: "1981-08-30",
                },
                {
                  docNumber: 19,
                  nome: "Eduardo",
                  sobrenome: "Pinto",
                  email: "eduardo.pinto@example.com",
                  telefone: "5566778899",
                  nascimento: "1989-03-03",
                },
                {
                  docNumber: 20,
                  nome: "Viviane",
                  sobrenome: "Rocha",
                  email: "viviane.rocha@example.com",
                  telefone: "6677889900",
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
