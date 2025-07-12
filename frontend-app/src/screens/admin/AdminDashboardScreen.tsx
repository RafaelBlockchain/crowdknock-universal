// src/screens/admin/AdminDashboardScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../../core/services/AuthService';
import { useAuthContext } from '../../core/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

export const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    Alert.alert(
      '¿Cerrar sesión?',
      'Esta acción te desconectará del sistema.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            await logout(); // borra token/contexto
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Control</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcomeText}>¡Bienvenido al Panel de Administración!</Text>
      </View>
    </View>
  );
};
