// src/screens/profile/ChangePasswordScreen.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { CustomTextField } from '@/components/common/CustomTextField';

export const ChangePasswordScreen: React.FC = () => {
  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword) {
      Alert.alert('Error', 'Ingrese su contraseña actual');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación

    setIsLoading(false);
    Alert.alert('Éxito', 'Contraseña actualizada exitosamente');

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>

      <CustomTextField
        label="Contraseña Actual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        inputRef={currentPasswordRef}
      />
      <CustomTextField
        label="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        inputRef={newPasswordRef}
      />
      <CustomTextField
        label="Confirmar Nueva Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        inputRef={confirmPasswordRef}
      />

      <View style={{ marginTop: 24 }}>
        <PrimaryButton
          label="Actualizar Contraseña"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
});
