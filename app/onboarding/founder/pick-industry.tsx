import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import ActionBtn from '@/components/action-btn';
import { ChevronRightIcon } from '@/constants/icons';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const INDUSTRY_OPTIONS = [
  'Biotech',
  'SaaS',
  'ClimateTech',
  'Healthcare',
  'FinTech',
  'Consumer Tech',
  'AI/ML',
  'Robotics',
  'AgriTech',
  'Education',
  'Other',
];

const PickIndustryScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      setSelected(prev => prev.filter(i => i !== item));
    } else {
      setSelected(prev => [...prev, item]);
    }
  };

  const handleNext = () => {
    if (selected.length > 0) {
      router.push('/onboarding/founder/what-you-do'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={30} />
      <Type variant="displayLarge">Which industries best describe your startup?</Type>
      <Spacer size={40} />

      <TouchableOpacity style={styles.dropdown} onPress={() => setExpanded(!expanded)}>
        <Type variant="body">
          {selected.length > 0 ? selected.join(', ') : 'Select industries'}
        </Type>
        <Ionicons
          name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color={colors.grey2}
        />
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={INDUSTRY_OPTIONS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => toggleSelection(item)}
            >
              <Type variant="body">{item}</Type>
              <View style={styles.radioOuter}>
                {selected.includes(item) && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.action}>
        <ActionBtn
          onPress={handleNext}
          disabled={selected.length === 0}
          backgroundColor={selected.length > 0 ? 'primaryDark' : 'lightGrey2'}
        >
          <ChevronRightIcon
            height={32}
            width={32}
            fill={selected.length > 0 ? colors.white : colors.grey2}
          />
        </ActionBtn>
      </View>
    </SafeAreaView>
  );
};

export default PickIndustryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: colors.grey1,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryDark,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});