import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import { colors } from '@/constants/colors';
import { ChevronRightIcon, ShieldIcon } from '@/constants/icons';
import ActionBtn from '@/components/action-btn';

const EnterNameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const isValid = firstName.trim().length > 0;

  const handleNext = () => {
    if (isValid) {
      router.push('/(auth)/help-center'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="caption" color="grey2" style={styles.centerText}>
        NO BACKGROUND CHECKS ARE CONDUCTED
      </Type>
      <Spacer size={30} />
      <Type variant="displayLarge">What’s your name?</Type>
      <Spacer size={30} />
      <TextInput
        placeholder="First name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Last name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />
      <Type variant="bodySmall" color="grey2">
        Last name is optional, and only shared with matches.{' '}
        <Type variant="bodySmallBold" color="primaryDark">
          Why?
        </Type>
      </Type>
      <Spacer size={20} />
      <View style={styles.eyeRow}>
        <ShieldIcon width={18} height={18} fill={colors.grey2} />
        <View style={{ width: 4 }} />
        <Type variant="bodySmall" color="grey2">
          Always visible on profile
        </Type>
      </View>

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

export default EnterNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  centerText: {
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.grey1,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  eyeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    zIndex: -1,
  },
});
