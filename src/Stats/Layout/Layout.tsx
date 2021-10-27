import React from 'react';
import { Banner } from './Banner';
import { Daily } from './Daily';
import { Infographic } from './Infographic';
import styles from './layout.module.css';
import { Pomodoros } from './Pomodoros';

export function Layout() {
  return (
    <div className={styles.root}>
      <div className={`${styles.daily} ${styles.gridItem}`}>
        <Daily />
      </div>

      <div className={`${styles.infographic} ${styles.gridItem}`}>
        <Infographic />
      </div>

      <div className={`${styles.pomodoros} ${styles.gridItem}`}>
        <Pomodoros />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner />
      </div>
    </div>
  );
}
