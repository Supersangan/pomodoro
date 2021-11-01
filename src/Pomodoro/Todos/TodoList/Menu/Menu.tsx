import React, { RefObject } from 'react';
import styles from './menu.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import { ReactComponent as IconRedact } from './iconRedact.svg';
import { ReactComponent as IconDelete } from './iconDelete.svg';

export interface ITodoMethodsProps {
  incrementTodo: (id: string) => void;
  decrementTodo: (id: string) => void;
  renameTodo: (id: string, name: string) => void;
  deleteTodo: (id: string) => void;
}

export interface IMenuProps {
  id: string;
  count: number;
  nameRef: RefObject<HTMLDivElement>;
  methods: ITodoMethodsProps;
  editTodo?: (nameRef: RefObject<HTMLDivElement>) => void;
}

const NOOP = () => null;

export function Menu(props: IMenuProps) {
  const {
    id,
    count,
    nameRef,
    methods: { incrementTodo, decrementTodo, deleteTodo },
    editTodo = NOOP, 
  } = props;
 
  return (
    <ul className={styles.list}>
      <li className={styles.li}>
        <button
          className={styles.liButton}
          onClick={() => {
            incrementTodo(id);
          }}
          data-not-closer="true"
        >
          <IconPlus className={styles.liIcon} />
          Увеличить
        </button>
      </li>

      <li className={styles.li}>
        <button
          className={
            styles.liButton + ' ' + (count === 1 ? styles.liButton_passive : '')
          }
          onClick={() => {
            decrementTodo(id);
          }}
          data-not-closer="true"
        >
          <IconMinus className={styles.liIcon} />
          Уменьшить
        </button>
      </li>

      <li className={styles.li}>
        <button
          className={styles.liButton}
          onClick={() => {
            editTodo(nameRef);
          }}
        >
          <IconRedact className={styles.liIcon} />
          Редактировать
        </button>
      </li>

      <li className={styles.li}>
        <button
          className={styles.liButton}
          onClick={() => {
            deleteTodo(id);
          }}
        >
          <IconDelete className={styles.liIcon} />
          Удалить
        </button>
      </li>
    </ul>
  );
}
