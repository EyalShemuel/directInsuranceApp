import { Href, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { I18nManager, SafeAreaView, Text, View, Platform, StyleSheet } from 'react-native';
import * as Updates from 'expo-updates';
import Onboarding from '../screens/Onboarding';
import SplashScreen from '../screens/SplashScreen';





export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  

  // וודא שהאפליקציה מוגדרת לתמיכה מלאה בעברית
  useEffect(() => {
    // בדיקה האם צריך לשנות את מצב ה-RTL
    const isRTL = I18nManager.isRTL;
    if (!isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      
      // אתחול מחדש של האפליקציה הכרחי כדי שה-RTL יעבוד כראוי
      if (Platform.OS !== 'web') {
        try {
          Updates.reloadAsync();
        } catch (error) {
          console.error('Failed to reload the app:', error);
        }
      }
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
          router.push("(auth)" as Href)
        console.log('Navigating to authScreen');
       
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
        <Text style={styles.rtlText}>טוען את האפליקציה...</Text>
      </View>
    </SafeAreaView>
  );
}

// הוספת סגנונות לתמיכה בעברית
const styles = StyleSheet.create({
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'right',
  }
});
