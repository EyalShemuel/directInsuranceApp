import React from 'react';
import { View } from 'react-native';
import AccessibleButton from './AccsesibleButton';
import AccsesibleText from './AccsesibleText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderProps = {
  screenType: 'welcome' | 'otp';
  setScreenType: React.Dispatch<React.SetStateAction<'welcome' | 'otp'>>;

  name: string;
};

  interface RenderWelcomeHeaderProps {
    text: string;
    size: undefined | 'extaSmall' |'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
    fontWeight?: 'normal' | 'bold' | 'italic';
  }

 const renderHeader = (text: RenderWelcomeHeaderProps['text'],size:RenderWelcomeHeaderProps['size']=undefined, fontWeight:RenderWelcomeHeaderProps['fontWeight']='normal'): React.ReactElement => {
    return (
      <View className="mt-1 self-center items-center">
        <AccsesibleText
          text={text}
          type='header' //link , text ,header ,error
          size={size} //extaSmall, small, medium, large         
          fontWeight={fontWeight} //normal, bold, italic
          accessibilityHint={text}
          disabled={false} // true, false 
        />
      </View>
    );
  };

const Header: React.FC<HeaderProps> = ({ screenType, name, setScreenType}) => {
  return (
    <>
          <View className="mt-9 self-center items-center">
            {screenType === 'welcome' && renderHeader(`היי ${name},`,'large', 'bold')}
            {screenType === 'welcome' && renderHeader(`כיף שחזרת אלינו!`,'large', 'bold')}
          </View>
            {screenType === 'otp' && (
              <>
              {/* אייקון חץ ימינה  - הוספת כפתור חץ חזרה למסך הקודם */}
               
              <View className="absolute top-0 right-0 p-1 mr-2">
                <AccessibleButton
                  icon={<MaterialCommunityIcons name="arrow-right" size={24} color="#000" />}
                  variant="transparent"
                  onPress={() => {setScreenType('welcome')}}
                  containerStyle={{ padding: 5 }}
                  accessibilityLabel="חזור למסך הקודם"
                  accessibilityHint="לחיצה על כפתור זה תחזיר אותך למסך הקודם"
                  accessibilityRole="button"
                />
              </View>
              
          
                {renderHeader(`הזינו את הקוד `,'large', 'bold')}
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