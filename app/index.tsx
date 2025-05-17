import { Href, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Onboarding from '../screens/Onboarding';
import SplashScreen from '../screens/SplashScreen';
import { isRTL } from '../utils/rtl';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // וודא שהמערכת מזהה שאנחנו במצב RTL
  console.log('האם במצב RTL:', isRTL());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('הטעינה הסתיימה');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ניהול ניווט לפי מצב הטעינה והפעלה ראשונה
  useEffect(() => {
    if (!isLoading) {
      if (!isFirstLaunch) {
        router.push('(auth)' as Href);
        console.log('מעביר ל-(auth)');
      }
    }
  }, [isLoading, isFirstLaunch, router]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isFirstLaunch) {
    return <Onboarding onComplete={() => setIsFirstLaunch(false)} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-light bg-background-DEFAULT">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center">
        <Text>טוען את האפליקציה...</Text>
      </View>
    </SafeAreaView>
  );
}
