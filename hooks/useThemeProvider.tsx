import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme as getDeviceColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = getDeviceColorScheme();
  const [theme, setTheme] = useState(deviceColorScheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setTheme(deviceColorScheme);
  }, [deviceColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
