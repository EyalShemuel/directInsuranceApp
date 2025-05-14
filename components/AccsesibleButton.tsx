import { useColorScheme } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import {
  AccessibilityState,
  ActivityIndicator,
  I18nManager,
  Pressable,
  PressableProps,
  Text,
  View
} from 'react-native';

// מגדירים את הצבעים במקום מרכזי אחד לקלות התחזוקה
const COLORS = {
  primary: {
    DEFAULT: '#1D2B59',
    lighter: '#3A4B84',
    darker: '#141E40'
  },
  secondary: {
    DEFAULT: '#4B5563'
  },
  accent: {
    DEFAULT: '#0077B6',
    light: '#00A8E8'
  },
  text: {
    DEFAULT: '#1F2937'
  },
  gray: {
    100: '#F3F4F6',
    300: '#D1D5DB'
  }
};

export interface AccessibleButtonProps extends PressableProps {
  // הטקסט שיוצג על הכפתור
  label: string;
  
  // האם הכפתור במצב טעינה
  isLoading?: boolean;
  
  // האם הכפתור מושבת
  disabled?: boolean;
  
  // גודל הכפתור: קטן, בינוני או גדול
  size?: 'small' | 'medium' | 'large';
  
  // סוג הכפתור: ראשי, משני, מתאר, SMS, whatsapp, email, או קישור
  variant?: 'primary' | 'secondary' | 'outlined' | 'sms' | 'whatsapp' | 'email' | 'link';  
  
  // אייקון שיוצג בתחילת הכפתור (בהתאם לכיווניות)
  startIcon?: React.ReactNode;
  
  // אייקון שיוצג בסוף הכפתור (בהתאם לכיווניות)
  endIcon?: React.ReactNode;
  
  // הודעת נגישות נוספת לקוראי מסך
  accessibilityHint?: string;
  
  // האם הכפתור ממלא את כל הרוחב
  fullWidth?: boolean;
  
  // האם להראות את הכפתור כפעיל (גם ללא לחיצה)
  active?: boolean;
}

/**
 * כפתור נגיש שתומך בתכונות נגישות, מצבים שונים ועיצוב מותאם
 */
const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  isLoading = false,
  disabled = false,
  size = 'medium',
  variant = 'primary',  
  startIcon = null,
  endIcon = null,
  accessibilityHint,
  fullWidth = true,
  active = true,
  style,
  onPress,
  className = '',
  ...rest
}) => {
  // משתנה מצב לעקיבה אחרי האם הכפתור נלחץ
  const [isPressed, setIsPressed] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // האם ממשק המשתמש במצב RTL
  const isRTL = I18nManager.isRTL;
  
  // ארגון מחדש של האייקונים לפי כיווניות
  const leftIcon = isRTL ? endIcon : startIcon;
  const rightIcon = isRTL ? startIcon : endIcon;
  
  // מגדיר מצבי נגישות לקוראי מסך
  const accessibilityState: AccessibilityState = {
    disabled: disabled || isLoading,
    busy: isLoading
    // הוספת תמיכה במצב לחוץ (הוסר pressed כי אינו נתמך)
  };

  // בונה את מחלקות העיצוב בהתבסס על המאפיינים - עם אופטימיזציית useMemo
  const containerClasses = useMemo(() => {
    let classes = "flex flex-row items-center justify-center ";
    
    // הוספת עיגול פינות לפי סוג הכפתור
    if (['sms', 'email', 'whatsapp'].includes(variant)) {
      classes += "rounded-md ";
    } else {
      classes += "rounded-xl ";
    }
    
    // הוספת מחלקות לפי גודל
    if (size === 'small') {
      classes += "px-3 py-1.5 ";
    } else if (size === 'medium') {
      classes += "px-4 py-2.5 ";
    } else if (size === 'large') {
      classes += "px-6 py-3.5 ";
    }
    
    // הוספת מחלקות לפי סוג ומצב dark/light
    if (variant === 'primary') {
      classes += `bg-primary-DEFAULT ${isDarkMode ? 'bg-opacity-90 ' : ''} `;
      if (isPressed || active) {
        classes += "bg-primary-darker ";
      }
      if (disabled) {
        classes += "bg-opacity-50 border-opacity-50 ";
      }
    } else if (variant === 'secondary') {
      classes += `bg-secondary-DEFAULT ${isDarkMode ? 'bg-opacity-90 ' : ''} `;
      if (isPressed || active) {
        classes += "bg-secondary-DEFAULT/80 ";
      }
      if (disabled) {
        classes += "bg-opacity-50 ";
      }
    } else if (variant === 'outlined') {
      classes += "bg-transparent border border-primary-DEFAULT ";
      if (isPressed || active) {
        classes += "border-primary-darker bg-primary-DEFAULT/10 ";
      }
      if (disabled) {
        classes += "border-opacity-50 ";
      }
    } else if (variant === 'sms') {
      classes += "bg-primary-DEFAULT ";
      if (isPressed || active) {
        classes += "bg-primary-darker ";
      }
      if (disabled) {
        classes += "bg-opacity-50 ";
      }
    } else if (variant === 'email' || variant === 'whatsapp') {
      classes += "bg-transparent border border-gray-300 ";
      if (isPressed || active) {
        classes += "bg-gray-100 ";
      }
      if (disabled) {
        classes += "border-opacity-50 ";
      }
    } else if (variant === 'link') {
      classes += "bg-transparent ";
    }
    
    // האם למלא את כל הרוחב
    if (fullWidth) {
      classes += "w-full ";
    }
    
    return classes;
  }, [variant, size, isPressed, active, disabled, fullWidth, isDarkMode]);
  
  // מחלקות עיצוב לטקסט - עם אופטימיזציית useMemo
  const textClasses = useMemo(() => {
    let classes = "";
    
    // גודל טקסט לפי גודל הכפתור
    if (size === 'small') {
      classes += "text-sm ";
    } else if (size === 'medium') {
      classes += "text-base ";
    } else if (size === 'large') {
      classes += "text-lg ";
    }
    
    // משקל גופן
    classes += "font-medium ";
    
    // צבע הטקסט לפי סוג הכפתור
    if (variant === 'primary') {
      classes += "text-white ";
    } else if (variant === 'secondary') {
      classes += "text-white ";
    } else if (variant === 'outlined') {
      classes += `text-primary-DEFAULT ${isDarkMode ? 'opacity-90 ' : ''}`;
    } else if (variant === 'sms') {
      classes += "text-white ";
    } else if (variant === 'email' || variant === 'whatsapp') {
      classes += `text-text-DEFAULT ${isDarkMode ? 'text-gray-100 ' : ''}`;
    } else if (variant === 'link') {
      classes += "text-accent-DEFAULT ";
      if (isPressed || active) {
        classes += "text-accent-light ";
      }
    }
    
    if (disabled) {
      classes += "opacity-60 ";
    }
    
    return classes;
  }, [variant, size, isPressed, active, disabled, isDarkMode]);

  // מטפל באירוע לחיצה - עם אופטימיזציית useCallback
  const handlePress = useCallback((event: any) => {
    if (!disabled && !isLoading && onPress) {
      onPress(event);
    }
  }, [disabled, isLoading, onPress]);
  
  // הרווח בין האייקון לטקסט - עם אופטימיזציית useMemo
  const iconSpacerClass = useMemo(() => {
    return size === 'small' ? 'w-1' : 'w-2';
  }, [size]);
  
  // סגנון אינדיקטור הטעינה - עם אופטימיזציית useMemo
  const spinnerColor = useMemo(() => {
    if (isDarkMode) {
      return 'white'; // בדארק מוד תמיד לבן
    }
    
    if (variant === 'primary') return 'white';
    if (variant === 'sms') return 'white';
    if (variant === 'secondary') return 'white';
    
    // שימוש בצבעים מהתמה במקום צבע קשיח
    return COLORS.primary.DEFAULT;
  }, [variant, isDarkMode]);
  
  // גודל הספינר בהתאם לגודל הכפתור
  const spinnerSize = useMemo(() => {
    return size === 'small' ? 'small' : size === 'medium' ? 'small' : 'large';
  }, [size]);

  // טיפול באירועי לחיצה - עם אופטימיזציית useCallback
  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  return (
    <Pressable
      className={`${containerClasses} ${className}`}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
      disabled={disabled || isLoading}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style || {}}
      {...rest}
    >
      {/* אייקון שמאלי */}
      {leftIcon && !isLoading && (
        <>
          {leftIcon}
          <View className={iconSpacerClass} />
        </>
      )}
      
      {/* מציג אינדיקטור טעינה אם יש טעינה */}
      {isLoading ? (
        <ActivityIndicator size={spinnerSize} color={spinnerColor} />
      ) : (
        <Text className={textClasses}>{label}</Text>
      )}
      
      {/* אייקון ימני */}
      {rightIcon && !isLoading && (
        <>
          <View className={iconSpacerClass} />
          {rightIcon}
        </>
      )}
    </Pressable>
  );
};

export default React.memo(AccessibleButton);