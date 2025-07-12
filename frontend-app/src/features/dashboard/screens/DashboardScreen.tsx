// frontend-app/src/features/dashboard/screens/DashboardScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../core/providers/AuthContext';

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user?.name || 'Usuario'}!</Text>
      <Text style={styles.subtitle}>Correo: {user?.email}</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
