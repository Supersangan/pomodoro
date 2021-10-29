import React from 'react';
import styles from './daily.module.css';

export function Daily() {
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>Понедельник</h3>

      <p className={styles.text}>
        Вы работали над задачами в течение
        <strong className={styles.strong}>51 минуты</strong>
      </p>
    </div>
  );
}
