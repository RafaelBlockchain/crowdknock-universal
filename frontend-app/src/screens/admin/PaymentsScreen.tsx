// src/screens/admin/PaymentsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AdminScaffold } from '@/components/layout/AdminScaffold';
import { PaymentsTable } from '@/components/payments/PaymentsTable';

export const PaymentsScreen: React.FC = () => {
  return (
    <AdminScaffold title="Gestión de Pagos">
      <ScrollView contentContainerStyle={styles.container}>
        <PaymentsTable />
      </ScrollView>
    </AdminScaffold>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
