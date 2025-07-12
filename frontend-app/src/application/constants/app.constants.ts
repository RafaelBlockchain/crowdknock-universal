// src/application/constants/app.constants.ts

import { ColorValue } from 'react-native';

// 🌐 Rutas
export const AppRoutes = {
  login: '/login',
  dashboard: '/dashboard',
  manageContent: '/manage-content',
  accessDenied: '/access-denied',
};

// 📄 Textos globales
export const AppTexts = {
  appName: 'CrowdKnock',
  welcome: 'Bienvenido',
  loading: 'Cargando...',
  error: 'Ocurrió un error inesperado',
};

// 👤 Roles
export const AppRoles = {
  admin: 'admin',
  user: 'user',
  moderator: 'moderator',
};

// 🎨 Colores globales
export const AppColors: Record<string, ColorValue> = {
  primary: '#007bff',
  accent: '#448aff',
  danger: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
};

// ⏱️ Duraciones animaciones
export const AppDurations = {
  short: 200,
  medium: 400,
  long: 700,
};

// 📐 Tamaños y paddings
export const AppSizes = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,

  radiusSmall: 6,
  radiusMedium: 12,
  radiusLarge: 20,
};
