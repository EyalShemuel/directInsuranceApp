import { Platform } from 'react-native';

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

export const withPageTitleAccessibility = (props: any, title: string): any => {
  return {
    ...props,
    accessibilityLabel: title,
    accessibilityRole: 'header',
    accessible: true,
  };
};
