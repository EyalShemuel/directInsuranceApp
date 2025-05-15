import { Platform } from 'react-native';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

/**
 * פונקציה להגדרת תמיכה בעברית
 * מבצעת התאמות שונות לפלטפורמה (ווב או מובייל)
 */
export const setupHebrewSupport = async () => {
  // האם צריך לשנות את המצב RTL
  const shouldReload = !I18nManager.isRTL;
  
  // הגדרות לכל הפלטפורמות
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  // הגדרות ספציפיות עבור ווב
  if (Platform.OS === 'web') {
    // שינוי תכונת השפה של הדף בדפדפן לעברית
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', 'he');
      document.documentElement.setAttribute('dir', 'rtl');
      
      // הוספת סגנון RTL גלובלי
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        body {
          direction: rtl;
        }
        input, textarea {
          text-align: right;
        }
      `;
      document.head.appendChild(styleElement);
    }
  } 
  // אם צריך להפעיל מחדש את האפליקציה (רק במובייל)
  else if (shouldReload && Platform.OS !== 'web') {
    try {
      if (typeof Updates !== 'undefined' && Updates.reloadAsync) {
        console.log('מפעיל מחדש את האפליקציה עם ה-RTL החדש');
        // התעכב מעט לפני הפעלה מחדש כדי לאפשר העדכונים להישמר
        setTimeout(async () => {
          await Updates.reloadAsync();
        }, 500);
      }
    } catch (error) {
      console.error('שגיאה בהפעלה מחדש של האפליקציה:', error);
    }
  }
};
