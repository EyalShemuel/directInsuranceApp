import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, I18nManager, Pressable, Text, View } from 'react-native';

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
  const [screenReader, setScreenReader] = useState(false);
  
  // בדיקת מצב קורא מסך
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReader);
  }, []);

  // טיפול בהחלפת מצב
  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onCheckedChange?.(newValue);
    
    // הכרזה לקורא מסך
    if (screenReader) {
      AccessibilityInfo.announceForAccessibility(newValue ? 'מסומן' : 'לא מסומן');
    }
  };
  
  // רינדור קטעי טקסט וקישורים
  const renderLabel = () => label.map((segment, i) => {
    if (segment.type === 'link') {
      return (
        <Text
          key={i}
          onPress={(e) => {
            e.stopPropagation?.();
            if (segment.url) {
              require('react-native').Linking.openURL(segment.url);
            }
          }}
          accessibilityRole="link"
          style={{ 
            textDecorationLine: 'underline', 
            color: 'blue',
            marginHorizontal: 2 
          }}
        >
          {segment.text}
        </Text>
      );
    }
    return <Text key={i}>{segment.text}</Text>;
  });

  // בניית תווית נגישות
  const a11yLabel = accessibilityLabel || 
    `${label.map(l => l.text).join(' ')}. ${checked ? 'מסומן' : 'לא מסומן'}` +
    `${required ? ' שדה חובה' : ''}${error ? ` שגיאה: ${error}` : ''}`;

  return (
    <View testID={testID} style={{ marginBottom: 16 }}>
      <Pressable
        onPress={handleToggle}
        style={[
          { 
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            alignItems: 'flex-start'
          },
          focused && { 
            outlineWidth: 2,
            outlineColor: '#0066cc',
            outlineStyle: 'solid',
            outlineOffset: 2
          }
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={a11yLabel}
        accessibilityHint={accessibilityHint}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {/* אינדיקטור הצ'קבוקס - סגנון מובלט יותר */}
        <View
          style={{
            width: 24,
            height: 24,
            marginRight: I18nManager.isRTL ? 0 : 8, 
            marginLeft: I18nManager.isRTL ? 8 : 0,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: checked ? '#0066cc' : '#777777',
            backgroundColor: checked ? '#0066cc' : 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {checked && (
            <Text style={{ 
              color: 'white', 
              fontSize: 16,
              fontWeight: 'bold',
              lineHeight: 22, // עזרה ליישור טוב יותר
              textAlign: 'center' 
            }}>
              ✓
            </Text>
          )}
        </View>
        
        {/* תווית */}
        <View 
          style={{
            flex: 1,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            flexWrap: 'wrap'
          }}
        >
          {renderLabel()}
        </View>
      </Pressable>
      
      {/* הודעת שגיאה */}
      {error && (
        <Text 
          style={{
            fontSize: 14,
            color: '#d32f2f',
            marginTop: 4,
            marginLeft: I18nManager.isRTL ? 0 : 32,
            marginRight: I18nManager.isRTL ? 32 : 0,
            textAlign: I18nManager.isRTL ? 'right' : 'left'
          }}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
      
      {/* תיאור */}
      {description && (
        <Text style={{
          fontSize: 14,
          color: '#666666',
          marginTop: 4,
          marginLeft: I18nManager.isRTL ? 0 : 32,
          marginRight: I18nManager.isRTL ? 32 : 0,
          textAlign: I18nManager.isRTL ? 'right' : 'left'
        }}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default AccessibleCheckbox;