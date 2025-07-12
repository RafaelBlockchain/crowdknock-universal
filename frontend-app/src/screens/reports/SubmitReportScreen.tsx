// src/screens/reports/SubmitReportScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type ReportRouteParams = {
  SubmitReportScreen: {
    reportedItemId: string;
    reportType: string;
  };
};

export const SubmitReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ReportRouteParams, 'SubmitReportScreen'>>();

  const { reportedItemId, reportType } = route.params;

  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert('Validación', 'Debes ingresar un motivo para el reporte.');
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Reemplazar por llamada real a backend
      await new Promise((res) => setTimeout(res, 1000));

      Alert.alert('Éxito', 'Reporte enviado correctamente.');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', `Error al enviar reporte: ${err}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Enviar Reporte</Text>

          <Text style={styles.label}>Motivo del reporte</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={5}
            placeholder="Describe el motivo del reporte..."
            value={reason}
            onChangeText={setReason}
            editable={!submitting}
          />

          {submitting ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Enviar Reporte" onPress={handleSubmit} color="#E53935" />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
});
