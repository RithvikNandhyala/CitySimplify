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

const WhatYouDoScreen = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const isValid = description.trim().length > 15;

  const handleNext = () => {
    if (isValid) {
      router.push('/onboarding/founder/pick-industry');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="displayLarge">What does your startup do?</Type>
      <Spacer size={16} />
      <Type variant="bodySmall" color="white">
        Share your mission, product, or impact in a short sentence or two.
      </Type>
      <Spacer size={40} />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="We build AI-powered diagnostics to help doctors detect early-stage cancer."
        placeholderTextColor={colors.offWhite}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        maxLength={500}
      />
      <Type variant="bodySmall" color="white" style={styles.charCount}>
        {description.length}/500
      </Type>

      <KeyboardAvoidingView
        style={styles.action}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ActionBtn
          onPress={handleNext}
          disabled={!isValid}
          backgroundColor={isValid ? 'primaryDark' : 'white'}
        >
          <ChevronRightIcon
            height={32}
            width={32}
            fill={isValid ? colors.white : colors.offWhite}
          />
        </ActionBtn>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WhatYouDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: colors.white,
    paddingVertical: 12,
    fontWeight: '500',
    color: colors.black,
    backgroundColor: '#fff'
  },
  charCount: {
    marginTop: 6,
    textAlign: 'right',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
