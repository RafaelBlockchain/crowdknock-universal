import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Preferences } from '@capacitor/preferences';
import { I18nManager } from 'react-native';

type ThemeMode = 'light' | 'dark';
type AppLocale = 'es' | 'en';

interface AppContextProps {
  themeMode: ThemeMode;
  locale: AppLocale;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  setLocale: (locale: AppLocale) => void;
  initializeApp: () => Promise<void>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [locale, setAppLocale] = useState<AppLocale>('es');

  const isDarkMode = themeMode === 'dark';

  const toggleTheme = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
    Preferences.set({ key: 'themeMode', value: newMode });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    Preferences.set({ key: 'themeMode', value: mode });
  };

  const setLocale = (newLocale: AppLocale) => {
    setAppLocale(newLocale);
    Preferences.set({ key: 'locale', value: newLocale });
    // Opcional: si usas RTL
    // I18nManager.forceRTL(newLocale === 'ar');
  };

  const initializeApp = async () => {
    const theme = (await Preferences.get({ key: 'themeMode' })).value as ThemeMode;
    const lang = (await Preferences.get({ key: 'locale' })).value as AppLocale;

    if (theme) setThemeMode(theme);
    else {
      const systemTheme = Appearance.getColorScheme();
      setThemeMode(systemTheme === 'dark' ? 'dark' : 'light');
    }

    if (lang) setAppLocale(lang);
    else setAppLocale('es');
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        themeMode,
        locale,
        isDarkMode,
        toggleTheme,
        setTheme,
        setLocale,
        initializeApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
