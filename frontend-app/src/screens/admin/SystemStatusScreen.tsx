// src/screens/admin/SystemStatusScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SystemStatus } from '@/models/system/SystemStatus';
import { SystemStatusService } from '@/services/system/SystemStatusService';
import { AdminScaffold } from '@/components/layout/AdminScaffold';

export const SystemStatusScreen: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const data = await SystemStatusService.fetchStatus();
        setStatus(data);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Error al obtener estado del sistema');
      } finally {
        setLoading(false);
      }
    };
    loadStatus();
  }, []);

  const formatBytes = (bytes: number): string => {
    const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < suffixes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${suffixes[i]}`;
  };

  return (
    <AdminScaffold title="Estado del Sistema">
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : status ? (
        <ScrollView contentContainerStyle={styles.container}>
          <InfoTile label="⏱ Uptime del Servidor" value={`${status.serverUptime.toFixed(2)} segundos`} />
          <InfoTile label="👥 Usuarios Activos" value={String(status.activeUsers)} />
          <InfoTile label="💾 Uso de Memoria" value={formatBytes(status.memoryUsage)} />
          <InfoTile
            label="📉 Carga del Sistema"
            value={`1m: ${status.systemLoad[0]}, 5m: ${status.systemLoad[1]}, 15m: ${status.systemLoad[2]}`}
          />
          <InfoTile label="⚠️ Última Caída" value={status.lastDowntime} />
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <Text>No hay datos disponibles</Text>
        </View>
      )}
    </AdminScaffold>
  );
};

const InfoTile = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.tile}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  tile: {
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#555',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
