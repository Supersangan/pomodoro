import React, {
  createRef,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { Dropdown } from '../../../../Dropdown';
import { ITodoMethodsProps, Menu } from '../Menu';
import styles from './todoitem.module.css';
import { ReactComponent as IconMenu } from './iconMenu.svg';
import { setCaretToEnd } from '../../../../utils/setCaretToEnd';

export interface ITodoProps {
  id: string;
  name: string;
  count: number;
}

export interface ITodoItemProps {
  todo: ITodoProps;
  methods: ITodoMethodsProps;
}

export function TodoItem(props: ITodoItemProps) {
  const {
    todo,
    methods,
  } = props;
  const [nameEditable, setNameEditable] = useState(false);

  const ref = createRef<HTMLDivElement>();

  function editTodo(nameRef: RefObject<HTMLDivElement>) {
    if (!ref.current) return;
    setNameEditable(true);
  }

  useEffect(() => {
    if (!ref.current) return;

    if (nameEditable) {
      const input: HTMLInputElement | null = ref.current.querySelector('input');
      if (!input) return;
      setCaretToEnd(input);
    }
  }, [ref, nameEditable]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    methods.renameTodo(todo.id, e.currentTarget.value);
  }

  function handleBlur() {
    setNameEditable(false);
  }

  return (
    <div className={styles.root} ref={ref}>
      <button className={styles.button}>
        <span className={styles.number}>{todo.count}</span>

        {!nameEditable ? (
          <span className={styles.heading}>{todo.name}</span>
        ) : (
          <input
            className={styles.input}
            value={todo.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </button>

      <div className={styles.menu}>
        <Dropdown
          button={
            <button className={styles.menuButton}>
              <IconMenu />
            </button>
          }
        >
          <Menu
            id={todo.id}
            count={todo.count}
            methods={methods}
            editTodo={editTodo}
            nameRef={ref}
          />
        </Dropdown>
      </div> 
    </div>
  );
}
