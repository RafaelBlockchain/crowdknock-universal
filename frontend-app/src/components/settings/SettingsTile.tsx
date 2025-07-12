// src/components/settings/SettingsTile.tsx

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SettingsTileProps = {
  icon: string; // Nombre del ícono Material (ej: 'settings', 'lock')
  title: string;
  subtitle?: string;
  onPress: (event: GestureResponderEvent) => void;
  iconColor?: string;
  showTrailing?: boolean;
};

export const SettingsTile: React.FC<SettingsTileProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  iconColor = '#007bff',
  showTrailing = true,
}) => {
  return (
    <Pressable style={styles.tile} onPress={onPress}>
      <View style={styles.left}>
        <Icon name={icon} size={24} color={iconColor} style={styles.icon} />
      </View>

      <View style={styles.middle}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showTrailing && (
        <Icon name="chevron-right" size={24} color="#ccc" style={styles.trailing} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  left: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  middle: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  trailing: {
    marginLeft: 8,
  },
});
