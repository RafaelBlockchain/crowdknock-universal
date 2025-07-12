// src/screens/profile/EditProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { CustomTextField } from '@/components/common/CustomTextField';
import { PrimaryButton } from '@/components/common/PrimaryButton';

export const EditProfileScreen: React.FC = () => {
  const { user } = useAuth(); // Auth context con user.name y user.email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email inválido');
      return;
    }

    // TODO: Lógica para guardar perfil en backend
    Alert.alert('Éxito', 'Perfil actualizado exitosamente');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <CustomTextField
        label="Nombre"
        value={name}
        onChangeText={setName}
      />
      <CustomTextField
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={{ marginTop: 32 }}>
        <PrimaryButton label="Guardar Cambios" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
});
