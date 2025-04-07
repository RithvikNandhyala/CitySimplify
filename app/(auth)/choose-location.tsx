import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import ActionBtn from '@/components/action-btn';
import { ChevronRightIcon } from '@/constants/icons';
import { colors } from '@/constants/colors';

const LocationScreen = () => {
  const router = useRouter();
  const [locationText, setLocationText] = useState('');
  const [region, setRegion] = useState({
    latitude: 40.7128, // default NYC
    longitude: -74.006,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  });

  const isValid = locationText.length > 0;

  const handleNext = () => {
    if (isValid) {
      router.push('/(auth)/entername'); // replace with your actual next step
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={16} />
      <Type variant="displayLarge">Where do you live?</Type>
      <Spacer size={12} />
      <Type variant="bodySmall" color="grey2">
        Only your neighborhood name will be shown on your profile.
      </Type>
      <Spacer size={20} />

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
      >
        <Marker coordinate={region} />
      </MapView>

      <Spacer size={20} />
      <TextInput
        placeholder="Enter your address, neighborhood, or ZIP"
        style={styles.input}
        value={locationText}
        onChangeText={setLocationText}
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

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  map: {
    height: 250,
    borderRadius: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.grey1,
    paddingVertical: 12,
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
