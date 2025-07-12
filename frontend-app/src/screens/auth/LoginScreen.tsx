// src/screens/auth/LoginScreen.tsx

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import LoginForm from '../../components/auth/LoginForm';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formWrapper}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  formWrapper: {
    padding: 24,
  },
});
