import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./ModalAddClient.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  validateCPF,
  validateNome,
  validateEmail,
  validateTelefone,
  validateNascimento,
} from "../utils/validation";

interface AddClienteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddCliente: (cliente: any) => void;
}

const ModalAddClient: React.FC<AddClienteModalProps> = ({
  isOpen,
  onRequestClose,
  onAddCliente,
}) => {
  const [docNumber, setDocNumber] = useState<number | undefined>();
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [nascimento, setNascimento] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetForm = () => {
    setDocNumber(undefined);
    setNome("");
    setSobrenome("");
    setEmail("");
    setTelefone("");
    setNascimento("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateCPF(docNumber)) {
      setError("O documento deve ser um CPF válido com 11 dígitos.");
      return;
    }
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

    const cliente = {
      docNumber,
      nome,
      sobrenome,
      email,
      telefone,
      nascimento,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/novoCliente",
        cliente
      );
      onAddCliente(response.data);
      resetForm();
      onRequestClose();
      toast.success("Cliente adicionado com sucesso!");
    } catch (err) {
      setError(
        "Erro ao adicionar cliente. Verifique os dados e tente novamente."
      );
    }
  };

  const handleClose = () => {
    resetForm();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Adicionar Cliente"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modal_title}>
        Adicionar Cliente{" "}
        <button className={styles.modal_close} onClick={handleClose}>
          X
        </button>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label className={styles.label}>CPF:</label>
          <input
            type="number"
            value={docNumber}
            onChange={(e) => setDocNumber(Number(e.target.value))}
            placeholder="000.000.000-00"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Bernardo"
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
            placeholder="Waldhelm"
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
            placeholder="pW9X5@example.com"
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
            placeholder="(00) 00000-0000"
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Data de Nascimento:</label>
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Adicionar Cliente</button>
        <button type="button" onClick={handleClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default ModalAddClient;
