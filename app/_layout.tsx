import { Stack } from "expo-router";
import './globals.css';
import { setupRTL } from '../utils/rtl';
import { useEffect } from "react";

// הגדרת RTL מוקדם ככל האפשר
setupRTL();

export default function RootLayout() {
  // הגדרת RTL גם בתוך הקומפוננטה למקרה שיש צורך בהגדרה חוזרת
  useEffect(() => {
    setupRTL();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          // הוספת כותרת ברירת מחדל לאפליקציה שתופיע לטכנולוגיות מסייעות
          title: "ביטוח ישיר",
        }}
      />
    </>
  )
}
