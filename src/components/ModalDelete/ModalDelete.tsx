import React from "react";
import Modal from "react-modal";
import styles from "./ModalDelete.module.css";

interface ModalDeleteProps {
  selectedDocNumber: number | null;
  closeModal: () => void;
  handleDelete: (docNumber: number) => void;
}

Modal.setAppElement("#root");

const ModalDelete: React.FC<ModalDeleteProps> = ({
  selectedDocNumber,
  closeModal,
  handleDelete,
}) => {
  return (
    <Modal
      isOpen={selectedDocNumber !== null}
      onRequestClose={closeModal}
      className={styles.modal_content}
      overlayClassName={styles.modal}
      contentLabel="Confirmação de Exclusão"
    >
      <button className={styles.modal_close} onClick={closeModal}>
        X
      </button>
      <p>Excluir o cliente com número de documento: {selectedDocNumber}?</p>
      <div className={styles.modal_actions}>
        <button
          className={styles.modal_confirm}
          onClick={() => selectedDocNumber && handleDelete(selectedDocNumber)}
        >
          Confirmar
        </button>
        <button className={styles.modal_cancel} onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
