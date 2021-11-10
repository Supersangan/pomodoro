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

const TIME = 25;

export function TodoList() {
  const todos = useSelector<TRootState, ITodoProps[]>((state) => state?.todos) || [];
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
            {todos.map((todo) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })}
          </SortableContext>
        </ul>
      </DndContext>

      <span className={styles.total}>{summaryTime}</span>
    </>
  );
}
