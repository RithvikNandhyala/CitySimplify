import {CloseIcon} from '@/constants/icons';
import {Stack, router} from 'expo-router';
import React from 'react';
import {Pressable} from 'react-native';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="phone-number"
        options={{
          headerBackVisible: false,
          headerTitle: '',
          headerRight: () => (
            <Pressable onPress={router.back}>
              <CloseIcon />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="verification-code"
        options={{
          headerBackVisible: false,
          headerTitle: '',
          headerRight: () => (
            <Pressable onPress={router.back}>
              <CloseIcon />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="help-center"
        options={{
          headerBackVisible: false,
          headerTitle: 'Help Center',
          headerRight: () => (
            <Pressable onPress={router.back}>
              <CloseIcon />
            </Pressable>
          ),
          headerShadowVisible: true,
        }}
        
      />
      <Stack.Screen
        name="choose-role"
        options={{
          headerBackVisible: false,
          headerTitle: '',
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={router.back}>
              <CloseIcon />
            </Pressable>
    ),
  }}
/>
    </Stack>
  );
  
};

export default AuthLayout;