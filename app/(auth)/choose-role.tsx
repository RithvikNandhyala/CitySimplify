import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Type from '@/components/type';
import Spacer from '@/components/spacer';

const ChooseRoleScreen = () => {
  const router = useRouter();

  const handleSelect = (role: string) => {
    // Pass role to next step or store in state
    router.push('/(auth)/verification-code')
    // update this later
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="displayLarge">Are you an...</Type>
      <Spacer size={40} />

      <TouchableOpacity
        style={[styles.card, styles.investor]}
        onPress={() => handleSelect('investor')}
      >
        <Image
          source={{ uri: 'https://i.imgur.com/1YcJ9lZ.jpg' }}
          style={styles.image}
        />
        <Type variant="titleBold" color="white">Investor</Type>
      </TouchableOpacity>

      <Spacer size={20} />

      <TouchableOpacity
        style={[styles.card, styles.founder]}
        onPress={() => handleSelect('founder')}
      >
        <Image
          source={{ uri: 'https://i.imgur.com/1YcJ9lZ.jpg' }}
          style={styles.image}
        />
        <Type variant="titleBold" color="white">Startup Owner</Type>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChooseRoleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  investor: {
    backgroundColor: '#5E2B70',
  },
  founder: {
    backgroundColor: '#4C4C4C',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
  },
});
