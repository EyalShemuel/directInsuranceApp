import React from 'react';
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

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
  
  // טקסט לקורא מסך בעת מיקוד
  const accessibilityLabelText = accessibilityLabel || `${label}${required ? ', שדה חובה' : ''}`;
  
  // טקסט לקורא מסך עבור תיאור השגיאה (אם יש)
  const accessibilityErrorText = accessibilityError || errorMessage;

  // סטיילים בסיסיים עם נייטיב ווינד
  const containerClasses = `mb-4 w-full ${className}`;
  const labelClasses = `text-sm mb-1.5 font-medium ${labelClassName}`;
  const inputClasses = `h-10 border-0 border-b ${isInErrorState ? 'border-b-2 border-red-600' : 'border-gray-300'} px-2 text-base ${inputClassName}`;
  const errorClasses = `text-xs mt-1 text-red-600 ${errorClassName}`;

  return (
    <View 
      style={containerStyle}
      className={containerClasses}
      accessible={false}
    >
      {/* תווית השדה */}
      <Text
        style={[
          labelColor ? { color: labelColor } : null,
          labelStyle
        ]}
        className={labelClasses}
        nativeID={`label-${inputId}`}
        accessibilityRole="text"
      >
        {label}
        {required && <Text style={{ color: errorColor }}>{requiredIndicator}</Text>}
      </Text>
      
      {/* שדה הקלט עצמו */}
      <TextInput
        style={[
          textColor ? { color: textColor } : null,
          backgroundColor ? { backgroundColor } : null,
          borderColor && !isInErrorState ? { borderBottomColor: borderColor } : null,
          inputStyle
        ]}
        className={inputClasses}
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
        {...restProps}
      />
      
      {/* הודעת שגיאה (אם יש) */}
      {isInErrorState && (
        <Text
          style={errorStyle}
          className={errorClasses}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default AccessibleTextInput;