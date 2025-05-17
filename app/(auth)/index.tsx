import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import AuthScreen from '../../screens/authScreen';
import { Stack } from 'expo-router';
import { setPageTitle } from '../../utils/accessibility/setPageTitle';

export default function Home() {
  // הגדרת כותרת הדף
  useEffect(() => {
    setPageTitle('התחברות | ביטוח ישיר');
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-light justify-center items-center">
      <Stack.Screen options={{ 
        title: "התחברות | ביטוח ישיר",
        headerShown: false
      }} />
      <AuthScreen />
    </SafeAreaView>
  )
}

