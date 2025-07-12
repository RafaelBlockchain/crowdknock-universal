// src/screens/challenges/ChallengeDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Challenge } from '../../models/Challenge';
import { ChallengeRepository } from '../../repositories/ChallengeRepository';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStackParamList';

type ChallengeDetailRouteProp = RouteProp<AppStackParamList, 'ChallengeDetail'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'ChallengeDetail'>;

export const ChallengeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChallengeDetailRouteProp>();
  const { challengeId } = route.params;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ChallengeRepository.fetchChallenge(challengeId)
      .then(setChallenge)
      .catch((err) => setError(err.message || 'Error desconocido'))
      .finally(() => setLoading(false));
  }, [challengeId]);

  const goToSubmission = () => {
    navigation.navigate('ChallengeSubmission', { challengeId });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !challenge) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Challenge no encontrado.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.status}>Estado: {challenge.status}</Text>
      <Text style={styles.description}>{challenge.description}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Participar" onPress={goToSubmission} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  status: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
