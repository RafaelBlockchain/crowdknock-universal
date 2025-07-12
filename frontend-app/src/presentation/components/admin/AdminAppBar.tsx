import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/application/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

type AdminAppBarProps = {
  title: string;
};

export const AdminAppBar: React.FC<AdminAppBarProps> = ({ title }) => {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const handleAction = (action: 'profile' | 'logout') => {
    if (action === 'logout') {
      Alert.alert('Cerrar sesión', '¿Estás seguro?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' as never }],
            });
          },
        },
      ]);
    }

    if (action === 'profile') {
      navigation.navigate('ProfileScreen' as never);
    }
  };

  return (
    <View style={styles.appBar}>
      <Text style={styles.title}>{title}</Text>

      {user && (
        <TouchableOpacity
          style={styles.userButton}
          onPress={() =>
            Alert.alert('Cuenta', `${user.name} (${user.role})`, [
              { text: 'Perfil 👤', onPress: () => handleAction('profile') },
              { text: 'Cerrar sesión 🔓', onPress: () => handleAction('logout') },
              { text: 'Cancelar', style: 'cancel' },
            ])
          }
        >
          <Ionicons name="person-circle-outline" size={24} />
          <Text style={styles.userName}>{user.name}</Text>
          <Ionicons name="chevron-down-outline" size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 14,
  },
});
