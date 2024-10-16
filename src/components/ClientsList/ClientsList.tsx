import React, { useState } from "react";
import axios from "axios";
import styles from "./ClientsList.module.css";
import Editar from "../../assets/editar.png";
import Remove from "../../assets/excluir.png";
import { Cliente } from "../ClientTypings/ClientTypings";
import ModalDelete from "../ModalDelete/ModalDelete";

interface ClientesListProps {
  clientes: Cliente[];
  onDelete: (docNumber: number) => void; // Função para excluir clientes
}

const ClientesList: React.FC<ClientesListProps> = ({ clientes, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de confirmação
  const [selectedDocNumber, setSelectedDocNumber] = useState<number | null>(
    null
  ); // Cliente selecionado

  const handleDelete = async (docNumber: number) => {
    try {
      await axios.delete(`http://localhost:8080/clientes/${docNumber}`);
      onDelete(docNumber); // Chama a função passada para atualizar a lista
      closeModal();
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
    }
  };

  const openModal = (docNumber: number) => {
    setSelectedDocNumber(docNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocNumber(null);
  };

  return (
    <div className={styles.container_table}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table_header}>
            <th className={styles.table_header__item}>CPF</th>
            <th className={styles.table_header__item}>Nome</th>
            <th className={styles.table_header__item}>Email</th>
            <th className={styles.table_header__item}>Telefone</th>
            <th className={styles.table_header__item}>Data de Nascimento</th>
            <th className={styles.table_header__item}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.docNumber} className={styles.table_main}>
              <td className={styles.table_main__item}>{cliente.docNumber}</td>
              <td className={styles.table_main__item}>
                {cliente.nome} {cliente.sobrenome}
              </td>
              <td className={styles.table_main__item}>{cliente.email}</td>
              <td className={styles.table_main__item}>{cliente.telefone}</td>
              <td className={styles.table_main__item}>
                {new Date(cliente.nascimento).toLocaleDateString("pt-BR")}
              </td>
              <td className={styles.table_main__btns}>
                <button
                  className={styles.button_edit}
                  title="Editar"
                  onClick={() => {
                    /* Redirecionar para a página de edição de cliente */
                  }}
                >
                  <img src={Editar} alt="Icon de Editar" />
                </button>
                <button
                  className={styles.button_delete}
                  onClick={() => openModal(cliente.docNumber)} // Abre o modal
                  title="Excluir"
                >
                  <img src={Remove} alt="Icon de Excluir" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ModalDelete
          closeModal={closeModal}
          selectedDocNumber={selectedDocNumber}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ClientesList;
