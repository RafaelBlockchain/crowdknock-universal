// src/screens/challenges/ChallengeSubmissionScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DocumentPicker, { types as FileTypes } from 'react-native-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChallengeRepository } from '../../repositories/ChallengeRepository';
import { AppStackParamList } from '../../navigation/AppStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

type Props = NativeStackScreenProps<AppStackParamList, 'ChallengeSubmission'>;

export const ChallengeSubmissionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<Props['route']>();
  const { challengeId } = route.params;

  const [comment, setComment] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [FileTypes.pdf, FileTypes.images],
      });
      setFileName(res.name);
      setFilePath(Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'No se pudo seleccionar el archivo');
      }
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert('Validación', 'El comentario es obligatorio');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        comment,
        filePath,
      };

      await ChallengeRepository.submitParticipation(challengeId, data);

      Alert.alert('Éxito', 'Participación enviada con éxito', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error al enviar participación');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comentario o explicación:</Text>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Escribe tu comentario..."
      />

      <TouchableOpacity style={styles.attachButton} onPress={pickFile}>
        <Text style={styles.attachText}>📎 Adjuntar evidencia</Text>
      </TouchableOpacity>

      {fileName && (
        <Text style={styles.fileInfo}>Archivo seleccionado: {fileName}</Text>
      )}

      <View style={styles.submitSection}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button title="Enviar participación" onPress={handleSubmit} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  attachButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  attachText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
  fileInfo: {
    fontStyle: 'i
