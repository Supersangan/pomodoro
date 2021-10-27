import React from 'react';
import { Form } from './Form';
import { List } from './List';
import styles from './todos.module.css';

export function Todos() {
  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Ура! Теперь можно начать работать:</h1>

      <ul className={styles.descriptionList}>
        <li className={styles.descriptionLi}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.descriptionLi}>Запустите таймер («помидор»)</li>
        <li className={styles.descriptionLi}>Работайте пока «помидор» не прозвонит</li>
        <li className={styles.descriptionLi}>Сделайте короткий перерыв (3-5 минут)</li>
        <li className={styles.descriptionLi}>
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>

      <div className={styles.todosForm}>
        <Form />
      </div>

      <div className={styles.todosLlist}>
        <List />
      </div>
    </div>
  );
}
