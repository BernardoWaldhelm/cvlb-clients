import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ClientesList from "../ClientsList/ClientsList";
import ModalAddClient from "../ModalAddClient/ModalAddClient";
import ModalEditClient from "../ModalEditClient/ModalEditClient";
import styles from "./Home.module.css";
import { ToastContainer } from "react-toastify";
import { Cliente } from "../utils/ClientTypings";

const Home: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
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

  const handleEditCliente = (updatedCliente: Cliente) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.docNumber === updatedCliente.docNumber
          ? updatedCliente
          : cliente
      )
    );
    setIsEditModalOpen(false);
    setSelectedCliente(null);
  };

  const openEditModal = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.main}>
      <h1>Lista de Clientes</h1>
      <ToastContainer />
      <div className={styles.home_button_input}>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
          title="Adicionar cliente"
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
      <ClientesList
        clientes={currentClientes}
        onDelete={handleDelete}
        onEdit={openEditModal}
      />
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
      {selectedCliente && (
        <ModalEditClient
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          cliente={selectedCliente}
          onEditCliente={handleEditCliente}
        />
      )}
    </div>
  );
};

export default Home;
