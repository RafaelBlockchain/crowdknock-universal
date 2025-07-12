// src/models/UserSettingsModel.ts

export interface UserSettingsModel {
  languageCode: string;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  preferredRole?: string;
}

export class UserSettings implements UserSettingsModel {
  languageCode: string;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  preferredRole?: string;

  constructor({
    languageCode = 'es',
    isDarkMode = false,
    notificationsEnabled = true,
    preferredRole,
  }: Partial<UserSettingsModel> = {}) {
    this.languageCode = languageCode;
    this.isDarkMode = isDarkMode;
    this.notificationsEnabled = notificationsEnabled;
    this.preferredRole = preferredRole;
  }

  static fromJson(json: any): UserSettings {
    return new UserSettings({
      languageCode: json.languageCode ?? 'es',
      isDarkMode: json.isDarkMode ?? false,
      notificationsEnabled: json.notificationsEnabled ?? true,
      preferredRole: json.preferredRole ?? undefined,
    });
  }

  toJson(): Record<string, any> {
    return {
      languageCode: this.languageCode,
      isDarkMode: this.isDarkMode,
      notificationsEnabled: this.notificationsEnabled,
      preferredRole: this.preferredRole,
    };
  }

  copyWith(data: Partial<UserSettingsModel>): UserSettings {
    return new UserSettings({
      languageCode: data.languageCode ?? this.languageCode,
      isDarkMode: data.isDarkMode ?? this.isDarkMode,
      notificationsEnabled: data.notificationsEnabled ?? this.notificationsEnabled,
      preferredRole: data.preferredRole ?? this.preferredRole,
    });
  }

  toString(): string {
    return `UserSettings(languageCode: ${this.languageCode}, darkMode: ${this.isDarkMode}, notifications: ${this.notificationsEnabled}, role: ${this.preferredRole})`;
  }
}
