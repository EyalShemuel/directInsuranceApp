import React from 'react';
import { PressableProps, Text, View } from 'react-native';
// הגדרת הטיפוסים לפרופס של הטקסט
export interface AccessibleTextProps extends PressableProps {
  // הטקסט שיוצג
  text: string;
  // סוג הטקסט: לינק, שגיאה, כותרת או רגיל
  type?: 'link' | 'error' | 'header' | 'normal';
  //נתיב הקישור (אופציונלי)
  linkPath?: string | null;
  // גודל הטקסט: קטן, בינוני, גדול או ענק
  size?: 'extaSmall'|'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  // הסטייל של הטקסט: רגיל, מודגש או נטוי
  fontWeight?: 'normal' | 'bold' | 'italic';
  // האם הטקסט מושבת
  disabled?: boolean;

  // הודעת נגישות נוספת לקוראי מסך
  accessibilityHint?: string;
}
const AccsesibleText: React.FC<AccessibleTextProps> = ({
  text,
  type = 'normal', //link , text ,header ,error
  size = 'medium', //extaSmall ,small, medium, large, xlarge, xxlarge
  linkPath = null,
  fontWeight = 'normal', //normal, bold, italic
  accessibilityHint,
  disabled = false, // true, false 
  ...rest
}: AccessibleTextProps) => {
  
  // פונקציה להחזרת קלאס הטקסט בהתאם לגודל
  const getTextSizeClass = () => {
    switch (size) {
      case 'extaSmall':
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

  return (
    <View className={rest.className} >
      <Text
        accessibilityRole={type === 'link' ? 'link' : type === 'error' ? 'alert' : type === 'header' ? 'header' : 'text'}
        accessibilityHint={accessibilityHint}
        accessibilityState={type === 'error' ? { disabled: true } : {}}
        className={
          `
    ${getTextSizeClass()}
    ${
      fontWeight === 'normal'
        ? 'font-normal'
        : fontWeight === 'bold'
        ? 'font-bold'
        : 'font-italic'
    }
    ${
      type === 'link'
        ? 'text-accent-DEFAULT underline'
        : type === 'error'
        ? 'text-red-500'
        : type === 'normal'
        ? 'text-primary-DEFAULT'
        : 'text-text-DEFAULT'
    }
    ${disabled ? 'opacity-50' : ''}
   
  ` || ''
        }
      >
        {text}
      </Text>
    </View>
  );
};

export default AccsesibleText;
