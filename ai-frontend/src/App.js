import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ThemeToggle from './components/ThemeToggle';
import './styles/index.css';
import { getSavedTheme, saveTheme } from './utils/theme';

const App = () => {
  const [theme, setTheme] = useState(getSavedTheme());

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} />
      <Home />
    </div>
  );
};

export default App;