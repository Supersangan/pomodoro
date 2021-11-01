import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import styles from './todos.module.css';

const initialTodos = [
  {
    id: '1',
    name: 'Сверстать 1 сайт',
    count: 1,
  },
  {
    id: '2',
    name: 'Сверстать второй сайт',
    count: 3,
  },
  {
    id: '3',
    name: 'Выгулять собаку',
    count: 2,
  },
];

export function Todos() {
  const [todos, setTodos] = useState(initialTodos);

  function addTodo(name: string) {
    if (!name.length) return;

    setTodos([
      ...todos,
      {
        id: Math.random().toString().substr(2, 9),
        name,
        count: 1,
      },
    ]);
  }

  function incrementTodo(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.count++;
        }
        return todo;
      })
    );
  }

  function decrementTodo(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id && todo.count > 1) {
          todo.count--;
        }
        return todo;
      })
    );
  }

  function renameTodo(id: string, name: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id && name.length) {
          todo.name = name;
        }
        return todo;
      })
    );
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const todosMethods = {
    incrementTodo,
    decrementTodo,
    renameTodo,
    deleteTodo,
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Ура! Теперь можно начать работать:</h1>

      <ul className={styles.descriptionList}>
        <li className={styles.descriptionLi}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.descriptionLi}>Запустите таймер («помидор»)</li>
        <li className={styles.descriptionLi}>
          Работайте пока «помидор» не прозвонит
        </li>
        <li className={styles.descriptionLi}>
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className={styles.descriptionLi}>
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>

      <div className={styles.todosForm}>
        <TodoForm addTodo={addTodo} />
      </div>

      <div className={styles.todosLlist}>
        <TodoList todos={todos} methods={todosMethods} />
      </div>
    </div>
  );
}
