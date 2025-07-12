// src/screens/profile/ProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext'; // contexto personalizado
import { VersionService, VersionInfo } from '@/services/version.service';
import { Ionicons } from '@expo/vector-icons';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [loadingVersion, setLoadingVersion] = useState(true);

  useEffect(() => {
    VersionService.loadVersionInfo()
      .then(setVersionInfo)
      .catch(console.error)
      .finally(() => setLoadingVersion(false));
  }, []);

  if (!currentUser) {
    return (
      <View style={styles.centered}>
        <Text>No hay usuario autenticado</Text>
      </View>
    );
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 👤 Información del Usuario */}
      <View style={styles.card}>
        <Text style={styles.title}>👤 Información del Usuario</Text>
        <InfoRow label="Nombre:" value={currentUser.name} />
        <InfoRow label="Email:" value={currentUser.email} />
        <InfoRow label="Rol:" value={currentUser.role} />
        {currentUser.createdAt && (
          <InfoRow label="Desde:" value={new Date(currentUser.createdAt).toLocaleString()} />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChangePassword' as never)}
        >
          <Ionicons name="lock-closed-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Información de la Aplicación */}
      <View style={styles.card}>
        <Text style={styles.title}>🧾 Información de la Aplicación</Text>
        {loadingVersion ? (
          <ActivityIndicator />
        ) : versionInfo ? (
          <>
            <InfoRow label="Versión:" value={versionInfo.version} />
            <InfoRow label="Build:" value={versionInfo.build} />
            <InfoRow label="Entorno:" value={versionInfo.environment} />
            <InfoRow label="Framework:" value={versionInfo.flutterVersion} />
          </>
        ) : (
          <Text>Error al cargar versión</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
