import AccsesibleText from '@/components/AccsesibleText';
import Footer from '@/components/Footer';
import AccessibleTextInput from '@/components/accessibleInput';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

const OtpScreen = ({name = 'בוריס'}) => {
  const [screenType, setScreenType] = useState('welcome'); //welcome, otp
 
  interface RenderWelcomeHeaderProps {
    text: string;
  }

  const renderHeader = (text: RenderWelcomeHeaderProps['text']): React.ReactElement => {
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
  };

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

  return (
    <SafeAreaView className="flex-1 bg-background-DEFAULT">
      
    {
      /* כותרת ברוכה הבאה */
      // אם רוצים להציג את הכותרת של ברוך הבא, אפשר להוסיף כאן תנאי
      <>
      <View className="mt-9 self-center items-center 2xl">
        {screenType === 'welcome' && renderHeader(`היי ${name},`)}
        {screenType === 'welcome' && renderHeader(`כיף שחזרת אלינו!`)}
      </View>
        {screenType === 'otp' && (
          <>
            {renderHeader(`הזינו את הקוד `)}
            {renderHeader(`שלחנו לך קוד אימות בן 6 ספרות`)}
          </>
        )}
      </>
    }
  
      <View>

       
      </View>
       <View className='flex-1 items-center justify-center'>     
             <Image 
               source={require('@/assets/images/welcome.png')} 
               resizeMode="contain"
               className="h-64 w-64"
             /> 
        </View> 

        {/* שדה הזנת טלפון */}
        <View className="flex-row justify-between mb-8">
          <AccessibleTextInput
            label={`תעודת זהות/דרכון`}
            required={true}
            errorMessage={`מספר לא תקין`}
            hasError={false}
            className='w-1/2'
            labelClassName='text-text-secondary text-xxs mb-1.5 font-medium'
            inputClassName='text-text-secondary w-full border-b-2 border-text-secondary'

          />
        </View>

      {/* פוטר */}
      <View className="px-6 pb-8">
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
