import React from "react";
import styles from "./ModalDelete.module.css";

interface ModalDeleteProps {
  selectedDocNumber: number | null;
  closeModal: () => void;
  handleDelete: (docNumber: number) => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  selectedDocNumber,
  closeModal,
  handleDelete,
}) => {
  if (selectedDocNumber === null) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <button className={styles.modal_close} onClick={closeModal}>
          X
        </button>
        <p>Excluir o cliente com número de documento: {selectedDocNumber}?</p>
        <div className={styles.modal_actions}>
          <button
            className={styles.modal_confirm}
            onClick={() => handleDelete(selectedDocNumber)}
          >
            Confirmar
          </button>
          <button className={styles.modal_cancel} onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
