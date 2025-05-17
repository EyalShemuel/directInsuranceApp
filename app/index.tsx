import { Href, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Onboarding from '../screens/Onboarding';
import SplashScreen from '../screens/SplashScreen';
import { isRTL } from '../utils/rtl';
import { setPageTitle } from '../utils/accessibility/setPageTitle';

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

  // הגדרת כותרת הדף במצב טעינה
  useEffect(() => {
    if (isLoading) {
      setPageTitle('טעינה | ביטוח ישיר');
    } else if (isFirstLaunch) {
      setPageTitle('ברוך הבא | ביטוח ישיר');
    } else {
      setPageTitle('ביטוח ישיר');
    }
  }, [isLoading, isFirstLaunch]);

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
    return (
      <>
        <Stack.Screen options={{ 
          title: "טעינה | ביטוח ישיר",
          headerShown: false
        }} />
        <SplashScreen />
      </>
    );
  }

  if (isFirstLaunch) {
    return (
      <>
        <Stack.Screen options={{ 
          title: "ברוך הבא | ביטוח ישיר",
          headerShown: false
        }} />
        <Onboarding onComplete={() => setIsFirstLaunch(false)} />
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-light bg-background-DEFAULT">
      <Stack.Screen options={{ 
        headerShown: false, 
        title: "ביטוח ישיר"
      }} />
      <View className="flex-1 justify-center items-center">
        <Text>טוען את האפליקציה...</Text>
      </View>
    </SafeAreaView>
  );
}
