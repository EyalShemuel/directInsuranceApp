import React from 'react';
import { SafeAreaView } from 'react-native';
import AuthScreen from '../../screens/authScreen';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-light justify-center items-center">
      <AuthScreen />
    </SafeAreaView>
  )
}

