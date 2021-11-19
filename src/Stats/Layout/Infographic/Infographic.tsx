import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { IDayStats, TRootState } from '../../../store/reducer';
import styles from './infographic.module.css';

interface IInfographicProps {
  statsData?: IDayStats[];
}

export function Infographic({ statsData = [] }: IInfographicProps) {
  const statsWeek = useSelector<TRootState, number>((state) => {
    if (state?.stats?.week === undefined) return 0;
    return state.stats.week;
  });

  const statsColumns = [
    { name: 'Пн', percentage: 0 },
    { name: 'Вт', percentage: 0 },
    { name: 'Ср', percentage: 0 },
    { name: 'Чт', percentage: 0 },
    { name: 'Пт', percentage: 38 },
    { name: 'Сб', percentage: 0 },
    { name: 'Вс', percentage: 0 },
  ];

  const activeDayIndex = 1;

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
          {statsColumns.map((day, i) => (
            <div className={styles.column} key={day.name}>
              <div
                className={classNames(
                  styles.columnValue,
                  i === activeDayIndex && styles.column_active,
                  day.percentage === 0 && styles.columnValue_passive
                )}
                style={{
                  height: day.percentage > 0 ? `${day.percentage}%` : '',
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.columns}>
          {statsColumns.map((day, i) => (
            <div
              className={classNames(
                styles.column,
                i === activeDayIndex && styles.column_active
              )}
              key={day.name}
            >
              {day.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
