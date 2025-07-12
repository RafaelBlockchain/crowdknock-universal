// src/screens/profile/EditProfileScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan@example.com');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Correo no válido');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // TODO: Integrar con UserService real
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Éxito', 'Perfil actualizado');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre completo"
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} />
        ) : (
          <Button title="Guardar Cambios" onPress={handleSave} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
