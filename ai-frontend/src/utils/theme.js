// This file contains utility functions for managing theme settings, such as toggling between dark and light modes and saving the user's preference in local storage.

const THEME_KEY = 'app-theme';

export const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

export const loadTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  setTheme(savedTheme);
};