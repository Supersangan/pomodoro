import React, { useCallback, useEffect, useState } from 'react';
import styles from './timer.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import useInterval from '../../hooks/useInterval';
import { secondsToTimeUnits } from '../../utils/secondsToTimeUnits';
import { Units } from './Units';
import { useDispatch, useSelector } from 'react-redux';
import { ITodo, TRootState } from '../../store/reducer';
import { actionProgressTodo } from '../../store/todos/reducer';
import classNames from 'classnames';

export enum ETimerModes {
  work = 'work',
  rest = 'rest',
}

export enum ETimerStatuses {
  initial = 'initial', 
  inProgress = 'inProgress',
  paused = 'paused',
}

export function Timer() {
  const INITIAL_WORK_TIME = 25 * 60;
  const INITIAL_REST_TIME = 5 * 60;

  const dispatch = useDispatch();

  const [status, setStatus] = useState<ETimerStatuses>(ETimerStatuses.initial);
  const [mode, setMode] = useState<ETimerModes>(ETimerModes.work);

  const [time, setTime] = useState<number>(INITIAL_WORK_TIME);

  function getTodoActualIndex(todos: ITodo[]): number {
    let todoIndex: number = -1;

    for (let i = 0; todoIndex === -1 && i <= todos.length; i++) {
      const count = todos[i]?.count || 0;
      const done = todos[i]?.done || 0;
      if (count > done) todoIndex = i;
    }

    return todoIndex;
  }

  const todos = useSelector<TRootState, ITodo[]>((state) => state?.todos || []);

  const todoIndex = getTodoActualIndex(todos);
  
  const todoId = useSelector<TRootState, string>((state) => {
    if (!state?.todos) return '';
    return state?.todos[todoIndex]?.id;
  });

  const todoName = useSelector<TRootState, string>((state) => {
    if (!state?.todos) return '';
    return state.todos[todoIndex]?.name;
  });

  const todoCount = useSelector<TRootState, number>((state) => {
    if (!state?.todos) return 0;
    return state.todos[todoIndex]?.count;
  });

  const todoDone = useSelector<TRootState, number>((state) => {
    if (!state?.todos) return 0;
    return state.todos[todoIndex]?.done;
  });

  function incrementTimer() {
    if (time < 3600) {
      if (time + 300 <= 3600) {
        setTime(time + 300);
      } else {
        setTime(3600);
      }
    }
  }

  function decrementTimer() {
    if (time - 300 > 0) {
      setTime(time - 300);
    }
  }

  function startTimer() {
    setStatus(ETimerStatuses.inProgress);
  }

  function resumeTimer() {
    setStatus(ETimerStatuses.inProgress);
  }

  function pauseTimer() {
    setStatus(ETimerStatuses.paused);
  }

  const countTimer = useCallback(() => {
    if (todoIndex !== -1 && todoDone < todoCount) {
      dispatch(actionProgressTodo(todoId));
    }

    setStatus(ETimerStatuses.initial);
    setMode((mode) =>
      mode === ETimerModes.work ? ETimerModes.rest : ETimerModes.work
    );
  }, [dispatch, todoIndex, todoId, todoCount, todoDone]);

  function skipTimer() {
    setStatus(ETimerStatuses.initial);
    setMode(mode === ETimerModes.work ? ETimerModes.rest : ETimerModes.work);
  }

  useEffect(() => {
    setTime(mode === ETimerModes.work ? INITIAL_WORK_TIME : INITIAL_REST_TIME);
  }, [mode, INITIAL_WORK_TIME, INITIAL_REST_TIME]);

  useInterval(
    () => {
      setTime((time) => time - 1);
    },
    status === ETimerStatuses.inProgress ? 1000 : null
  );

  useEffect(() => {
    if (time === 0 && todoIndex !== -1 && todoDone < todoCount) {
      dispatch(actionProgressTodo(todoId));
    }
  }, [time, dispatch, todoIndex, todoId, todoCount, todoDone]);

  useEffect(() => {
    if (time === 0) {
      countTimer();
    }
  }, [time, countTimer]);

  return (
    <div className={styles.timer}>
      <div
        className={classNames(
          styles.header,
          mode === ETimerModes.work ? styles.header_work : styles.header_rest
        )}
      >
        <span className={styles.heading}>
          {mode === ETimerModes.work
            ? todoIndex >= 0
              ? `${todoName}`
              : 'Работа'
            : 'Отдых'}
        </span>

        <span className={styles.number}>
          {mode === ETimerModes.work
            ? todoIndex >= 0
              ? `Помидор ${todoDone + 1}/${todoCount}`
              : ''
            : ''}
        </span>
      </div>

      <div className={styles.body}>
        <div
          className={classNames(
            styles.clock,
            status !== ETimerStatuses.paused &&
              mode === ETimerModes.work &&
              styles.clock_work,
            status !== ETimerStatuses.paused &&
              mode === ETimerModes.rest &&
              styles.clock_rest
          )}
        >
          <Units units={secondsToTimeUnits(time)} />

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

        {mode === ETimerModes.work ? (
          todoIndex >= 0 ? (
            <p className={styles.text}>
              <span className={styles.light}>Задача {todoIndex + 1} — </span>
              {todoName}
            </p>
          ) : (
            <p className={styles.text}>
              <span className={styles.light}>Работа</span>
            </p>
          )
        ) : (
          <p className={styles.text}>
            <span className={styles.light}>Отдых</span>
          </p>
        )}

        <div className={styles.actions}>
          {/* Left buttons */}
          {status === ETimerStatuses.initial && (
            <button
              className={classNames('button', styles.button)}
              onClick={startTimer}
            >
              Старт
            </button>
          )}

          {status === ETimerStatuses.inProgress && (
            <button
              className={classNames('button', styles.button)}
              onClick={pauseTimer}
            >
              Пауза
            </button>
          )}

          {status === ETimerStatuses.paused && (
            <button
              className={classNames('button', styles.button)}
              onClick={resumeTimer}
            >
              Продолжить
            </button>
          )}

          {/* Right Buttons */}
          {/* Work mode */}
          {mode === ETimerModes.work && status !== ETimerStatuses.paused && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange,

                status === ETimerStatuses.initial && styles.button_passive
              )}
              onClick={skipTimer}
            >
              Стоп
            </button>
          )}

          {mode === ETimerModes.work && status === ETimerStatuses.paused && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange
              )}
              onClick={countTimer}
            >
              Сделано
            </button>
          )}

          {/* Rest mode */}
          {mode === ETimerModes.rest && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange
              )}
              onClick={skipTimer}
            >
              Пропустить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
