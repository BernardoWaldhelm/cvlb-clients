import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./ModalEditClient.module.css";
import axios from "axios";
import { Cliente } from "../utils/ClientTypings";
import { toast } from "react-toastify";
import {
  validateNome,
  validateEmail,
  validateTelefone,
  validateNascimento,
} from "../utils/validation";

interface EditClienteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onEditCliente: (cliente: Cliente) => void;
  cliente: Cliente;
}

const ModalEditClient: React.FC<EditClienteModalProps> = ({
  isOpen,
  onRequestClose,
  onEditCliente,
  cliente,
}) => {
  const [docNumber, setDocNumber] = useState<number>(cliente.docNumber);
  const [nome, setNome] = useState<string>(cliente.nome);
  const [sobrenome, setSobrenome] = useState<string>(cliente.sobrenome);
  const [email, setEmail] = useState<string>(cliente.email);
  const [telefone, setTelefone] = useState<string>(cliente.telefone);
  const [nascimento, setNascimento] = useState<string>(cliente.nascimento);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setDocNumber(cliente.docNumber);
    setNome(cliente.nome);
    setSobrenome(cliente.sobrenome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setNascimento(cliente.nascimento);
    setError("");
  }, [cliente]);

  const resetForm = () => {
    setDocNumber(cliente.docNumber);
    setNome(cliente.nome);
    setSobrenome(cliente.sobrenome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setNascimento(cliente.nascimento);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateNome(nome)) {
      setError("O nome deve conter apenas letras.");
      return;
    }
    if (!validateNome(sobrenome)) {
      setError("O sobrenome deve conter apenas letras.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email inválido.");
      return;
    }
    if (!validateTelefone(telefone)) {
      setError("Telefone deve estar no formato (00) 00000-0000.");
      return;
    }
    if (!validateNascimento(nascimento)) {
      setError("Data de nascimento deve ser uma data válida e não futura.");
      return;
    }

    const updatedCliente = {
      docNumber,
      nome,
      sobrenome,
      email,
      telefone,
      nascimento,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/clientes/${docNumber}`,
        updatedCliente
      );
      onEditCliente(response.data);
      resetForm();
      onRequestClose();
      toast.success("Cliente editado com sucesso!");
    } catch (err) {
      setError(
        "Erro ao atualizar cliente. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Cliente"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modal_title}>
        Editar Cliente{" "}
        <button className={styles.modal_close} onClick={onRequestClose}>
          X
        </button>
      </h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label className={styles.label}>CPF:</label>
          <input
            type="number"
            value={docNumber}
            readOnly
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Sobrenome:</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Data de Nascimento:</label>
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={onRequestClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditClient;
