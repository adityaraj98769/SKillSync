import React, { useState, useEffect } from 'react';
import { toggleTheme } from '../utils/theme';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply the theme to the body
    document.body.className = isDarkMode ? 'dark' : 'light';
    // Save the user's preference in local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
    toggleTheme();
  };

  return (
    <button onClick={handleToggle} className="theme-toggle">
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;