import React, { useEffect, useState } from 'react';
import styles from './themesswitcher.module.css';
import { ReactComponent as IconSun } from './iconSun.svg';
import { ReactComponent as IconMoon } from './iconMoon.svg';
import { ITheme, useTheme } from '../../hooks/useTheme';

interface IThemes {
  light: ITheme;
  dark: ITheme;
}

const themes: IThemes = {
  light: {
    'gray-20-inv': 'hsl(0deg, 0%, 20%)',
    'gray-60-inv': 'hsl(0deg, 0%, 60%)',
    'gray-77-inv': 'hsl(0deg, 0%, 77%)',
    'gray-90-inv': 'hsl(0deg, 0%, 90%)',
    'gray-96-inv': 'hsl(0deg, 0%, 96%)',
    'font-main-inv': 'var(--gray-33)',
    'font-light-inv': 'var(--gray-99)',
    'bg-main-inv': 'white',
  },
  dark: {
    'gray-20-inv': 'hsl(0deg, 0%, calc(100% - 20%))',
    'gray-60-inv': 'hsl(0deg, 0%, calc(100% - 60%))',
    'gray-77-inv': 'hsl(0deg, 0%, calc(100% - 77%))',
    'gray-90-inv': 'hsl(0deg, 0%, calc(18%))',
    'gray-96-inv': 'hsl(0deg, 0%, calc(100% - 96%))',
    'font-main-inv': 'white',
    'font-light-inv': 'var(--gray-99)',
    'bg-main-inv': 'var(--gray-15)',
  },
};

type TMode = 'light' | 'dark';

export function ThemesSwitcher() {
  const [mode, setMode] = useState<TMode>('light');
  const [theme, setTheme] = useState<ITheme>(themes[mode]);

  useEffect(() => {
    setTheme(themes[mode]);
  }, [mode]);

  useTheme(theme);

  return (
    <button
      className={styles.root}
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      <IconSun width="20px" height="20px" />
      <IconMoon width="15px" height="15px" />
      <span
        className={`${styles.switcher} ${
          mode === 'dark' ? styles.switcher_dark : ''
        }`}
      />
    </button>
  );
}
