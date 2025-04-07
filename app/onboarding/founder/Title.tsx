import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import ActionBtn from '@/components/action-btn';
import { ChevronRightIcon } from '@/constants/icons';
import { colors } from '@/constants/colors';

const TitleScreen = () => {
  const router = useRouter();
  const [startupName, setStartupName] = useState('');

  const isValid = startupName.trim().length > 1;

  const handleNext = () => {
    if (isValid) {
      router.push('./onboarding/founder/pick-industry'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="displayLarge">What's your startup called?</Type>
      <Spacer size={16} />
      <Type variant="bodySmall" color="grey2">
        This will be shown at the top of your profile.
      </Type>
      <Spacer size={40} />

      <TextInput
        placeholder="Enter your startup name"
        placeholderTextColor={colors.grey2}
        style={styles.input}
        value={startupName}
        onChangeText={setStartupName}
        autoCapitalize="words"
      />

      <KeyboardAvoidingView
        style={styles.action}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ActionBtn
          onPress={handleNext}
          disabled={!isValid}
          backgroundColor={isValid ? 'primaryDark' : 'lightGrey2'}
        >
          <ChevronRightIcon
            height={32}
            width={32}
            fill={isValid ? colors.white : colors.grey2}
          />
        </ActionBtn>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TitleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: colors.grey1,
    paddingVertical: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.black,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
