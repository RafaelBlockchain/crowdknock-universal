// src/components/payments/PaymentsTable.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { getAllPayments } from '@/services/paymentsService';
import { Payment } from '@/models/payment';

export const PaymentsTable: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getAllPayments();
      setPayments(data);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar los pagos');
    } finally {
      setLoading(false);
    }
  };

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (payments.length === 0) {
    return <Text style={styles.empty}>No hay pagos registrados.</Text>;
  }

  return (
    <ScrollView
      horizontal
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    >
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>ID Transacción</Text>
          <Text style={styles.headerCell}>Usuario</Text>
          <Text style={styles.headerCell}>Monto</Text>
          <Text style={styles.headerCell}>Estado</Text>
          <Text style={styles.headerCell}>Fecha</Text>
        </View>
        {payments.map((p) => (
          <View key={p.id} style={styles.row}>
            <Text style={styles.cell}>{p.id}</Text>
            <Text style={styles.cell}>{p.user}</Text>
            <Text style={styles.cell}>${p.amount.toFixed(2)}</Text>
            <Text style={styles.cell}>{p.status}</Text>
            <Text style={styles.cell}>{p.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    padding: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    minWidth: 140,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  cell: {
    minWidth: 140,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
