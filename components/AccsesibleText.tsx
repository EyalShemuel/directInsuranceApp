import React from 'react';
import { AccessibilityRole, Pressable, PressableProps, Text } from 'react-native';

// הרחבת הטיפוס AccessibilityRole כדי לכלול גם את הערך "paragraph"
type ExtendedAccessibilityRole = AccessibilityRole | 'paragraph';

export interface AccessibleTextProps extends Omit<PressableProps, 'accessibilityRole'> {
  // מאפייני טקסט
  text: string;
  type?: 'link' | 'error' | 'header' | 'text';
  linkPath?: string | null;
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  fontWeight?: 'normal' | 'bold' | 'italic';
  disabled?: boolean;
  
  // מאפייני נגישות משופרים
  accessibilityLabel?: string;
  accessibilityHint?: string;
  isLiveRegion?: boolean;
  textDirection?: 'rtl' | 'ltr' | 'auto';
  
  // מאפייני WAI-ARIA נוספים
  accessibilityRole?: ExtendedAccessibilityRole;
  ariaLevel?: number;
  ariaChecked?: boolean | 'mixed';
  ariaExpanded?: boolean;  
  ariaRequired?: boolean;
  ariaValueNow?: number;
  ariaValueMin?: number;
  ariaValueMax?: number;
  ariaValueText?: string;
  ariaHidden?: boolean;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
}

const AccessibleText: React.FC<AccessibleTextProps> = ({
  text,
  type = 'text',
  size = 'medium',
  linkPath = null,
  fontWeight = 'normal',
  accessibilityLabel,
  accessibilityHint,
  disabled = false, // האם הלינק לא פעיל (בהגדרת לינק)
  isLiveRegion = false,
  textDirection = 'auto',

  // מאפייני WAI-ARIA נוספים
  accessibilityRole,
  ariaLevel,
  ariaChecked,
  ariaExpanded,  
  ariaRequired,
  ariaValueNow,
  ariaValueMin,
  ariaValueMax,
  ariaValueText,
  ariaHidden,
  ariaDescribedBy,
  ariaLabelledBy,
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
    if (ariaChecked !== undefined) state.checked = ariaChecked; // עבור תפקידים כמו checkbox
    if (ariaChecked === 'mixed') state.mixed = true; // עבור תפקידים כמו checkbox עם מצב מעורב
    if (ariaExpanded !== undefined) state.expanded = ariaExpanded;
    if (ariaRequired !== undefined) state.required = ariaRequired;
    return state;
  };

  // קביעת תפקיד נגישות בהתאם לסוג או תפקיד שסופק
  const getAccessibilityRole = (): ExtendedAccessibilityRole | undefined => {
    if (accessibilityRole) return accessibilityRole;
    
    switch (type) {
      case 'link': return 'link';
      case 'header': return 'header';
      case 'error': return 'alert';
      case 'text': return 'paragraph'; // שימוש ב-paragraph עבור טקסט רגיל
      default: return 'text';
    }
  };

  // בניית הקומפוננטה בהתאם לסוג
  const textElement = (
    <Text
      accessibilityRole={getAccessibilityRole() as AccessibilityRole}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityHint={accessibilityHint}
      accessibilityState={getAccessibilityState()}
      accessibilityLiveRegion={isLiveRegion ? 'polite' : 'none'}
      aria-level={ariaLevel}
      aria-valuenow={ariaValueNow}
      aria-valuemin={ariaValueMin}
      aria-valuemax={ariaValueMax}
      aria-valuetext={ariaValueText}
      aria-hidden={ariaHidden}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
     
      
      className={`
        ${getTextSizeClass()}
        ${fontWeight === 'normal' ? 'font-normal' : fontWeight === 'bold' ? 'font-bold' : 'font-italic'}
        ${type === 'link' ? 'text-accent-DEFAULT underline' : 
          type === 'error' ? 'text-red-500' : 
          type === 'text' ? 'text-primary-DEFAULT' : 'text-text-DEFAULT'}
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
        accessibilityRole={'link' as AccessibilityRole}
        accessibilityLabel={accessibilityLabel || `קישור: ${text}`}
        accessibilityHint={accessibilityHint}
        accessibilityState={getAccessibilityState()}
        disabled={disabled}
        onPress={() => {
          // טיפול בניווט לקישור - כאן יש להשתמש בפונקציית ניווט מתאימה לפרויקט
          // לדוגמה: navigation.navigate(linkPath)
          console.log(`ניווט לקישור: ${linkPath}`);
        }}
        {...filteredRest}
      >
        {textElement}
      </Pressable>
    );
  }

  return textElement;
};

export default AccessibleText;