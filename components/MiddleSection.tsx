import Checkbox from 'expo-checkbox';
import React from 'react';
import { Image, View } from 'react-native';
import AccessibleTextInput from './accessibleInput';
import AccessibleButton from './AccsesibleButton';
import AccsesibleText from './AccsesibleText';

import Footer from './Footer';

interface MiddleSectionProps {
  screenType: 'welcome' | 'otp';
  setScreenType: React.Dispatch<React.SetStateAction<'welcome' | 'otp'>>;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({
  screenType,
  setScreenType,
}) => {
  const onSendCode = () => {
    // פונקציה לשליחת הקוד
    setScreenType('otp');
    console.log('Sending code...');
  };

  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/images/welcome.png')}
          alt="ברוך הבא"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <AccessibleTextInput
          label={`תעודת זהות/דרכון`}
          required={true}
          errorMessage={`מספר לא תקין`}
          hasError={false}
          className="w-1/2"
          labelClassName="text-text-secondary text-xxs mb-1.5 font-medium"
          inputClassName="text-text-secondary w-full border-b-2 border-text-secondary"
        />
      </View>

      <View className="flex-1 flex-row-reverse mb-4 items-center">
        <Checkbox className="ml-2 mt-1" onValueChange={() => {}} />
        <AccsesibleText
          text="אישרתי את"
          type="normal"
          size="small"
          fontWeight="normal"
          accessibilityHint="אני מאשר/ת קבלת מידע פרסומי ממועדון ישיר"
          disabled={false}
        />
        <AccessibleButton
          onPress={() => {
            console.log('תנאי שימוש');
          }}
          label="תנאי השימוש"
          variant="transparent"
          textColor="#7C4DFF"
          containerStyle={{ margin: 0, padding: 0 }}
        />
        <AccsesibleText
          text="ואת"
          type="normal"
          size="small"
          fontWeight="normal"
          accessibilityHint="אני מאשר/ת קבלת מידע פרסומי ממועדון ישיר"
          disabled={false}
        />
        <AccessibleButton
          onPress={() => {
            console.log('מדיניות פרטיות');
          }}
          label="מדיניות הפרטיות"
          variant="transparent"
          textColor="#7C4DFF"
          containerStyle={{ margin: 0, padding: 0 }}
        />
      </View>
      <Footer onPress={onSendCode} />
    </>
  );
};

export default MiddleSection;
