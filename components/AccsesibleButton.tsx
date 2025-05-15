import React from 'react';
import { Pressable, PressableProps, Text, TextStyle, View, ViewStyle } from 'react-native';

// הטיפוסים של הפרופס של הכפתור
export interface AccessibleButtonProps extends PressableProps {
  // הטקסט של הכפתור
  label?: string;
  
  // אייקון שיוצג במקום או לצד הטקסט
  icon?: React.ReactNode;
  
  // סוג הכפתור
  variant: 'background' | 'transparent' | 'active';
  
  // האם הכפתור מושבת
  disabled?: boolean;
  
  // סטיילים נוספים שניתן להעביר
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  
  // פונקציה שמופעלת בלחיצה
  onPress: () => void;
  
  // מזהה נגישות
  accessibilityLabel?: string;
  
  // תיאור נגישות
  accessibilityHint?: string;

  // צבעים מותאמים אישית
  backgroundColor?: string;
  textColor?: string;
  activeColor?: string;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  icon,
  variant = 'background',
  disabled = false,
  containerStyle,
  textStyle,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  backgroundColor,
  textColor,
  activeColor,
  ...restProps
}) => {
  // בחירת סטיילים בהתאם לווריאנט
  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case 'background':
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || '#1E285B', // כחול ברירת מחדל
          borderRadius: 6,
        };
      case 'transparent':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'active':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor: activeColor || '#3B82F6',
        };
      default:
        return baseStyle;
    }
  };

  // בחירת סטיילים לטקסט בהתאם לווריאנט
  const getTextStyle = () => {
    const baseTextStyle: TextStyle = {
      fontWeight: '500',
      textAlign: 'center',
    };

    switch (variant) {
      case 'background':
        return {
          ...baseTextStyle,
          color: textColor || '#FFFFFF',
        };
      case 'transparent':
      case 'active':
        return {
          ...baseTextStyle,
          color: textColor || '#3B82F6',
        };
      default:
        return baseTextStyle;
    }
  };

  return (
    <View >
      <Pressable
      style={[getContainerStyle(), containerStyle]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      {...restProps}
    >
      {icon ? (
        icon
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
    </View>
  );
};

export default AccessibleButton;