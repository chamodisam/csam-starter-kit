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
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`
        relative flex items-center w-16 h-8 rounded-full border-4 transition-colors duration-300
        ${theme === 'light' ? 'bg-foreground' : 'bg-background'}
      `}
      >
        <span
          className={`
          absolute block w-6 h-6 rounded-full transition-all duration-300
          ${theme === 'light' ? 'translate-x-0 bg-background' : 'translate-x-8 bg-background-dark'}
        `}
        />
      </button>
    </section>
  );
};
