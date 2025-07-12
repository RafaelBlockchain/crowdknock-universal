// src/screens/settings/SettingsScreen.tsx

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LanguagePicker from '../../components/settings/LanguagePicker';
import { LocaleContext } from '../../context/LocaleContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { locale, getFlag, changeLanguage, t } = useContext(LocaleContext);

  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sí',
        onPress: async () => {
          await AsyncStorage.removeItem('jwt');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>{t('language')}</Text>

      <View style={styles.languageBox}>
        <Text style={styles.flag}>{getFlag(locale)}</Text>
        <Text style={styles.languageText}>
          {locale === 'es' ? 'Español' : 'English'}
        </Text>
        <LanguagePicker current={locale} onChange={changeLanguage} />
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },
  flag: {
    fontSize: 22,
    marginRight: 12,
  },
  languageText: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: '#ccc',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
