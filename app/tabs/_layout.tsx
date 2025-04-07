import {colors} from '@/constants/colors';
import {
  HeartIcon,
  HingeIcon,
  MessageIcon,
  PersonIcon,
  StarIcon,
} from '@/constants/icons';
import {Redirect, Tabs} from 'expo-router';
import React from 'react';

const TabLayout = () => {
  return <Redirect href="/(auth)/sign-in" />;
};

export default TabLayout;