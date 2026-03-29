import React, { createContext, useState, useEffect, useContext } from 'react';

// 1️⃣ Create context
const ThemeContext = createContext();

// 2️⃣ Provider component
export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(
  localStorage.getItem('theme') || 'light'  // ✅ already 'light'
);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3️⃣ Custom hook for all components
export const useTheme = () => useContext(ThemeContext);