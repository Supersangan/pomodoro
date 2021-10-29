import React from 'react';
import styles from './infographic.module.css';

export function Infographic() {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.linesContainer}>
          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>1 ч 40 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>1 ч 15 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>50 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>25 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>25 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>25 мин</span>
          </div>

          <div className={styles.lineWrapper}>
            <span className={styles.line}></span>
            <span className={styles.lineTitle}>25 мин</span>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <div
              className={`${styles.columnValue} ${styles.columnValue_active}`}
              style={{ height: '40%' }}
            ></div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnValue} style={{ height: '75%' }}></div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnValue} style={{ height: '50%' }}></div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnValue} style={{ height: '93%' }}></div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnValue} style={{ height: '80%' }}></div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnValue} style={{ height: '15%' }}></div>
          </div>

          <div className={styles.column}>
            <div
              className={`${styles.columnValue} ${styles.columnValue_passive}`}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.column_active}`}>Пн</div>
          <div className={styles.column}>Вт</div>
          <div className={styles.column}>Ср</div>
          <div className={styles.column}>Чт</div>
          <div className={styles.column}>Пт</div>
          <div className={styles.column}>Сб</div>
          <div className={styles.column}>Вс</div>
        </div>
      </div>
    </div>
  );
}
