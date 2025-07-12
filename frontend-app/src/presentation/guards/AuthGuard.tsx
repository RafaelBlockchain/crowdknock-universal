import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/application/context/AuthContext';
import { setAuthToken } from '@/infrastructure/api/config';

type Props = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const { token, isAuthenticated, loading } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    if (token) {
      setAuthToken(token);
    }
  }, [isAuthenticated, loading, token]);

  if (loading || (token == null && !isAuthenticated)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
