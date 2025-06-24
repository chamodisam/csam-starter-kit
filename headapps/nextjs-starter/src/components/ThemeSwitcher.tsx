import React, { useEffect, useState } from 'react';

const getPreferredTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

type ThemeSwitcherProps = {
  params: { [key: string]: string };
};

export const Default = (props: ThemeSwitcherProps): JSX.Element => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme in sessionStorage
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const preferred = getPreferredTheme();
      setTheme(preferred);
      document.documentElement.setAttribute('data-theme', preferred);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    sessionStorage.setItem('theme', newTheme);
  };

  return (
    <section className={`${props?.params?.styles}`}>
      <button onClick={toggleTheme} aria-label="Toggle theme">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </section>
  );
};
