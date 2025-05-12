import React from 'react';
import { SafeAreaView } from 'react-native';
import AuthScreen from './authScreen';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AuthScreen />
    </SafeAreaView>
  )
}

