import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/application/context/AuthContext';
import { AccessDeniedPage } from '@/presentation/pages/AccessDeniedPage';

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }, [isAuthenticated]);

  const userRole = user?.role;

  if (!isAuthenticated) {
    return null;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <AccessDeniedPage />;
  }

  return <>{children}</>;
};
