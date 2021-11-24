import React from 'react';
import styles from './header.module.css';
import { ReactComponent as IconArrow } from './iconArrow.svg';
import { Dropdown } from '../../Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/reducer';
import { actionSetWeek } from '../../store/stats/reducer';

const weeks: string[] = ['Эта неделя', 'Прошедная неделя', 'Две недели назад'];

export function Header() {
  const dispatch = useDispatch();

  const weekIndex = useSelector<TRootState, number>((state) => {
    if (state?.stats?.weekIndex === undefined) return 0;
    return state.stats.weekIndex;
  });

  function setWeek(week: number) {
    dispatch(actionSetWeek(week));
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Ваша активность</h2>

      <div className={styles.select}>
        <Dropdown
          button={
            <button
              className={styles.selectButton + ' ' + styles.selectButton_open}
            >
              {weeks[weekIndex]} <IconArrow className={styles.selectIcon} />
            </button>
          }
        >
          <ul className={styles.selectList}>
            {weeks.map(
              (week, index) =>
                index !== weekIndex && (
                  <li className={styles.selectLi} key={index}>
                    <button
                      className={styles.selectOption}
                      onClick={() => {
                        setWeek(index);
                      }}
                    >
                      {week}
                    </button>
                  </li>
                )
            )}
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
