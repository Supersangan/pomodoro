import React from 'react';
import styles from './menu.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import { ReactComponent as IconRedact } from './iconRedact.svg';
import { ReactComponent as IconDelete } from './iconDelete.svg';

interface IMenuProps {
  incrementTodo: () => void;
  decrementTodo: () => void;
  redactTodo: () => void;
  deleteTodo: () => void;
}

export function Menu(props: IMenuProps) {
  const { incrementTodo, decrementTodo, redactTodo, deleteTodo } = props;
  
  return (
    <ul className={styles.list}>
      <li className={styles.li}>
        <button className={styles.liButton} onClick={incrementTodo}>
          <IconPlus className={styles.liIcon} />
          Увеличить
        </button>
      </li>

      <li className={styles.li}>
        <button className={styles.liButton} onClick={decrementTodo}>
          <IconMinus className={styles.liIcon} />
          Уменьшить
        </button>
      </li>

      <li className={styles.li}>
        <button className={styles.liButton} onClick={redactTodo}>
          <IconRedact className={styles.liIcon} />
          Редактировать
        </button>
      </li>

      <li className={styles.li}>
        <button className={styles.liButton} onClick={deleteTodo}>
          <IconDelete className={styles.liIcon} />
          Удалить
        </button>
      </li>
    </ul>
  );
}
