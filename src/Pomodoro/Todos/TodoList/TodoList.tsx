import React from 'react';
import styles from './todolist.module.css';
import { ITodoProps, TodoItem } from './TodoItem';
import { ESecondsToStrFloor, secondsToStr } from '../../../utils/secondsToStr';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../../store/reducer';
import { actionSwapTodos } from '../../../store/todos/reducer';
import { useTransition, animated } from 'react-spring';

const TIME = 25;

export function TodoList() {
  const todos =
    useSelector<TRootState, ITodoProps[]>((state) => {
      const todos = state?.todos.filter((todo) => {
        return todo.done < todo.count;
      });
      return todos;
    }) || [];

  const dispatch = useDispatch();

  const summaryCount = todos.reduce(
    (summaryTime: number, todo: ITodoProps): number => {
      return summaryTime + todo.count;
    },
    0
  );

  const summaryTime = secondsToStr(
    summaryCount * TIME * 60,
    ESecondsToStrFloor.s
  );

  const sensor = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  ];

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      const leftIndex = todos.findIndex((todo) => todo.id === active.id);
      const rightIndex = todos.findIndex((todo) => todo.id === over?.id);
      dispatch(actionSwapTodos(leftIndex, rightIndex));
    }
  }

  const transition = useTransition(todos, {
    initial: { x: 0, opacity: 1 },
    from: { x: 200, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 200, opacity: 0 },
  });

  return (
    <>
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul className={styles.list}>
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {transition((style, todo) =>
              todo ? (
                <animated.li style={style} className="item">
                  <TodoItem key={todo.id} todo={todo} />
                </animated.li>
              ) : (
                ''
              )
            )}
          </SortableContext>
        </ul>
      </DndContext>

      <span className={styles.total}>{summaryTime}</span>
    </>
  );
}
