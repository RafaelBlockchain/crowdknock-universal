import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type LoadingIndicatorProps = {
  size?: number | 'small' | 'large';
  color?: string;
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 40,
  color = '#007bff', // Color primario por defecto
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={typeof size === 'number' ? 'large' : size}
        color={color}
        style={{
          width: typeof size === 'number' ? size : undefined,
          height: typeof size === 'number' ? size : undefined,
        }}
      />
    </View>
  );
};
