import { I18nManager, Platform } from 'react-native';


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

export const isRTL = () => {
  if (Platform.OS === 'web') {
    return typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
  }
  return I18nManager.isRTL;
};
