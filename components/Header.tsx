import { View, Text } from 'react-native'
import React from 'react'
import AccsesibleText from './AccsesibleText'

type HeaderProps = {
  screenType: 'welcome' | 'otp';
  name: string;
};

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

const Header: React.FC<HeaderProps> = ({ screenType, name }) => {
  return (
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
  )
}

export default Header