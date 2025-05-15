import { Stack } from "expo-router";
import './globals.css';
import { I18nManager } from 'react-native';
import '../i18n/i18n'; // ייבוא קובץ התרגום
import InitializeApp from "../components/InitializeApp";

// הגדרת RTL כבר בשלב הטעינה של האפליקציה
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  return (
    <InitializeApp>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </InitializeApp>
  );
}
