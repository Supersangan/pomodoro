import React from 'react';
import { Banner, EBannerBgs } from './Banner';
import { Daily } from './Daily';
import { Infographic } from './Infographic';
import styles from './layout.module.css';
import { Pomodoros } from './Pomodoros';
import { ReactComponent as IconFocus } from './iconFocus.svg';
import { ReactComponent as IconClock } from './iconClock.svg';
import { ReactComponent as IconStop } from './iconStop.svg';
import { IDayStats, TRootState } from '../../store/reducer';
import { getTodayDate } from '../../utils/getTodayDate';
import { useSelector } from 'react-redux';
import { secondsToStr } from '../../utils/secondsToStr';

export function Layout() {
  const date = useSelector<TRootState, string>((state) => {
    if (state?.stats?.date === undefined) return getTodayDate();
    return state.stats.date;
  });

  const statsData = useSelector<TRootState, IDayStats[]>((state) => {
    if (state?.statsData === undefined) return [];
    return state?.statsData;
  });

  function getStatsValue<T extends keyof IDayStats>(value: T): IDayStats[T] {
    for (const dayStats of statsData) {
      if (dayStats?.date === date && dayStats?.[value] !== undefined)
        return dayStats?.[value];
    }
  }

  const pomodoros = getStatsValue('pomodoros');
  const totalTime = getStatsValue('totalTime') || 0;
  const productiveTime = getStatsValue('productiveTime') || 0;
  const day = new Date(date).getDay();
  const stops = (getStatsValue('stops') || 0).toString();
  const focus = Math.floor((productiveTime / totalTime) * 100);

  return (
    <div className={styles.root}>
      <div className={`${styles.daily} ${styles.gridItem}`}>
        <Daily day={day} totalTime={totalTime} />
      </div>

      <div className={`${styles.infographic} ${styles.gridItem}`}>
        <Infographic statsData={statsData}/>
      </div>

      <div className={`${styles.pomodoros} ${styles.gridItem}`}>
        <Pomodoros count={pomodoros} />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Фокус'}
          icon={<IconFocus />}
          text={`${focus}%`}
          bg={EBannerBgs.yellow}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Время на паузе'}
          icon={<IconClock />}
          text={secondsToStr(totalTime, 's', 'short')}
          bg={EBannerBgs.purple}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Остановки'}
          icon={<IconStop />}
          text={stops}
          bg={EBannerBgs.blue}
        />
      </div>
    </div>
  );
}
