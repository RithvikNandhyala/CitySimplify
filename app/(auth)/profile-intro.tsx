import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import { colors } from '@/constants/colors';

const ProfileIntroScreen = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/choose-location'); // Replace with your next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={60} />
      <Type variant="displayLarge" style={styles.textCenter}>
        The more you share, the stronger your matches will be.
      </Type>

      <Spacer size={60} />

      <Image
        source={require('@/assets/match-eyes.png')} // 👈 Replace with your own image!
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Type variant="titleBold" color="white">
            Complete your profile
          </Type>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    alignSelf: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.primaryDark,
  },
  button: {
    alignItems: 'center',
  },
});
