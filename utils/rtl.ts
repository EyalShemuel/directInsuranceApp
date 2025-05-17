import { I18nManager, Platform } from 'react-native';

/**
 * הגדרת תמיכת RTL (ימין לשמאל) באפליקציה
 * פונקציה זו תתבצע פעם אחת בהפעלת האפליקציה
 */
export const setupRTL = () => {
  // הפעלת RTL בגרסאות המובייל
  if (Platform.OS !== 'web') {
    console.log('Setting up RTL for mobile...');
    try {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      console.log('RTL forced for mobile');
    } catch (error) {
      console.error('Error setting up RTL:', error);
    }
    
    // נרשום את מצב ה-RTL לצורכי דיבוג
    console.log('האם במצב RTL:', I18nManager.isRTL);
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
        html, body {
          direction: rtl !important;
        }
        body, div, p, input, textarea, select, button, label {
          text-align: right !important;
        }
        /* טיפול ספציפי בתוויות של שדות קלט */
        label, .label, [role="text"] {
          display: block !important;
          text-align: right !important;
          direction: rtl !important;
          width: 100% !important;
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
