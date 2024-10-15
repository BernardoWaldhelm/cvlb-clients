import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        2024 . Casa e Video Brasil & Le Biscuit © Todos os direitos reservados
      </p>
      <p className={styles.developer}>
        Desenvolvido por:{" "}
        <a
          href="https://www.linkedin.com/in/bernardo-waldhelm/"
          target="_blank"
          className={styles.link}
        >
          Bernardo Waldhelm
        </a>
      </p>
    </footer>
  );
};

export default Footer;
