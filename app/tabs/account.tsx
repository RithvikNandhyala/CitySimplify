import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Nav */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>Hinge</Text>
        <View style={styles.iconRow}>
          <Ionicons name="options-outline" size={22} style={styles.icon} />
          <Feather name="settings" size={22} style={styles.icon} />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileRow}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={50} color="#ccc" />
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>0%</Text>
          </View>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>Joshua</Text>
          <Text style={styles.status}>Incomplete profile</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.tabActive]}>Get more</Text>
        <Text style={styles.tab}>Safety <Text style={styles.dotPurple}>●</Text></Text>
        <Text style={styles.tab}>My Hinge <Text style={styles.dotRed}>●</Text></Text>
      </View>

      {/* HingeX Promo */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.imgur.com/1YcJ9lZ.jpg' }}
          style={styles.cardImage}
        />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>HingeX</Text>
          <Text style={styles.cardSubtitle}>Get seen sooner and go on 3x as many dates</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Boost + Roses */}
      <View style={styles.actionCard}>
        <View style={styles.actionLeft}>
          <Ionicons name="flash" size={20} color="#00766F" />
          <Text style={styles.actionTitle}>Boost</Text>
        </View>
        <Text style={styles.actionSubtext}>Get seen by 11X more people</Text>
      </View>

      <View style={styles.actionCard}>
        <View style={styles.actionLeft}>
          <Ionicons name="rose-outline" size={20} color="#A03B9D" />
          <Text style={styles.actionTitle}>Roses</Text>
        </View>
        <Text style={styles.actionSubtext}>2x as likely to lead to a date</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 18,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileBadge: {
    position: 'absolute',
    bottom: -2,
    backgroundColor: '#5E2B70',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  profileBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  profileText: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  tab: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabActive: {
    color: '#000',
    fontWeight: '700',
  },
  dotPurple: {
    color: '#814EBF',
  },
  dotRed: {
    color: '#D3405F',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    marginBottom: 8,
  },
  upgradeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  upgradeButtonText: {
    fontWeight: '600',
    color: '#000',
  },
  actionCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionSubtext: {
    fontSize: 13,
    color: '#555',
  },
});
