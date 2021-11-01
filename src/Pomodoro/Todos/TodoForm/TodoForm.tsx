import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './todoform.module.css';

interface IFormProps {
  addTodo: (name: string) => void;
}

export function TodoForm({ addTodo }: IFormProps) {
  const [todoName, setTodoName] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoName(e.currentTarget.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addTodo(todoName);
    setTodoName('');
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        className={`${styles.input} input`}
        type="text"
        placeholder="Название задачи"
        value={todoName}
        onChange={handleChange}
      />

      <button className={`${styles.button} button`}>Добавить</button>
    </form>
  );
}
