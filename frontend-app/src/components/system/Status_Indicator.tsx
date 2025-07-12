// src/components/system/StatusIndicator.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface StatusIndicatorProps {
  label: string;
  isOnline: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ label, isOnline }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={isOnline ? 'check-circle' : 'cancel'}
        size={20}
        color={isOnline ? 'green' : 'red'}
      />
      <Text style={styles.text}>
        {`${label}: ${isOnline ? 'Activo' : 'Inactivo'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});
