import React from 'react';
import { View } from 'react-native';
import AccsesibleText from './AccsesibleText';

type HeaderProps = {
  screenType: 'welcome' | 'otp';
  name: string;
};

  interface RenderWelcomeHeaderProps {
    text: string;
    size: undefined | 'extaSmall' |'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  }

 const renderHeader = (text: RenderWelcomeHeaderProps['text'],size:RenderWelcomeHeaderProps['size']=undefined): React.ReactElement => {
    return (
      <View className="mt-1 self-center items-center">
        <AccsesibleText
          text={text}
          type='header' //link , text ,header ,error
          size={size} //extaSmall, small, medium, large         
          fontWeight='normal' //normal, bold, italic
          accessibilityHint={text}
          disabled={false} // true, false 
        />
      </View>
    );
  };

const Header: React.FC<HeaderProps> = ({ screenType, name }) => {
  return (
    <>
          <View className="mt-9 self-center items-center">
            {screenType === 'welcome' && renderHeader(`היי ${name},`,'large')}
            {screenType === 'welcome' && renderHeader(`כיף שחזרת אלינו!`,'large')}
          </View>
            {screenType === 'otp' && (
              <>
                {renderHeader(`הזינו את הקוד `,'large')}
                <View className="mt-3 self-center items-center">


                {renderHeader(`שלחנו לך קוד אימות בן 6 ספרות`,'extaSmall')}
                {renderHeader(`למספר הטלפון שלך`,'extaSmall')}
                </View>
                
              </>
            )}
          </>
  )
}

export default Header