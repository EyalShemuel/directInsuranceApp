import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';
import React from 'react';

import { View } from 'react-native';
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
      <View className="flex-1 items-center justify-center mt-9">
        <Image
          className="w-full h-full"
          source={require('@/assets/images/welcome.png')}          
          contentFit="contain"
          transition={1000}
        />
      </View>

      <View className="flex-row justify-between items-center">
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

      <View className="flex flex-row items-center justify-end w-full">
        <View className="flex flex-row items-center mb-7">
          <AccessibleButton
            onPress={() => {
              console.log('מדיניות פרטיות');
            }}
            label="מדיניות הפרטיות"
            variant="transparent"
            textColor="#7C4DFF"
            className="whitespace-nowrap flex-shrink-0"
            containerStyle={{
              margin: 0,
              padding: 0,
              
            }}
          />
          <AccsesibleText
            text="ואת"
            type="text"
            size="small"
            fontWeight="normal"
            accessibilityHint="אני מאשר/ת קבלת מידע פרסומי ממועדון ישיר"
            disabled={false}
             className='flex-shrink-0 ml-1 mr-1'
          />
          <AccessibleButton
            onPress={() => {
              console.log('תנאי שימוש');
            }}
            label="תנאי השימוש"
            variant="transparent"
            textColor="#7C4DFF"
            className="whitespace-nowrap flex-shrink-0"
            containerStyle={{
              margin: 0,
              padding: 0,
            }}
          />
          <AccsesibleText
            text="אישרתי את"
            type="text"
            size="small"
            fontWeight="normal"
            accessibilityHint="אני מאשר/ת קבלת מידע פרסומי ממועדון ישיר"
            disabled={false}
            className='flex-shrink-0 ml-1 mr-1'
          />
          <Checkbox className="ml-2" onValueChange={() => {}} />
        </View>
      </View>
      <Footer onPress={onSendCode} />
    </>
  );
};

export default MiddleSection;
