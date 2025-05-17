import React from 'react';
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import AccsesibleText from './AccsesibleText';

// הטיפוסים של הפרופס של קומפוננטת הזנת הטקסט
export interface AccessibleTextInputProps extends TextInputProps {
  // התווית שתוצג מעל תיבת הטקסט
  label: string;
  
  // האם השדה חובה
  required?: boolean;
  
  // הודעת שגיאה (אם יש)
  errorMessage?: string;
  
  // האם להציג את הודעת השגיאה
  hasError?: boolean;
  
  // סטיילים נוספים שניתן להעביר
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  
  // מזהה נגישות
  accessibilityLabel?: string;
  
  // תיאור נגישות
  accessibilityHint?: string;
  
  // מתאר מצב שגיאה לנגישות
  accessibilityError?: string;
  
  // צבעים מותאמים אישית
  labelColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  errorColor?: string;
  backgroundColor?: string;
  textColor?: string;
  
  // אם קיים ערך משמעו שדה חובה
  requiredIndicator?: string;

  // נייטיב ווינד קלאסניימס
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const AccessibleTextInput: React.FC<AccessibleTextInputProps> = ({
  label,
  required = false,
  errorMessage,
  hasError = false,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  accessibilityLabel,
  accessibilityHint,
  accessibilityError,
  labelColor,
  placeholderColor,
  borderColor,
  errorColor = '#D32F2F',
  backgroundColor,
  textColor,
  requiredIndicator = ' *',
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...restProps
}) => {
  // יצירת מזהה ייחודי לקישור בין התווית לשדה (למטרות נגישות)
  const inputId = React.useId();
  
  // בדיקה אם שדה זה במצב שגיאה
  const isInErrorState = hasError && errorMessage;
  
  // בדיקת מצב RTL באפליקציה - יש כבר הגדרה גלובלית בפרויקט שלך
  const rtlEnabled = true; // תמיד נשתמש ב-RTL מאחר שהאפליקציה כבר מוגדרת כ-RTL גלובלית
  
  // טקסט לקורא מסך בעת מיקוד
  const accessibilityLabelText = accessibilityLabel || `${label}${required ? ', שדה חובה' : ''}`;
  
  // סטיילים בסיסיים עם נייטיב ווינד
  const containerClasses = `mb-4 w-full ${className}`;
  
  // הכנסת הצבע לתוך מחלקות tailwind אם אפשר, אחרת נשתמש ב-style
  let labelColorClass = '';
  if (labelColor) {
    // בדיקה אם יש צבע מוגדר מראש ב-tailwind
    if (labelColor.startsWith('#')) {
      // אם זה צבע הקסדצימלי, נצטרך להשתמש ב-style
    } else {
      // אחרת ננסה להשתמש במחלקת צבע של tailwind
      labelColorClass = `text-${labelColor}`;
    }
  }
  
  
  // בדיקה אם יש צבעים שאפשר להוסיף כמחלקות
  let textColorClass = '';
  let bgColorClass = '';
  let borderColorClass = '';
  
  if (textColor) {
    if (!textColor.startsWith('#')) {
      textColorClass = `text-${textColor}`;
    }
  }
  
  if (backgroundColor) {
    if (!backgroundColor.startsWith('#')) {
      bgColorClass = `bg-${backgroundColor}`;
    }
  }
  
  if (borderColor && !isInErrorState) {
    if (!borderColor.startsWith('#')) {
      borderColorClass = `border-${borderColor}`;
    }
  }

return (
  <View 
    style={containerStyle}
    className={containerClasses}
    accessible={false}
  >
    {/* תווית השדה - פתרון מפושט יותר */}
    <AccsesibleText
      text={required ? `${label} *` : label}
      type="text"
      className={`text-sm text-right w-full mb-1 ${labelColorClass} ${labelClassName}`}
      accessibilityLabel={`התווית ${label}${required ? ', שדה חובה' : ''}`}
      accessibilityRole="text"
      size="medium"
      fontWeight="normal"
    />
    
    {/* שדה הקלט עצמו */}
    <TextInput        
  className={`h-12 border-0 border-b w-full min-w-[200px] ${isInErrorState ? 'border-b-2 border-red-600' : borderColorClass || 'border-gray-300'} ${textColorClass} ${bgColorClass} text-base ${inputClassName}`}
  placeholderTextColor={placeholderColor}
  accessible={true}
  accessibilityLabel={accessibilityLabelText}
  accessibilityHint={accessibilityHint}
  accessibilityState={{ 
    disabled: restProps.editable === false
  }}
  aria-invalid={isInErrorState}
  accessibilityLabelledBy={`label-${inputId}`}
  accessibilityRole="text"
  style={{ 
    textAlign: rtlEnabled ? 'right' : 'left',
    width: '100%', // הוספת רוחב מלא
    minWidth: 280, // הגדרת רוחב מינימלי
    ...inputStyle 
  }} 
  {...restProps}
/>
    
    {/* הודעת שגיאה (אם יש) */}
    {isInErrorState && (
      <AccsesibleText
        text={errorMessage}
        type="error"
        className={`text-xs mt-1 text-red-600 text-right ${errorClassName}`}
        accessibilityLabel={`שגיאה: ${errorMessage}`}
        isLiveRegion={true}
        accessibilityRole="alert"
      />
    )}
  </View>
);
};

export default AccessibleTextInput;

