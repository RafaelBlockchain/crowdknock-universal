// src/screens/polls/PollListScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PollService } from '@/services/poll.service';
import { PollModel } from '@/models/poll';
import { PollCard } from '@/components/polls/PollCard';

export const PollListScreen = () => {
  const [polls, setPolls] = useState<PollModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const data = await new PollService().fetchPolls();
        setPolls(data);
      } catch (e) {
        setError('Error al cargar encuestas.');
      } finally {
        setLoading(false);
      }
    };

    loadPolls();
  }, []);

  const handlePress = (pollId: string) => {
    navigation.navigate('PollDetail', { pollId });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (polls.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay encuestas disponibles.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={polls}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <PollCard poll={item} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});
