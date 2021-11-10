import React, { useEffect, useState } from 'react';
import styles from './timer.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import useInterval from '../../hooks/useInterval';
import { secondsToTimeUnits } from '../../utils/secondsToTimeUnits';
import { Units } from './Units';

export function Timer() {
  const initialTime = 25 * 60;

  const [started, setStarted] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [time, setTime] = useState<number>(initialTime);
  const [timeUnits, setTimeUnits] = useState<number[]>(
    secondsToTimeUnits(initialTime)
  );

  function startTimer() {
    setStarted(true);
    setPaused(false);
  }

  function resumeTimer() {
    setStarted(true);
    setPaused(false);
  }

  function pauseTimer() {
    setPaused(true);
  }

  function stopTimer() {
    setTime(0);
    setTimeUnits(secondsToTimeUnits(0));
    setPaused(true);
  }

  function incrementTimer() {
    if (time < 3600) {
      if (time + 300 <= 3600) {
        setTime(time + 300);
        setTimeUnits(secondsToTimeUnits(time + 300));
      } else {
        setTime(3600);
        setTimeUnits(secondsToTimeUnits(3600));
      }
    }
  }

  function decrementTimer() {
    if (time > 0) {
      if (time - 300 > 0) {
        setTime(time - 300);
        setTimeUnits(secondsToTimeUnits(time - 300));
      } else {
        setTime(0);
        setTimeUnits(secondsToTimeUnits(0));
      }
    }
  }

  useInterval(
    () => {
      setTime(time => time - 1);
      setTimeUnits(secondsToTimeUnits(time- 1));
    },
    time > 0 && started && !paused ? 1000 : null
  );

  useEffect(() => {
    if (time === 0) {
      setPaused(true);
    }
  }, [time]);

  return (
    <div className={styles.timer}>
      <div
        className={`${styles.header} ${
          started && time > 0 && styles.header_active
        } ${time === 0 && styles.header_stoped}`}
      >
        <span className={styles.heading}>Сверстать сайт</span>

        <span className={styles.number}>Помидор 1</span>
      </div>

      <div className={styles.body}>
        <div
          className={`${styles.clock} ${
            started && time > 0 && styles.clock_active
          } ${time === 0 && styles.clock_stoped}`}
        >
          <Units units={timeUnits} />

          <button
            className={styles.minus}
            onClick={decrementTimer}
            title="Убавить на 5 мин"
          >
            <IconMinus />
          </button>
          <button
            className={styles.plus}
            onClick={incrementTimer}
            title="Добавить 5 мин"
          >
            <IconPlus />
          </button>
        </div>

        <p className={styles.text}>
          <span className={styles.light}>Задача 1 — </span>Сверстать сайт
        </p>

        <div className={styles.actions}>
          {!started && time > 0 && (
            <button className={`button ${styles.button}`} onClick={startTimer}>
              Старт
            </button>
          )}

          {started && !paused && time > 0 && (
            <button className={`button ${styles.button}`} onClick={pauseTimer}>
              Пауза
            </button>
          )}

          {started && paused && time > 0 && (
            <button className={`button ${styles.button}`} onClick={resumeTimer}>
              Продолжить
            </button>
          )}

          {!started && time > 0 && (
            <button
              className={`button ${styles.button} ${styles.button_stop} ${styles.button_passive}`}
            >
              Стоп
            </button>
          )}

          {started && time > 0 && (
            <button
              className={`button ${styles.button} ${styles.button_stop}`}
              onClick={stopTimer}
            >
              Стоп
            </button>
          )}

          {time === 0 && (
            <button
              className={`button ${styles.button} ${styles.button_stop}`}
              onClick={stopTimer}
            >
              Засчитать
            </button>
          )}

          {time === 0 && (
            <button
              className={`button ${styles.button} ${styles.button_stop}`}
              onClick={stopTimer}
            >
              Пропустить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
