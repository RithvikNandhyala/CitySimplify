import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import { ChevronRightIcon } from '@/constants/icons';
import ActionBtn from '@/components/action-btn';
import { colors } from '@/constants/colors';

const NotificationScreen = () => {
  const router = useRouter();

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted', 'You may miss new messages.');
    }
    router.push('/(auth)/profile-intro'); // Replace with actual next screen
  };

  const skip = () => {
    router.push('/(auth)/profile-intro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={100} />
      <Type variant="displayLarge" style={styles.textCenter}>
        Never miss a message from your perfect match
      </Type>
      <Spacer size={60} />

      <TouchableOpacity style={styles.button} onPress={requestPermission}>
        <Type variant="title" color="black">Enable notifications</Type>
      </TouchableOpacity>

      <Spacer size={16} />

      <TouchableOpacity style={styles.button} onPress={skip}>
        <Type variant="title" color="black">Disable notifications</Type>
      </TouchableOpacity>

      <View style={styles.fab}>
        <ActionBtn onPress={skip}>
          <ChevronRightIcon height={28} width={28} fill={colors.grey2} />
        </ActionBtn>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.lightGrey2,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 20,
  },
});
