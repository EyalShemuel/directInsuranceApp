import { View, Text } from 'react-native'
import AccessibleTextInput from './accessibleInput'
import { Image } from 'expo-image'
import React from 'react'
import Footer from './Footer'

interface MiddleSectionProps {
    screenType: 'welcome' | 'otp';
    setScreenType: React.Dispatch<React.SetStateAction<'welcome' | 'otp'>>;
    method: string | undefined;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({ screenType, setScreenType, method }) => {

    const onSendCode = () => {
      // פונקציה לשליחת הקוד
      setScreenType('otp');
      console.log('Sending code...');
    }

    return (
         <>
         <View className='flex-1 items-center justify-center'>
                         <Image
                             source={require('@/assets/images/welcome.png')}
                             alt='ברוך הבא'
                             contentFit="contain"               
                             className="h-64 w-64"
                         /> 
                </View> 

             
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

                <Footer onPress={onSendCode} />

         </>
    )
}

export default MiddleSection