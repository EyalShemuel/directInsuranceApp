import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AccessibleTextInput } from './accessibleInput';
import AccessibleButton from './AccsesibleButton';
import AccsesibleText from './AccsesibleText';
import PopupMessage from './PopupMessage';

const MiddleSectionOTP = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessageText, setPopupMessageText] = useState('הקוד שהזנת שגוי');
  const [otpCode, setOtpCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [sentButtonDisabled, setSentButtonDisabled] = useState(true);
  

  // בדיקת אורך הקוד והפעלת הכפתור
  useEffect(() => {
    if (otpCode.length >= 6) {
      setSentButtonDisabled(false);
    } else {
      setSentButtonDisabled(true);
    }
  }, [otpCode]);


  useEffect(() => {
    if (isCodeSent && otpCode.length === 6) {
      // בדוק אם הקוד תקין
      if (otpCode === '123456') {
        console.log('Valid OTP code');
        setPopupMessageText('ברוך הבא');
        setIsCodeValid(true);
        setShowPopup(true);
      } else {
        console.log('Invalid OTP code');
        setPopupMessageText('הקוד שהזנת שגוי');
        setIsCodeValid(false);
        setShowPopup(true);
      }    
      setIsCodeSent(false);
    }
  }, [isCodeSent, otpCode]);

  const closePopup = () => {
    setShowPopup(false);
  };
  
  // שליחת קוד אימות מחדש
  const resendCode = () => {  
    console.log('Resending OTP code');
    setPopupMessageText('קוד אימות חדש נשלח בהצלחה');
    setShowPopup(true);
  };
  

  const handleSubmitCode = () => {
    if (!sentButtonDisabled) {
      console.log('Submitting OTP code');
      setIsCodeSent(true);
    }
  };
  
  return (
    <View className="flex-1 mt-10 self-center items-center">
      <View className="flex-1 justify-between mb-8 mt-7">
        <AccessibleTextInput
          label="קוד אימות"
          required={true}
          errorMessage="קוד לא תקין"          
          className="w-1/2"
          labelClassName="text-text-secondary text-xxs mb-1.5 font-medium"
          inputClassName="text-text-secondary w-full border-b-2 border-text-secondary"
          onChange={(e) => setOtpCode(e.nativeEvent.text)}
          value={otpCode}
          placeholder="הקלד קוד אימות"
          maxLength={6}
          keyboardType="numeric"
          onSubmitEditing={handleSubmitCode}
          returnKeyType="send"
          blurOnSubmit={false}
        />
        <AccsesibleText
          text="לא הגיע?"
          type="normal" //link , text ,header ,error
          className="text-center justify-center self-center items-center"
        />
        <AccessibleButton
          onPress={resendCode}
          label="שלח שוב את הקוד"
          variant="transparent"
          //הלחצן צריך להיות שקוף והטקסט בצבע סגול
          className="text-accent-DEFAULT text-center mb-4"
        />

        {!isCodeValid && isCodeSent && otpCode.length === 6 && (
          <AccsesibleText
            text="קוד שהזנת שגוי"
            type="error" //link , text ,header ,error
            className="text-error-DEFAULT mb-4"
          />
        )}
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>

        {/* לחצן שלח  */}
        <AccessibleButton         
          onPress={handleSubmitCode}
          label="שלח"
          variant="background"
          containerStyle={{
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 25,
            width: 250,
            height: 40,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          disabled={sentButtonDisabled} // לחצן כחול שאיננו פעיל עד להזנת הקוד
          accessibilityLabel="לחצן שלח קוד אימות"
          accessibilityHint="לחיצה על כפתור זה תבדוק את תקינות הקוד שהוזן"
          accessibilityRole="button"
          textColor="#FFFFFF"
          activeColor="#388E3C"
        />
      </View>      
      <PopupMessage
        text={popupMessageText}
        visible={showPopup}
        onConfirm={closePopup}
        onClose={closePopup}
      />
    </View>
  );
};


export default MiddleSectionOTP;
