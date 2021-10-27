import React from 'react';
import styles from './timer.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';

export function Timer() {
  return (
    <div className={styles.timer}>
      {/* <div className={styles.header}> */}
      {/* <div className={`${styles.header} ${styles.header_done}`}> */}
      <div className={`${styles.header} ${styles.header_damage}`}>
        <span className={styles.heading}>Сверстать сайт</span>

        <span className={styles.number}>Помидор 1</span>
      </div>

      <div className={styles.body}>
        {/* <div className={styles.clock> */}
        {/* <div className={`${styles.clock} ${styles.clock_done}`}> */}
        <div className={`${styles.clock} ${styles.clock_damage}`}>
          25:00
          <button className={styles.plus}>
            <IconPlus />
          </button>
        </div>

        <p className={styles.text}>
          <span className={styles.light}>Задача 1 — </span>Сверстать сайт
        </p>

        <div className={styles.actions}>
          <button className={`button ${styles.button}`}>Старт</button>

          <button className={`button ${styles.button} ${styles.button_stop}`}>
            Стоп
          </button>

          <button
            className={`button ${styles.button} ${styles.button_stop} ${styles.button_passive}`}
          >
            Стоп
          </button>
        </div>
      </div>
    </div>
  );
}
