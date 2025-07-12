// src/screens/referrals/InviteFriendsScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  Share,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener `expo/vector-icons` o similar

interface Props {
  userId: string;
}

export const InviteFriendsScreen: React.FC<Props> = ({ userId }) => {
  const baseUrl = 'https://tusitio.com/invite';
  const inviteLink = `${baseUrl}?ref=${userId}`;

  const shareUniversal = async () => {
    try {
      await Share.share({
        message: `¡Únete a esta app genial! 👉 ${inviteLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el enlace.');
    }
  };

  const shareToWhatsApp = async () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`Únete a esta app 👉 ${inviteLink}`)}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se pudo abrir WhatsApp');
      }
    } catch {
      Alert.alert('Error', 'No se pudo abrir WhatsApp');
    }
  };

  const shareToFacebook = async () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se pudo abrir Facebook');
      }
    } catch {
      Alert.alert('Error', 'No se pudo abrir Facebook');
    }
  };

  const copyLink = async () => {
    await Share.share({ message: inviteLink });
    Alert.alert('Copiado', '¡Enlace copiado al portapapeles!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Invita a tus amigos y gana recompensas 🎉</Text>

      <Option icon={<FontAwesome name="whatsapp" size={24} color="green" />} label="Invitar por WhatsApp" onPress={shareToWhatsApp} />
      <Option icon={<FontAwesome name="facebook" size={24} color="#1877F2" />} label="Compartir en Facebook" onPress={shareToFacebook} />
      <Option icon={<Ionicons name="copy" size={24} color="gray" />} label="Copiar enlace" onPress={copyLink} />
      <Option icon={<Ionicons name="share-social-outline" size={24} color="black" />} label="Más opciones..." onPress={shareUniversal} />
    </ScrollView>
  );
};

const Option = ({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    fontWeight: '500',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
});
