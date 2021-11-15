import React, { useEffect, useState } from 'react';
import styles from './timer.module.css';
import { ReactComponent as IconPlus } from './iconPlus.svg';
import { ReactComponent as IconMinus } from './iconMinus.svg';
import useInterval from '../../hooks/useInterval';
import { secondsToTimeUnits } from '../../utils/secondsToTimeUnits';
import { Units } from './Units';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/reducer';
import { ITodoProps } from '../Todos/TodoList/TodoItem';
import { actionProgressTodo } from '../../store/todos/reducer';
import classNames from 'classnames';

enum EModes {
  work = 'work',
  rest = 'rest',
}

enum EStatuses {
  initial = 'initial',
  inProgress = 'inProgress',
  paused = 'paused',
}

export function Timer() {
  const INITIAL_WORK_TIME = 25 * 60;
  const INITIAL_REST_TIME = 5 * 60;

  const dispatch = useDispatch();

  const [status, setStatus] = useState<EStatuses>(EStatuses.initial);
  const [mode, setMode] = useState<EModes>(EModes.work);

  const [time, setTime] = useState<number>(INITIAL_WORK_TIME);

  function getTodoActualIndex(todos: ITodoProps[]): number {
    let todoIndex: number = -1;

    for (let i = 0; todoIndex === -1 && i <= todos.length; i++) {
      const count = todos[i]?.count || 0;
      const done = todos[i]?.done || 0;
      if (count > done) todoIndex = i;
    }

    return todoIndex;
  }

  const todos = useSelector<TRootState, ITodoProps[]>((state) => state.todos);

  const todoIndex = getTodoActualIndex(todos);
  const todoId = useSelector<TRootState, string>(
    (state) => state.todos[todoIndex]?.id || ''
  );
  const todoName = useSelector<TRootState, string>(
    (state) => state.todos[todoIndex]?.name || ''
  );
  const todoCount = useSelector<TRootState, number>(
    (state) => state.todos[todoIndex]?.count || 0
  );
  const todoDone = useSelector<TRootState, number>(
    (state) => state.todos[todoIndex]?.done || 0
  );

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
    if (time > 0) {
      if (time - 300 > 0) {
        setTime(time - 300);
      } else {
        setTime(0);
      }
    }
  }

  function startTimer() {
    setStatus(EStatuses.inProgress);
  }

  function resumeTimer() {
    setStatus(EStatuses.inProgress);
  }

  function pauseTimer() {
    setStatus(EStatuses.paused);
  }

  function countTimer() {
    setStatus(EStatuses.initial);
    setMode(mode === EModes.work ? EModes.rest : EModes.work);
  }

  function skipTimer() {
    setStatus(EStatuses.initial);
    setMode(mode === EModes.work ? EModes.rest : EModes.work);
  }

  useEffect(() => {
    setTime(mode === EModes.work ? INITIAL_WORK_TIME : INITIAL_REST_TIME);
  }, [mode, INITIAL_WORK_TIME, INITIAL_REST_TIME]);

  useInterval(
    () => {
      setTime((time) => time - 1);
    },
    status === EStatuses.inProgress ? 1000 : null
  );

  useEffect(() => {
    if (time === 0 && todoIndex !== -1) {
      dispatch(actionProgressTodo(todoId));
    }
  }, [time, todoId, todoIndex, dispatch]);

  return (
    <div className={styles.timer}>
      <div
        className={classNames(
          styles.header,
          mode === EModes.work ? styles.header_work : styles.header_rest
        )}
      >
        <span className={styles.heading}>
          {mode === EModes.work
            ? todoIndex >= 0
              ? `${todoName}`
              : 'Работа'
            : 'Отдых'}
        </span>

        <span className={styles.number}>
          {mode === EModes.work
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
            status !== EStatuses.paused &&
              mode === EModes.work &&
              styles.clock_work,
            status !== EStatuses.paused &&
              mode === EModes.rest &&
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

        {mode === EModes.work ? (
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
          {status === EStatuses.initial && (
            <button
              className={classNames('button', styles.button)}
              onClick={startTimer}
            >
              Старт
            </button>
          )}

          {status === EStatuses.inProgress && (
            <button
              className={classNames('button', styles.button)}
              onClick={pauseTimer}
            >
              Пауза
            </button>
          )}

          {status === EStatuses.paused && (
            <button
              className={classNames('button', styles.button)}
              onClick={resumeTimer}
            >
              Продолжить
            </button>
          )}

          {/* Right Buttons */}
          {/* Work mode */}
          {mode === EModes.work && status !== EStatuses.paused && (
            <button
              className={classNames(
                'button',
                styles.button,
                styles.button_orange,

                status === EStatuses.initial && styles.button_passive
              )}
              onClick={skipTimer}
            >
              Стоп
            </button>
          )}

          {mode === EModes.work && status === EStatuses.paused && (
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
          {mode === EModes.rest && (
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
