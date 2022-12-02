import React from 'react';

import styles from './Header.module.css';

import todoLogo from '../assets/todo-logo.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={todoLogo} alt="Todo logo" />
      </div>
    </header>
  );
};
