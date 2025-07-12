import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default Logo;
 
