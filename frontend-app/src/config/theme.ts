// src/config/theme.ts

import { DefaultTheme } from 'styled-components/native';

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    primary: '#007bff',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#212529',
    icon: '#212529',
    appBar: '#ffffff',
  },
  typography: {
    bodyLarge: '16px',
    bodyMedium: '14px',
    bodySmall: '12px',
  },
  spacing: {
    inputPadding: '8px 12px',
  },
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    primary: '#007bff',
    background: '#121212',
    surface: '#1F1F1F',
    text: '#ffffff',
    icon: '#ffffff',
    appBar: '#1F1F1F',
  },
  typography: {
    bodyLarge: '16px',
    bodyMedium: '14px',
    bodySmall: '12px',
  },
  spacing: {
    inputPadding: '8px 12px',
  },
};
