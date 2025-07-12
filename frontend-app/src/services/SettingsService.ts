// src/services/SettingsService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings } from '../models/UserSettingsModel';

const STORAGE_KEY = 'user_settings';

export class SettingsService {
  /**
   * Guarda los ajustes del usuario como JSON en AsyncStorage
   */
  static async saveSettings(settings: UserSettings): Promise<void> {
    const jsonString = JSON.stringify(settings.toJson());
    await AsyncStorage.setItem(STORAGE_KEY, jsonString);
  }

  /**
   * Carga los ajustes desde almacenamiento local
   */
  static async loadSettings(): Promise<UserSettings> {
    const jsonString = await AsyncStorage.getItem(STORAGE_KEY);

    if (jsonString) {
      const parsed = JSON.parse(jsonString);
      return UserSettings.fromJson(parsed);
    }

    // Retorna configuración por defecto
    return new UserSettings({
      languageCode: 'es',
      isDarkMode: false,
      notificationsEnabled: true,
    });
  }

  /**
   * Elimina los ajustes (por ejemplo, al cerrar sesión)
   */
  static async clearSettings(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}
