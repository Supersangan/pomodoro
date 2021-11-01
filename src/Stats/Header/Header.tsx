import React from 'react';
import styles from './header.module.css';
import { ReactComponent as IconArrow } from './iconArrow.svg';
import { Dropdown } from '../../Dropdown';

export function Header() {
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Ваша активность</h2>

      <div className={styles.select}>
        <Dropdown
          button={
            <button
              className={styles.selectButton + ' ' + styles.selectButton_open}
            >
              Эта неделя <IconArrow className={styles.selectIcon} />
            </button>
          }
        >
          <ul className={styles.selectList}>
            <li className={styles.selectLi}>
              <button className={styles.selectOption}>Прошедшая неделя</button>
            </li>

            <li className={styles.selectLi}>
              <button className={styles.selectOption}>Две недели назад</button>
            </li>
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
