import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
  fz?: number;
}

export function Banner({ title, icon, text, bg, fz = 64 }: IBannerProps) {
  const classes = classNames(styles.root, styles[`root_${bg}`]);

  const [fontSize, setFontSize] = useState<number>(64);

  const bannerRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function step() {
      if (!bannerRootRef.current) return;

      if (
        bannerRootRef.current.clientHeight < bannerRootRef.current.scrollHeight
      ) {
        setFontSize((fontSize) => fontSize - 10);
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className={classes} ref={bannerRootRef}>
      <div className={styles.textContent}>
        <span className={styles.heading}>{title}</span>
        <span className={styles.text} style={{ fontSize: `${fontSize}px` }}>
          {text}
        </span>
      </div>

      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
}
