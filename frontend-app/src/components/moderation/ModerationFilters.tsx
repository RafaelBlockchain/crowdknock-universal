// src/components/moderation/ModerationFilters.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type ModerationFiltersProps = {
  onFilterChanged: (type: string, status: string) => void;
};

export const ModerationFilters: React.FC<ModerationFiltersProps> = ({ onFilterChanged }) => {
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const contentTypes = ['Todos', 'Video', 'Comentario', 'Audio'];
  const statusTypes = ['Todos', 'Pendiente', 'Aprobado', 'Rechazado'];

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onFilterChanged(value, selectedStatus);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    onFilterChanged(selectedType, value);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo de contenido</Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={handleTypeChange}
          style={styles.picker}
        >
          {contentTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Estado del reporte</Text>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={handleStatusChange}
          style={styles.picker}
        >
          {statusTypes.map((status) => (
            <Picker.Item key={status} label={status} value={status} />
          ))}
        </Picker>
      </View>
    </View>
  );
};
