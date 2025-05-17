import React, { useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import AccsesibleText from './AccsesibleText';

// טיפוסים
type LinkSegment = { type: 'link'; text: string; url: string };
type TextSegment = { type: 'text'; text: string };
type TextSegments = Array<TextSegment | LinkSegment>;

interface AccessibleCheckboxProps {
  label: TextSegments;
  initialChecked?: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  description?: string;
  error?: string;
  required?: boolean;
  testID?: string;
  name?: string;
}

const AccessibleCheckbox = ({
  label,
  initialChecked = false,
  onCheckedChange,
  accessibilityLabel,
  accessibilityHint,
  description,
  error,
  required = false,
  testID,
  name
}: AccessibleCheckboxProps) => {
  // מצב בסיסי
  const [checked, setChecked] = useState(initialChecked);
  const [focused, setFocused] = useState(false);
  
  // האם בסביבת RTL
  const [isRtl, setIsRtl] = useState(false);
  
  useEffect(() => {
    // בדיקה אם הסביבה היא RTL
    if (Platform.OS === 'web') {
      setIsRtl(document.documentElement.dir === 'rtl');
    } else {
      // בסביבת מובייל, נשתמש בערך דיפולטיבי לפי שפת המכשיר או ערך קבוע
      setIsRtl(false); // בפועל כדאי לבדוק את כיוון השפה במובייל דרך האפליקציה
    }
  }, []);
  
  // עדכון ה-state כאשר ערך ה-initialChecked משתנה
  useEffect(() => {
    if (initialChecked !== checked) {
      setChecked(initialChecked);
    }
  }, [initialChecked, checked]);
  
  // טיפול בהחלפת מצב
  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onCheckedChange) {
      onCheckedChange(newValue);
    }
  };
  
  // רינדור קטעי טקסט וקישורים
  const renderLabel = () => label.map((segment, i) => {
    if (segment.type === 'link') {
      return (
        <AccsesibleText
          key={i}
          text={segment.text}
          type="link"
          linkPath={segment.url}
          accessibilityRole="link"
          accessibilityHint={`פתיחת קישור ל: ${segment.url}`}
          className="mx-1 text-xs text-accent"
        />
      );
    }
    return <AccsesibleText key={i} text={segment.text} type="text" className='text-xs' />;
  });
  
  return (
    <View testID={testID} className="mb-4">
      <View className="relative">
        <Pressable
          onPress={handleToggle}
          accessibilityState={{ checked }}
          accessibilityLabel={accessibilityLabel || label.map(l => l.text).join(' ')}
          accessibilityHint={accessibilityHint}
          accessibilityRole="checkbox"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`flex ${isRtl ? 'flex-row' : 'flex-row-reverse'} items-start`}
        >
          {/* אינדיקטור הצ'קבוקס */}
          <View
            className={`w-6 h-6 ${isRtl ? 'ml-2' : 'mr-2'} rounded border-2 ${
              checked 
                ? 'bg-blue-600 border-blue-600' 
                : error 
                ? 'bg-white text-error' 
                : 'bg-white border-gray-500'
            } items-center justify-center flex-shrink-0`}
          >
            {checked && (
              <AccsesibleText
                text="✓"
                fontWeight="bold"
                size="medium"
                className="text-white"
                accessibilityLabel="סימן וי המציין שהתיבה מסומנת"
              />
            )}
          </View>
          
          {/* תווית */}
          <View 
            className={`flex ${isRtl ? 'flex-row' : 'flex-row-reverse'} flex-wrap ml-2 mr-2`}
          >
            {renderLabel()}
            {required && (
              <AccsesibleText
                text="*"
                className="text-red-600 mx-1"
                accessibilityLabel="סימון כוכבית המציין שדה חובה"
              />
            )}
          </View>
        </Pressable>
      </View>
      
      {/* הודעת שגיאה */}
      {error && (
        <View 
          className={`mt-1 ${isRtl ? 'mr-8 items-end' : 'ml-8 items-start'}`}
        >
          <AccsesibleText
            text={error}
            type="error"
            size="small"
            accessibilityRole="alert"
            isLiveRegion={true}
          />
        </View>
      )}
      
      {/* תיאור */}
      {description && (
        <View 
          className={`mt-1 ${isRtl ? 'mr-8 items-end' : 'ml-8 items-start'}`}
        >
          <AccsesibleText
            text={description}
            size="small"
            type="text"
            className="text-gray-500"
          />
        </View>
      )}
    </View>
  );
};

export default AccessibleCheckbox;