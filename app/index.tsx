import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { I18nManager } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // וודא שהאפליקציה מוגדרת לתמיכה מלאה בעברית
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  useEffect(() => {
    // סימולציה של טעינת האפליקציה
    const timer = setTimeout(() => {
      setIsLoading(false);
      // בפרויקט אמיתי היינו בודקים אם זו הפעלה ראשונה באמצעות AsyncStorage
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ניהול ניווט לפי מצב הטעינה והפעלה ראשונה
  useEffect(() => {
    if (!isLoading) {
      if (!isFirstLaunch) {
        // router.replace('/(tabs)');
        console.log('Navigating to tabs');
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
    <SafeAreaView className="flex-1 bg-gray-light">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center">
        <Text>טוען את האפליקציה...</Text>
      </View>
    </SafeAreaView>
  );
}
