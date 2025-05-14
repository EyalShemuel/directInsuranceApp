import { View, Text } from 'react-native'
import React from 'react'
import AccsesibleText from './AccsesibleText'
import { AccessibleTextInput } from './accessibleInput'
import AccessibleButton from './AccsesibleButton'

const MiddleSectionOTP = () => {
    return (
        <View  className="flex-1 mt-10 self-center items-center">
            <View className='flex-1 justify-between mb-8 mt-7'>
                <AccessibleTextInput
                    label={`קוד אימות`}
                    required={true}
                    errorMessage={`קוד לא תקין`}
                    hasError={false}
                    className='w-1/2'
                        labelClassName='text-text-secondary text-xxs mb-1.5 font-medium'
                        inputClassName='text-text-secondary w-full border-b-2 border-text-secondary'
                />
                <AccsesibleText
                    text='לא הגיע?'
                    type='normal' //link , text ,header ,error
                    className="text-center justify-center self-center items-center"
                />
                <AccessibleButton
                    onPress={() => console.log('Sending code...')}
                    label="שלח קוד"
                    variant="transparent"
                    //הלחצן צריך להיות שקוף והטקסט בצבע סגול
                    className="text-accent-DEFAULT text-center mb-4"
                />

                <AccsesibleText
                    text='קוד שהזמת שגוי'
                    type='error' //link , text ,header ,error
                    className="text-error-DEFAULT mb-4 hidden"
                />
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <AccessibleButton
                    // לחצן כחול שאיננו פעיל עד להזנת הקוד
                    onPress={() => console.log('Sending code...')}
                    label="שלח"
                    variant="background"
                    containerStyle={{ marginTop: 20, marginBottom: 20, borderRadius: 25, width: 250, height: 40, justifyContent: 'center', alignSelf: 'center' }}
                    disabled={true} // לחצן כחול שאיננו פעיל עד להזנת הקוד
                    accessibilityLabel={'לחצן שלח קוד אימות'}
                    accessibilityHint={'לחצן שלח קוד אימות'}
                    accessibilityRole="button"
                    textColor='#FFFFFF'
                    activeColor='#388E3C'
                />
            </View>
        </View>
    )
}

export default MiddleSectionOTP