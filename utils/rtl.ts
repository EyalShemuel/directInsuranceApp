import { I18nManager, Platform } from 'react-native';

/**
 * הגדרת תמיכת RTL (ימין לשמאל) באפליקציה
 * פונקציה זו תתבצע פעם אחת בהפעלת האפליקציה
 */
export const setupRTL = () => {
  // הפעלת RTL בגרסאות המובייל
  if (Platform.OS !== 'web') {
    console.log('Setting up RTL for mobile...');
    // בדיקה אם RTL כבר מופעל
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      console.log('RTL forced for mobile');
    }
  } 
  // הפעלת RTL בגרסת הווב 
  else if (Platform.OS === 'web') {
    console.log('Setting up RTL for web...');
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
      // הוספת סגנון גלובלי להיפוך תצוגת טקסט
      const style = document.createElement('style');
      style.textContent = `
        body {
          direction: rtl !important;
          text-align: right !important;
        }
      `;
      document.head.appendChild(style);
      console.log('RTL set for web with global styling');
    }
  }
};

/**
 * בדיקה אם הממשק מוגדר במצב RTL
 * 
 * @returns האם הממשק מוגדר במצב RTL (true) או LTR (false)
 */
export const isRTL = () => {
  if (Platform.OS === 'web') {
    return typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
  }
  return I18nManager.isRTL;
};
