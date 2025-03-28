import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const LikesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.header}>Likes You</Text>

      <Image
        source={{
          uri: 'https://i.imgur.com/dTzWmW4.png', // placeholder illustration
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Complete your profile to start getting likes
      </Text>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Edit profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Ionicons name="sparkles-outline" size={16} color="black" />
        <Text style={styles.secondaryButtonText}> Upgrade to HingeX</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // light gray like the screenshot
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
