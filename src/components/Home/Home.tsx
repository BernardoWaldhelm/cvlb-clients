import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientesList from "../ClientsList/ClientsList";
import ModalAddClient from "../ModalAddClient/ModalAddClient";
import styles from "./Home.module.css";
import { Cliente } from "../ClientTypings/ClientTypings";

const Home: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const clientsPerPage = 8;

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get<Cliente[]>(
          "http://localhost:8080/clientes"
        );
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    `${cliente.nome} ${cliente.sobrenome}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (docNumber: number) => {
    setClientes((prevClientes) =>
      prevClientes.filter((cliente) => cliente.docNumber !== docNumber)
    );
  };

  const handleAddCliente = (cliente: Cliente) => {
    setClientes((prevClientes) => [...prevClientes, cliente]);
  };

  return (
    <div className={styles.main}>
      <h1>Lista de Clientes</h1>
      <div className={styles.home_button_input}>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)} // Abre o modal
        >
          Adicionar Cliente
        </button>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <ClientesList clientes={currentClientes} onDelete={handleDelete} />
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filteredClientes.length / clientsPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <ModalAddClient
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddCliente={handleAddCliente}
      />
    </div>
  );
};

export default Home;
