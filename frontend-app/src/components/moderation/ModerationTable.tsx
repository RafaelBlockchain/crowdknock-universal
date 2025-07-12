// src/components/moderation/ModerationTable.tsx

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ModerationTable: React.FC = () => {
  // Simulación de datos de moderación
  const reports = [
    {
      id: '1',
      type: 'Video',
      reason: 'Contenido ofensivo',
      status: 'Pendiente',
      reportedBy: 'usuario123',
    },
    {
      id: '2',
      type: 'Comentario',
      reason: 'Spam',
      status: 'Pendiente',
      reportedBy: 'moderador456',
    },
  ];

  return (
    <View style={styles.card}>
      <ScrollView horizontal>
        <View>
          {/* Encabezado */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Tipo</Text>
            <Text style={styles.headerCell}>Motivo</Text>
            <Text style={styles.headerCell}>Reportado por</Text>
            <Text style={styles.headerCell}>Estado</Text>
            <Text style={styles.headerCell}>Acciones</Text>
          </View>

          {/* Filas de datos */}
          {reports.map((report) => (
            <View key={report.id} style={styles.row}>
              <Text style={styles.cell}>{report.id}</Text>
              <Text style={styles.cell}>{report.type}</Text>
              <Text style={styles.cell}>{report.reason}</Text>
              <Text style={styles.cell}>{report.reportedBy}</Text>
              <Text style={styles.cell}>{report.status}</Text>
              <View style={[styles.cell, styles.actions]}>
                <TouchableOpacity onPress={() => { /* aprobar */ }}>
                  <Feather name="check-circle" size={20} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* rechazar */ }} style={{ marginLeft: 12 }}>
                  <Feather name="x-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
