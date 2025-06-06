import { Stack } from "expo-router";
import '../globals.css';

export default function RootLayout() {
  return (
    <>
     
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          // הוספת כותרת ברירת מחדל לאזור ההזדהות
          title: "התחברות | ביטוח ישיר",
        }}
      />
    </>
  )
}
