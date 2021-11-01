import React from 'react';
import styles from './todolist.module.css';
import { ITodoProps, TodoItem } from './TodoItem';
import { ITodoMethodsProps } from './Menu';
import { ESecondsToStrFloor, secondsToStr } from '../../../utils/secondsToString';

interface ITodoListProps {
  todos: ITodoProps[];
  methods: ITodoMethodsProps;
}
export function TodoList({ todos, methods }: ITodoListProps) {
  const TIME = 25;

  const summaryCount = todos.reduce((summaryTime: number, todo: ITodoProps): number => {  
    return summaryTime + todo.count;
  }, 0);

  const summaryTime = secondsToStr(summaryCount * TIME * 60, ESecondsToStrFloor.s);

  return (
    <>
      <ul className={styles.list}>
        {todos.map((todo) => {
          return (
            <li className={styles.li} key={todo.id}>
              <TodoItem todo={todo} methods={methods} />
            </li>
          );
        })}
      </ul>

      <span className={styles.total}>{summaryTime}</span>
    </>
  );
}
