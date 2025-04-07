import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Type from '@/components/type';
import Spacer from '@/components/spacer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const FUNDING_OPTIONS = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Other'
];

type FundingEntry = {
  stage: string;
  amount: string;
};

const FundingStageScreen = () => {
  const [entries, setEntries] = useState<FundingEntry[]>([]);
  const [newStage, setNewStage] = useState(FUNDING_OPTIONS[0]);
  const [newAmount, setNewAmount] = useState('');
  const [expanded, setExpanded] = useState(false);

  const addFundingEntry = () => {
    if (!newAmount) return;
    setEntries([...entries, { stage: newStage, amount: newAmount }]);
    setNewAmount('');
    setNewStage(FUNDING_OPTIONS[0]);
    setExpanded(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Type variant="displayLarge">Funding Stage</Type>
      <Spacer size={20} />
      <Type variant="subtitle">
        Example: <Type variant="subtitleBold">Seed – $2.5M</Type>
      </Type>
      <Spacer size={30} />

      <FlatList
        data={entries}
        keyExtractor={(item, index) => `${item.stage}-${index}`}
        renderItem={({ item }) => (
          <Type variant="body">{item.stage} – ${item.amount}</Type>
        )}
        ListEmptyComponent={<Type variant="body">No funding added yet.</Type>}
      />

      <Spacer size={20} />

      {expanded ? (
        <View style={styles.entryContainer}>
          <Picker
            selectedValue={newStage}
            onValueChange={(itemValue) => setNewStage(itemValue)}>
            {FUNDING_OPTIONS.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
          <TextInput
            placeholder="Amount Raised (e.g. 2500000)"
            value={newAmount}
            onChangeText={setNewAmount}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.confirmBtn} onPress={addFundingEntry}>
            <Type variant="bodyBold" color="white">Add</Type>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setExpanded(true)} style={styles.addBtn}>
          <Ionicons name="add-circle-outline" size={28} color="#5E2B70" />
          <Type variant="bodyBold" color="black" style={{ marginLeft: 10 }}>
            Add Funding Entry
          </Type>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default FundingStageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 12,
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  entryContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmBtn: {
    backgroundColor: '#5E2B70',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
  },
});
