import React, { useState } from 'react';
import {
  Platform,
  StyleSheet, //NICEMAN fake comment 
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import ActionBtn from '@/components/action-btn';
import { ChevronRightIcon } from '@/constants/icons';
import { colors } from '@/constants/colors';

const BirthdayScreen = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (date) {
      router.push('/(auth)/notifications'); 
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="caption" color="grey2" style={styles.centerText}>
        We won't show your exact birthday.
      </Type>
      <Spacer size={30} />
      <Type variant="displayLarge">What's your birthday?</Type>
      <Spacer size={40} />

      <Pressable onPress={showDatePicker} style={styles.dateSelector}>
        <Type variant="titleBold" color={date ? 'black' : 'grey2'}>
          {date ? date.toDateString() : 'Select your birthdate'}
        </Type>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}

      <KeyboardAvoidingView
        style={styles.action}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ActionBtn
          onPress={handleNext}
          disabled={!date}
          backgroundColor={date ? 'primaryDark' : 'lightGrey2'}
        >
          <ChevronRightIcon
            height={32}
            width={32}
            fill={date ? colors.white : colors.grey2}
          />
        </ActionBtn>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BirthdayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  centerText: {
    textAlign: 'center',
  },
  dateSelector: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.grey1,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
