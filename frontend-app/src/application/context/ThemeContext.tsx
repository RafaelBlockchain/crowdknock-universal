import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Preferences } from '@capacitor/preferences';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  themeMode: ThemeMode;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const systemPrefersDark = Appearance.getColorScheme() === 'dark';
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  const toggleTheme = (isDarkMode: boolean) => {
    const mode: ThemeMode = isDarkMode ? 'dark' : 'light';
    setThemeMode(mode);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    Preferences.set({ key: 'theme_mode', value: mode });
  };

  const loadThemeFromStorage = async () => {
    const stored = (await Preferences.get({ key: 'theme_mode' })).value as ThemeMode | null;
    if (stored) setThemeModeState(stored);
  };

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
