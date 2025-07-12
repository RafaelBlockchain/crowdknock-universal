import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/application/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

type AdminScaffoldProps = {
  title: string;
  children: React.ReactNode;
};

export const AdminScaffold: React.FC<AdminScaffoldProps> = ({ title, children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleMenu = () => {
    if (!user) return;

    Alert.alert(
      `👤 ${user.name} (${user.role})`,
      'Opciones',
      [
        {
          text: 'Perfil',
          onPress: () => {
            navigation.navigate('ProfileScreen' as never);
          },
        },
        {
          text: 'Cerrar sesión 🔓',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' as never }],
            });
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.title}>{title}</Text>
        {user && (
          <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
            <Ionicons name="person-circle-outline" size={24} />
            <Text style={styles.userText}>{user.name}</Text>
            <Ionicons name="chevron-down-outline" size={16} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
};
