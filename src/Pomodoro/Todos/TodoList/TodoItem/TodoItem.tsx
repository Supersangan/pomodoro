import React, { createRef, useEffect, useState } from 'react';
import { Dropdown } from '../../../../Dropdown';
import { Menu } from '../Menu';
import styles from './todoitem.module.css';
import { ReactComponent as IconMenu } from './iconMenu.svg';
import { setCaretToEnd } from '../../../../utils/setCaretToEnd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import {
  actionDecrementTodo,
  actionDeleteTodo,
  actionIncrementTodo,
  actionRenameTodo,
} from '../../../../store/todos/reducer';
import { ITodo } from '../../../../store/reducer';

export interface ITodoItemProps {
  todo: ITodo;
}

export function TodoItem({ todo }: ITodoItemProps) {
  const [nameEditable, setNameEditable] = useState(false);
  const dispatch = useDispatch();

  const nameRef = createRef<HTMLInputElement>();

  function incrementTodo(id: string) {
    dispatch(actionIncrementTodo(id));
  }

  function decrementTodo(id: string) {
    dispatch(actionDecrementTodo(id));
  }

  function renameTodo(id: string, name: string) {
    dispatch(actionRenameTodo(id, name));
  }

  function deleteTodo(id: string) {
    dispatch(actionDeleteTodo(id));
  }

  function editTodo(): void {
    setNameEditable(true);
  }

  useEffect(() => {
    if (!nameRef.current) return;

    if (nameEditable) {
      const input: HTMLInputElement | null = nameRef.current;
      setCaretToEnd(input);
    }
  }, [nameRef, nameEditable]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    renameTodo(todo.id, e.currentTarget.value);
  }

  function handleBlur(): void {
    setNameEditable(false);
  }

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: todo.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={styles.root}
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
    >
      <button className={styles.button}>
        <span className={styles.number}>{todo.count}</span>

        {!nameEditable ? (
          <span className={styles.heading}>{todo.name}</span>
        ) : (
          <input
            className={styles.input}
            value={todo.name}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={nameRef}
          />
        )}
      </button>

      <div className={styles.menu}>
        <Dropdown
          button={
            <button className={styles.menuButton}>
              <IconMenu />
            </button>
          }
        >
          <Menu
            count={todo.count}
            incrementTodo={() => {
              incrementTodo(todo.id);
            }}
            decrementTodo={() => {
              decrementTodo(todo.id);
            }}
            editTodo={editTodo}
            renameTodo={() => {
              decrementTodo(todo.id);
            }}
            deleteTodo={() => {
              deleteTodo(todo.id);
            }}
          />
        </Dropdown>
      </div>
    </div>
  );
}
