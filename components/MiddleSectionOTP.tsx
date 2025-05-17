import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { AccessibleTextInput } from './accessibleInput';
import AccsesibleButton from './AccsesibleButton'; // תיקון שם הקובץ - שימוש בשם המקורי עם שגיאת הכתיב
import AccsesibleText from './AccsesibleText'; // תיקון שם הקובץ - שימוש בשם המקורי עם שגיאת הכתיב
import PopupMessage from './PopupMessage';

const MiddleSectionOTP = () => {
  // ניהול מצבים
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessageText, setPopupMessageText] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [sentButtonDisabled, setSentButtonDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  // רפרנס לשדה הקלט עבור פוקוס
  const inputRef = useRef<TextInput>(null);

  // טקסט שגיאה מאוחד
  const ERROR_MESSAGE = 'קוד האימות שהזנת שגוי';

  // בדיקת אורך הקוד והפעלת הכפתור
  useEffect(() => {
    if (otpCode.length >= 6) {
      setSentButtonDisabled(false);
    } else {
      setSentButtonDisabled(true);
      // איפוס מצב שגיאה כאשר המשתמש מתחיל להקליד מחדש
      if (isError) {
        setIsError(false);
      }
    }
  }, [otpCode, isError]);

  // בדיקת תקינות הקוד כאשר נשלח
  useEffect(() => {
    if (isCodeSent && otpCode.length === 6) {
      // בדוק אם הקוד תקין
      if (otpCode === '123456') {
        console.log('Valid OTP code');
        setPopupMessageText('ברוך הבא');
        setIsCodeValid(true);
        setIsError(false);
        setShowPopup(true);
      } else {
        console.log('Invalid OTP code');
        setPopupMessageText(ERROR_MESSAGE);
        setIsCodeValid(false);
        setIsError(true);
        setShowPopup(true);
      }
      setIsCodeSent(false);
    }
  }, [isCodeSent, otpCode]);

  // סגירת פופאפ
  const closePopup = () => {
    setShowPopup(false);
    // מיקוד בשדה הקלט אחרי סגירת פופאפ בקוד שגוי
    if (isError && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // שליחת קוד אימות מחדש
  const resendCode = () => {
    console.log('Resending OTP code');
    setPopupMessageText('קוד אימות חדש נשלח בהצלחה');
    setShowPopup(true);
    setOtpCode('');
    setIsError(false);

    // פוקוס אוטומטי בשדה הקלט אחרי שליחה מחדש
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // טיפול בשליחת הקוד
  const handleSubmitCode = () => {
    if (!sentButtonDisabled) {
      console.log('Submitting OTP code');
      setIsCodeSent(true);
    }
  };

  return (
    <View
      className="flex-1 mt-10 self-center items-center"
      accessible={true}
      accessibilityLabel="טופס הזנת קוד אימות חד-פעמי"
    >
      {/* כותרת המסך */}

      <View className="flex-1 justify-between mb-8 mt-4">
        <AccessibleTextInput
          label="הזנת קוד אימות"
          required={false}
          errorMessage={ERROR_MESSAGE}
          className="w-full px-2" // הוספת padding בצדדים
          labelClassName="text-text-secondary mt-6 mb-5 font-medium justify-center self-center items-center text-xl"
          inputClassName={`text-text-secondary w-full min-w-[200px] border-b-4 ${
            isError ? 'border-red-500' : 'border-text-secondary'
          }`}
          containerStyle={{ width: '100%', minWidth: 280 }} // הוספת רוחב מינימלי
          inputStyle={{ width: '100%', minWidth: 280 }} // הוספת רוחב מינימלי לשדה עצמו
          onChange={(e) => setOtpCode(e.nativeEvent.text)}
          value={otpCode}
          maxLength={6}
          keyboardType="numeric"
          onSubmitEditing={handleSubmitCode}
          returnKeyType="send"
          accessibilityLabel="שדה הזנת קוד אימות בן 6 ספרות"
          accessibilityHint="הזן את הקוד בן 6 הספרות שנשלח אליך"
          accessibilityState={{ disabled: false, selected: false }}
        />

        {/* מידע והנחיות למשתמש */}
        <View className="mt-6 mb-2">
          <AccsesibleText
            text="לא הגיע?"
            type="text"
            className="text-center justify-center self-center items-center"
            size="extraSmall"
            accessibilityLabel="האם לא קיבלת את קוד האימות?"
            isLiveRegion={false}
          />

          {/* כפתור לשליחה חוזרת */}
          <AccsesibleButton
            onPress={resendCode}
            label="שלח לי שוב את הקוד"
            variant="transparent"
            className="text-accent-DEFAULT text-center mt-1 mb-4"
            textColor="#7C4DFF"
            accessibilityLabel="שלח לי שוב את קוד האימות"
            accessibilityHint="לחיצה תשלח קוד אימות חדש לטלפון שלך"
          />
        </View>

        {/* הודעת שגיאה */}
        {isError && (
          <AccsesibleText
            text={ERROR_MESSAGE}
            type="error"
            className="text-error-DEFAULT mb-4 mt-2 text-center"
            accessibilityLabel={`שגיאה: ${ERROR_MESSAGE}`}
            accessibilityHint="נסה להזין שוב את הקוד או לבקש קוד חדש"
            isLiveRegion={true}
          />
        )}
      </View>

      {/* לחצן שלח */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <AccsesibleButton
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
          disabled={sentButtonDisabled}
          accessibilityLabel="לחצן שלח קוד אימות"
          accessibilityHint="לחיצה על כפתור זה תבדוק את תקינות הקוד שהוזן"
          accessibilityState={{ disabled: sentButtonDisabled }}
          textColor="#FFFFFF"
          activeColor="#388E3C"
        />
      </View>

      <PopupMessage
        header={isCodeValid ? 'הצלחה!' : 'שגיאה!'}
        text={popupMessageText}
        visible={showPopup}
        onConfirm={closePopup}
        onClose={closePopup}
      />
    </View>
  );
};

export default MiddleSectionOTP;
