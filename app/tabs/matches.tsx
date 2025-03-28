import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Matches</Text>

      <Image
        style={styles.image}
        source={{
          uri: 'https://i.imgur.com/t6w1tE2.png', // Placeholder image
        }}
        resizeMode="contain"
      />

      <Text style={styles.subText}>Complete your profile to start getting matches</Text>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Edit profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Ionicons name="sparkles-outline" size={16} color="black" />
        <Text style={styles.secondaryButtonText}> Upgrade to HingeX</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  subText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
