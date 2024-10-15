import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientesList from "../ClientsList/ClientsList";
import styles from "./Home.module.css";

interface Cliente {
  docNumber: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  nascimento: string;
}

const Home: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get<Cliente[]>(
          "http://localhost:8080/clientes"
        );
        setClientes(response.data);

        setFilteredClientes(response.data); // Inicializa a lista filtrada
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    fetchClientes();
  }, [filteredClientes]);

  useEffect(() => {
    // Filtra clientes com base no termo de busca
    setFilteredClientes(
      clientes.filter((cliente) =>
        `${cliente.nome} ${cliente.sobrenome}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, clientes]);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <div>
        <button
          onClick={() => {
            /* Redirecionar para a página de adicionar cliente */
          }}
        >
          Adicionar Cliente
        </button>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ClientesList />
    </div>
  );
};

export default Home;
