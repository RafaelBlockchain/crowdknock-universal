// frontend-app/src/features/manage_content/screens/ManageContentScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Contenido</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
});
