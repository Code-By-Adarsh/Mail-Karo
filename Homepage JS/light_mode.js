// light_mode.js - Theme Toggle Functionality

// Get saved theme from localStorage or default to dark
const getTheme = () => localStorage.getItem('theme') || 'dark';

// Set theme attribute on document element
const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getTheme();
  setTheme(savedTheme);

  // Theme toggle button handler
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = getTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
});
