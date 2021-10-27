import React from 'react';
import styles from './list.module.css';
import { ReactComponent as IconMenu } from './iconMenu.svg';
import { Dropdown } from './Dropdown';
import { Menu } from './Menu';

function incrementTodo(id: number) {
  console.log(id);
}

function decrementTodo(id: number) {
  console.log(id);
}

function redactTodo(id: number) {
  console.log(id);
}

function deleteTodo(id: number) {
  console.log(id);
}

export function List() {
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.li}>
          <button className={styles.button}>
            <span className={styles.number}>1</span>

            <span className={styles.heading}>Сверстать сайт</span>
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
                incrementTodo={() => incrementTodo(1)}
                decrementTodo={() => decrementTodo(1)}
                redactTodo={() => redactTodo(1)}
                deleteTodo={() => deleteTodo(1)}
              />
            </Dropdown>
          </div>
        </li>

        <li className={styles.li}>
          <button className={styles.button}>
            <span className={styles.number}>2</span>

            <span className={styles.heading}>Отжаться 100 раз</span>
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
                incrementTodo={() => incrementTodo(2)}
                decrementTodo={() => decrementTodo(2)}
                redactTodo={() => redactTodo(2)}
                deleteTodo={() => deleteTodo(2)}
              />
            </Dropdown>
          </div>
        </li>
      </ul>

      <span className={styles.total}>1 час 15 мин</span>
    </>
  );
}
