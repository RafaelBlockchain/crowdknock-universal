// src/screens/polls/PollDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import { PollService } from '@/services/poll.service';
import { PollModel } from '@/models/poll';

export const PollDetailScreen = () => {
  const route = useRoute<any>();
  const pollId = route.params?.pollId;

  const [poll, setPoll] = useState<PollModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const fetchPoll = async () => {
    try {
      const data = await new PollService().fetchPollById(pollId);
      setPoll(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la encuesta.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOption) return;
    try {
      await new PollService().vote(pollId, selectedOption);
      Alert.alert('Voto enviado', 'Voto registrado correctamente');
      setSelectedOption(null);
      fetchPoll(); // refrescar
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el voto');
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!poll) {
    return (
      <View style={styles.center}>
        <Text>Encuesta no disponible.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{poll.question}</Text>

      {poll.options.map((opt) => (
        <RadioButton.Item
          key={opt.id}
          label={opt.text}
          value={opt.id}
          status={selectedOption === opt.id ? 'checked' : 'unchecked'}
          onPress={() => setSelectedOption(opt.id)}
        />
      ))}

      <View style={styles.buttonContainer}>
        <Button
          title="Votar"
          onPress={handleVote}
          disabled={!selectedOption}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
