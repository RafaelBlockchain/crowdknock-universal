// frontend-app/src/features/challenges/screens/ChallengesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChallengesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Retos</Text>
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
})
