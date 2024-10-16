import React from "react";

import Image from "../../assets/cvlb.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src={Image} alt="Logo" />
      </a>
      <h1 className={styles.title}>CVLB Clientes</h1>
    </header>
  );
};

export default Header;
