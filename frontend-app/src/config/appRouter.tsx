// src/config/appRouter.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Route, Routes, Navigate, useLocation } from 'react-router-native';

import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import ContentListPage from '../features/manage_content/pages/ContentListPage';
import AccessDeniedPage from '../features/access/AccessDeniedPage';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const loggedIn = false; // TODO: implementar lógica real de sesión

  const location = useLocation();

  if (!loggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (loggedIn && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        } />
        <Route path="/manage-content" element={
          <RequireAuth>
            <ContentListPage />
          </RequireAuth>
        } />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="*" element={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página no encontrada</Text>
          </View>
        } />
      </Routes>
    </NativeRouter>
  );
};

export default AppRouter;
