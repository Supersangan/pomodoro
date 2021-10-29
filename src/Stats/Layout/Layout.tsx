import React from 'react';
import { Banner, EBannerBgs } from './Banner';
import { Daily } from './Daily';
import { Infographic } from './Infographic';
import styles from './layout.module.css';
import { Pomodoros } from './Pomodoros';
import { ReactComponent as IconFocus } from './iconFocus.svg';
import { ReactComponent as IconClock } from './iconClock.svg';
import { ReactComponent as IconStop } from './iconStop.svg';

export function Layout() {
  return (
    <div className={styles.root}>
      <div className={`${styles.daily} ${styles.gridItem}`}>
        <Daily />
      </div>

      <div className={`${styles.infographic} ${styles.gridItem}`}>
        <Infographic />
      </div>

      <div className={`${styles.pomodoros} ${styles.gridItem}`}>
        <Pomodoros />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Фокус'}
          icon={<IconFocus />}
          text={'35%'}
          bg={EBannerBgs.yellow}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Время на паузе'}
          icon={<IconClock />}
          text={'9м'}
          bg={EBannerBgs.purple}
        />
      </div>

      <div className={`${styles.banner} ${styles.gridItem}`}>
        <Banner
          title={'Остановки'}
          icon={<IconStop />}
          text={'3'}
          bg={EBannerBgs.blue}
        />
      </div>
    </div>
  );
}
