import AccsesibleText from '@/components/AccsesibleText';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

const authScreen = ({name = 'בוריס'}) => {
  const [screenType, setScreenType] = useState('welcome'); //welcome, otp
  //render welcome heder with AccsesibleText
  /* 
text,
  type = 'normal', //link , text
  size = 'medium', //small, medium, large
  linkPath = null,
  fontWeight = 'normal', //normal, bold, italic
  accessibilityHint,
  disabled = false, // true, false 
  */
//  `היי ${name},\n כיף שחזרת אלינו! `
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

  return (
    <SafeAreaView className="flex-1 bg-background-DEFAULT">
      
    {
      /* כותרת ברוכה הבאה */
      // אם רוצים להציג את הכותרת של ברוך הבא, אפשר להוסיף כאן תנאי
      <>
      <View className="mt-9 self-center items-center">
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

        {/* שדה הזנת קוד */}
        <View className="flex-row justify-between mb-8">
          {/* כאן יהיו שדות הקלט */}
        </View>

        {/* הודעת שגיאה אופציונלית */}
        <Text className="text-red-500 mb-4 hidden">קוד לא תקין</Text>

        {/* קישור לשליחה חוזרת */}
        <Text className="text-accent-DEFAULT underline text-center mb-4">
          שלחו לי את הקוד בשנית
        </Text>
      </View>
       <View className='flex-1 items-center justify-center'>     
             <Image 
               source={require('@/assets/images/welcome.png')} 
               resizeMode="contain"
               className="h-64 w-64"
             /> 
        </View> 
      {/* פוטר */}
      <View className="px-6 pb-8">
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default authScreen;
