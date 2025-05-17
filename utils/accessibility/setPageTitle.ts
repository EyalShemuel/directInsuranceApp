/**
 * עזר להגדרת כותרת דף למטרות נגישות במובייל ובווב
 * 
 * בפלטפורמת הווב, זה ישנה את תגית ה-title במסמך HTML
 * במובייל, הוא יגדיר מאפייני נגישות מתאימים לאלמנט הבא
 */

import { Platform } from 'react-native';

/**
 * הגדרת כותרת דף נגישה לפי פלטפורמה
 * @param title הכותרת להגדרה
 */
export const setPageTitle = (title: string): void => {
  if (Platform.OS === 'web') {
    // הגדרת כותרת בווב
    document.title = title;
    
    // וידוא שיש תגית title במסמך
    let titleTag = document.querySelector('title');
    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }
    
    titleTag.setAttribute('data-rh', 'true');
    titleTag.textContent = title;
  }
  
  // במובייל, הכותרת מטופלת דרך Stack.Screen options
};

/**
 * מקבל אובייקט props ומוסיף לו מאפייני נגישות המתאימים לכותרת דף
 * @param props האובייקט המקורי
 * @param title הכותרת להוספה
 * @returns האובייקט המעודכן עם מאפייני נגישות
 */
export const withPageTitleAccessibility = (props: any, title: string): any => {
  return {
    ...props,
    accessibilityLabel: title,
    accessibilityRole: 'header',
    accessible: true,
  };
};
