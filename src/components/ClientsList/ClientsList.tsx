import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ClientsList.module.css";
import Editar from "../../assets/editar.png";
import Remove from "../../assets/excluir.png";

// Assumindo que a tipagem Cliente esteja definida como:
interface Cliente {
  docNumber: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  nascimento: string;
}

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Busca os clientes ao montar o componente
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/clientes");
        setClientes(response.data);
        console.log(response.data, "data");

        setFilteredClientes(response.data); // Exibimos todos os clientes por padrão
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };
    fetchClientes();
  }, []);

  // Função de deletar cliente
  const handleDelete = async (docNumber: number) => {
    try {
      await axios.delete(`http://localhost:8080/clientes/${docNumber}`);
      setClientes(
        clientes.filter((cliente) => cliente.docNumber !== docNumber)
      );
      setFilteredClientes(
        filteredClientes.filter((cliente) => cliente.docNumber !== docNumber)
      ); // Atualizar lista filtrada
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
    }
  };

  return (
    <div className={styles.container_table}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table_header}>
            <th className={styles.table_header__item}>Documento</th>
            <th className={styles.table_header__item}>Nome</th>
            <th className={styles.table_header__item}>Email</th>
            <th className={styles.table_header__item}>Telefone</th>
            <th className={styles.table_header__item}>Data de Nascimento</th>
            <th className={styles.table_header__item}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
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
                  onClick={() => handleDelete(cliente.docNumber)}
                  title="Excluir"
                >
                  <img src={Remove} alt="Icon de Excluir" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
