// frontend-app/src/features/profile/screens/ProfileScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../core/providers/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Text style={styles.info}>Nombre: {user?.name}</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>
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
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});
