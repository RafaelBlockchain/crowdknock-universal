// src/screens/challenges/ChallengeListScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Challenge } from '../../models/Challenge';
import { ChallengeRepository } from '../../repositories/ChallengeRepository';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStackParamList';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'ChallengeList'>;

export const ChallengeListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ChallengeRepository.fetchAllChallenges()
      .then(setChallenges)
      .catch((err) => setError(err.message || 'Error desconocido'))
      .finally(() => setLoading(false));
  }, []);

  const openDetail = (challengeId: string) => {
    navigation.navigate('ChallengeDetail', { challengeId });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (challenges.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No hay retos disponibles.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={challenges}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => openDetail(item.id)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
  },
});
