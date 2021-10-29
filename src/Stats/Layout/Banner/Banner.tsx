import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './banner.module.css';

export enum EBannerBgs {
  yellow = 'yellow',
  purple = 'purple',
  blue = 'blue',
}

interface IBannerProps {
  title: string;
  icon: ReactNode;
  text: string;
  bg: EBannerBgs;
}

export function Banner({ title, icon, text, bg }: IBannerProps) {
  const classes = classNames(styles.root, styles[`root_${bg}`]);

  return (
    <div className={classes}>
      <div className={styles.textContent}>
        <span className={styles.heading}>{title}</span>
        <span className={styles.text}>{text}</span>
      </div>

      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
}
