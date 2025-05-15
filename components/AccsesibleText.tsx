import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

export interface AccessibleTextProps extends PressableProps {
  text: string;
  type?: 'link' | 'error' | 'header' | 'normal';
  linkPath?: string | null;
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  fontWeight?: 'normal' | 'bold' | 'italic';
  disabled?: boolean;
  
  // מאפייני נגישות משופרים
  accessibilityLabel?: string;
  accessibilityHint?: string;
  isLiveRegion?: boolean;
  textDirection?: 'rtl' | 'ltr' | 'auto';
}

const AccessibleText: React.FC<AccessibleTextProps> = ({
  text,
  type = 'normal',
  size = 'medium',
  linkPath = null,
  fontWeight = 'normal',
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  isLiveRegion = false,
  textDirection = 'auto',
  ...rest
}: AccessibleTextProps) => {
  
  // פונקציה להחזרת קלאס הטקסט בהתאם לגודל
  const getTextSizeClass = () => {
    switch (size) {
      case 'extraSmall':
        return 'text-xs';
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-2xl';
      case 'xlarge':
        return 'text-4xl';
      case 'xxlarge':
        return 'text-6xl';
      default:
        return 'text-base';
    }
  };

  // הסרת props עם ערך null
  const filteredRest = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v !== null)
  );

  // בדיקה האם האלמנט אינטראקטיבי
  const isInteractive = type === 'link' && linkPath;
  
  // הגדרת מצבי נגישות בהתאם לסוג האלמנט
  const getAccessibilityState = () => {
    const state: any = {};
    if (disabled) state.disabled = true;
    if (type === 'error') state.error = true;
    return state;
  };

  // בניית הקומפוננטה בהתאם לסוג
  const textElement = (
    <Text
      accessibilityRole={type === 'link' ? 'link' : type === 'header' ? 'header' : type === 'error' ? 'alert' : 'text'}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityHint={accessibilityHint}
      accessibilityState={getAccessibilityState()}
      accessibilityLiveRegion={isLiveRegion ? 'polite' : 'none'}
      
      className={`
        ${getTextSizeClass()}
        ${fontWeight === 'normal' ? 'font-normal' : fontWeight === 'bold' ? 'font-bold' : 'font-italic'}
        ${type === 'link' ? 'text-accent-DEFAULT underline' : 
          type === 'error' ? 'text-red-500' : 
          type === 'normal' ? 'text-primary-DEFAULT' : 'text-text-DEFAULT'}
        ${disabled ? 'opacity-50' : ''}
      ` || ''}
      {...filteredRest}
    >
      {text}
    </Text>
  );

  // עטיפת האלמנט ב-Pressable אם זה לינק אינטראקטיבי
  if (isInteractive && !disabled) {
    return (
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel || `קישור: ${text}`}
        accessibilityHint={accessibilityHint}
        disabled={disabled}
        {...filteredRest}
      >
        {textElement}
      </Pressable>
    );
  }

  return textElement;
};

export default AccessibleText;