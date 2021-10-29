import React from 'react';
import styles from './pomodoros.module.css';
import { ReactComponent as IconPomodoro } from './iconPomodoro.svg';
import { ReactComponent as IconPomodoroFaced } from './iconPomodoroFaced.svg';

export function Pomodoros() {
  return (
    <div className={styles.root}>
      {/* <IconPomodoroFaced /> */}

      <div className={styles.content}>
        <IconPomodoro /> x 2
      </div>

      <div className={styles.footer}>2 помидора</div>
    </div>
  );
}
