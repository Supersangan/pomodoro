import React from 'react';
import styles from './header.module.css';
import { ReactComponent as IconLogo } from './iconLogo.svg';
import { ReactComponent as IconStats } from './iconStats.svg';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.container + ' container'}>
        <Link className={styles.logo} to={'/'}>
          <IconLogo />
          pomodoro_box
        </Link>

        <Link className={styles.stats} to="/stats/">
          <IconStats />
          Статистика
        </Link>
      </div>
    </div>
  );
}
