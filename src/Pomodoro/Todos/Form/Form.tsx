import React from 'react';
import styles from './form.module.css';

export function Form() {
  return (
    <form action="">
      <input
        className={`${styles.input} input`}
        type="text"
        placeholder="Название задачи"
      />
      <button className={`${styles.button} button`}>Добавить</button>
    </form>
  );
}
