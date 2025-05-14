import AccsesibleText from '@/components/AccsesibleText';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MiddleSection from '@/components/MiddleSection';
import AccessibleTextInput from '@/components/accessibleInput';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import MiddleSectionOTP from '@/components/MiddleSectionOTP';




const authScreen = ({ name = 'בוריס' }) => {
  const [screenType, setScreenType] = useState<'welcome' | 'otp'>('welcome'); //welcome, otp
  const [method, setMethod] = useState<string>('');

  interface RenderWelcomeHeaderProps {
    text: string;
  }



  //render otp heder with AccsesibleText
  const renderOtpHeader = (text: RenderWelcomeHeaderProps['text']): React.ReactElement => {
    return (
      <View className="mt-1 self-center items-center">
        {/* שדה הזנת קוד */}
        <View className="flex-row justify-between mb-8">
          <AccessibleTextInput
            label={`הזן קוד אימות`}
            required={true}
            errorMessage={`קוד לא תקין`}
            hasError={false}
          />
        </View>

        {/* הודעת שגיאה אופציונלית */}
        <Text className="text-red-500 mb-4 hidden">קוד לא תקין</Text>

        {/* קישור לשליחה חוזרת */}
        <Text className="text-accent-DEFAULT underline text-center mb-4">
          שלחו לי את הקוד בשנית
        </Text>
      </View>
    );
  };

  const renderWelcomeHeader = (text: RenderWelcomeHeaderProps['text']): React.ReactElement => {
    return (
      <View className="mt-1 self-center items-center">
        <AccsesibleText
          text={text}
          type='header' //link , text ,header ,error
          size='large' //small, medium, large         
          fontWeight='bold' //normal, bold, italic
          accessibilityHint={text}
          disabled={false} // true, false 
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-DEFAULT">


      <Header screenType={screenType} name={name} />
      {/* אם Welcom אז MiddleSection אחרת MiddleSectionOTP */}
      {screenType === 'welcome' ? (
        <MiddleSection
          screenType={screenType}
          setScreenType={setScreenType}
          method={method}
        />
      ) : (
        <MiddleSectionOTP />
      )}

    </SafeAreaView>
  );
};

export default authScreen;
