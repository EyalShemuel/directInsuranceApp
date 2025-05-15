import React, { useEffect, useState } from 'react';
import { I18nManager, Platform, View, Text, StyleSheet } from 'react-native';
import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';

// הגדרות מהאפליקציה
const appConfig = Constants.expoConfig?.extra || {};
const isRTL = appConfig.isRTL || true;

// למנוע הסתרה אוטומטית של מסך ה-splash
SplashScreen.preventAutoHideAsync().catch(() => {
  // לא לעשות כלום אם נכשל
});

export const InitializeApp = ({ children }: { children: React.ReactNode }) => {
  const [isRTLInitialized, setIsRTLInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeRTL() {
      try {
        // בדוק אם ה-RTL כבר הוגדר נכון
        const currentRTL = I18nManager.isRTL;
        
        if (currentRTL !== isRTL) {
          // הגדר תמיכה ב-RTL
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(isRTL);
          
          // הגדרות ספציפיות לווב
          if (Platform.OS === 'web' && typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', 'he');
            document.documentElement.setAttribute('dir', 'rtl');
            
            const styleElement = document.createElement('style');
            styleElement.textContent = `
              html, body { direction: rtl; }
              input, textarea { text-align: right; }
            `;
            document.head.appendChild(styleElement);
          } 
          // הגדרות ספציפיות למובייל - אתחול מחדש אם השתנה המצב
          else if (Platform.OS !== 'web') {
            // אם אנחנו בסביבת פיתוח נוכל להשתמש בהפעלה מחדש
            if (__DEV__) {
              console.log('מאתחל RTL לראשונה, האפליקציה תופעל מחדש');
              // ממתין מעט לפני הפעלה מחדש
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              if (Updates.reloadAsync) {
                await Updates.reloadAsync();
                return; // לא ימשיך אחרי הפעלה מחדש
              }
            }
          }
        }
        
        // מתגים את הדגל אם הכל עבר בהצלחה
        setIsRTLInitialized(true);
      } catch (err) {
        console.error('שגיאה באתחול RTL:', err);
        setError('התרחשה שגיאה בהגדרת תמיכה בעברית');
        // מראים את התוכן למרות השגיאה
        setIsRTLInitialized(true);
      } finally {
        // מסתירים את מסך ה-splash
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          // לא לעשות כלום אם נכשל
        }
      }
    }

    initializeRTL();
  }, []);

  // מציגים מסך טעינה עד שה-RTL מוגדר
  if (!isRTLInitialized) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>טוען...</Text>
      </View>
    );
  }

  // מציגים שגיאה אם יש
  if (error) {
    console.warn(error);
  }

  // מציגים את התוכן של האפליקציה אחרי שה-RTL הוגדר
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});

export default InitializeApp;
