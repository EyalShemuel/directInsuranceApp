import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// תרגומים
const resources = {
  he: {
    translation: {
      "פעולות_בקליק": "פעולות בקליק",
      "כל_המידע_במקום_אחד": "כל המידע במקום אחד",
      "הטבות": "הטבות",
      "יותר_ביטוח": "יותר ביטוח",
      "דלג": "דלג",
      "המשך": "המשך",
      "בואו_נתחיל": "בואו נתחיל!",
      // הוסף עוד תרגומים לפי הצורך
    }
  },
  en: {
    translation: {
      "פעולות_בקליק": "Actions with a Click",
      "כל_המידע_במקום_אחד": "All Information in One Place",
      "הטבות": "Benefits",
      "יותר_ביטוח": "More Insurance",
      "דלג": "Skip",
      "המשך": "Continue",
      "בואו_נתחיל": "Let's Start!",
      // הוסף תרגומים לאנגלית לפי הצורך
    }
  }
};

// אתחול i18n
i18n
  .use(initReactI18next) // מעביר את i18n למודול react-i18next
  .init({
    resources,
    lng: 'he', // שפת ברירת מחדל
    fallbackLng: 'en', // שפה למקרה שתרגום חסר
    interpolation: {
      escapeValue: false, // react כבר בורח מפני XSS
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
