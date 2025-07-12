// src/screens/dashboard/DashboardScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { DashboardRepository } from '../../repositories/DashboardRepository';

export const DashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    DashboardRepository.fetchDashboardStats()
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al cargar el dashboard');
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: { label: string; count: string } }) => (
    <View style={styles.card}>
      <Text style={styles.count}>{item.count}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );

  const getStatItems = (): { label: string; count: string }[] => {
    if (!dashboardData) return [];
    return [
      { label: 'Usuarios', count: dashboardData.userCount?.toString() ?? '0' },
      { label: 'Contenidos', count: dashboardData.contentCount?.toString() ?? '0' },
      { label: 'Reportes', count: dashboardData.reportCount?.toString() ?? '0' },
      { label: 'Retos', count: dashboardData.challengeCount?.toString() ?? '0' },
    ];
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={getStatItems()}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};
