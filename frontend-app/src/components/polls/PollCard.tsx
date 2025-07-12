// src/components/polls/PollCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types'; // Define tus rutas aquí
import { PollModel } from '@/models/poll';

type Props = {
  poll: PollModel;
};

export const PollCard: React.FC<Props> = ({ poll }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToDetail = () => {
    navigation.navigate('PollDetail', { pollId: poll.id });
  };

  return (
    <TouchableOpacity onPress={goToDetail} style={styles.card}>
      <View>
        <Text style={styles.title}>{poll.question}</Text>
        <Text style={styles.subtitle}>Opciones: {poll.options.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
