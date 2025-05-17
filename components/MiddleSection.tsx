import React, { useEffect, useState } from 'react';
import { Image as RNImage, Text, View } from 'react-native';
import AccessibleCheckbox from './AccessibleCheckbox';
import AccessibleTextInput from './accessibleInput';
import AccessibleButton from './AccsesibleButton';
import AccsesibleText from './AccsesibleText';
import PopupMessage from './PopupMessage';

interface MiddleSectionProps {
  setScreenType: React.Dispatch<React.SetStateAction<'welcome' | 'otp'>>;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({ setScreenType }) => {
  const [disableTheConfirme, setdisableTheConfirme] = useState(true);
  const [mainButtonName, setMainButtonName] = useState('שילחו לי את הקוד ב-');
  const [selectedMethod, setSelectedMethod] = useState('sms'); // שיטת שליחה נוכחית
  const [showPopup, setShowPopup] = useState(false);
  const [idNumber, setIdNumber] = useState(''); // מספר תעודת זהות

  const [isChecked, setIsChecked] = useState(false); // מצב הצ'קבוקס
  const [hasIdError, setHasIdError] = useState(false); // האם יש שגיאה בתעודת הזהות

  const sendingMethodText = ['Email', 'Whatsapp', 'SMS'];

  const theCorectIdNumber = '123456789'; // מספר תעודת זהות תקין
  const ERROR_MESSAGE = 'מספר תעודת זהות לא תקין - מספר תקין הוא 123456789';

  const closePopup = () => {
    setShowPopup(false);
  };

  // פונקציה לבחירת שיטת שליחה SMS, Email, Whatsapp
  const handlePressForMethod = (method: string) => {
    setSelectedMethod(method);
    setMainButtonName('שילחו לי את הקוד ב-' + method);
    // setVariantMethodtype('active');
  };

  // בדיקת תקינות תעודת זהות
  const validateId = (id: string) => {
    setIdNumber(id);
    setHasIdError(id !== '' && id !== theCorectIdNumber);
  };

  useEffect(() => {
    // הפעלת כפתור שלח לי את הקוד אם הוזן מספר תעודת זהות תקין והצ'קבוקס מסומן
    if (idNumber.length >= 9 && isChecked) {
      setdisableTheConfirme(false);
    } else {
      setdisableTheConfirme(true);
    }
  }, [idNumber, hasIdError, isChecked]);

  useEffect(() => {
    // עדכון הטקסט של הכפתור הראשי
    handlePressForMethod(selectedMethod);
  }, [selectedMethod]);

  const onSendCode = () => {
    // פונקציה לשליחת הקוד
    if (hasIdError) {
      // הצגת פופאפ שגיאה אם יש בעיה בתעודת הזהות
      setShowPopup(true);
      return;
    }
    setScreenType('otp');
    console.log('Sending code...');
  };

  return (
    <>
      <View className="flex-1 items-center justify-center mt-1">
       
        <RNImage
          style={{ width: '100%', height: 256, resizeMode: 'contain' }}
          source={require('../assets/images/welcome.png')}
          accessibilityLabel="תמונה של אישה מחייכת"
        />
        
       
      </View>

      <View className="w-full items-center">
        <AccessibleTextInput
          label={`תעודת זהות/דרכון`}
          required={true}
          onChange={(e) => validateId(e.nativeEvent.text)}
          errorMessage={ERROR_MESSAGE}
          hasError={hasIdError}
          className="w-full  "
          labelClassName="text-text-secondary mb-3 font-medium text-right"
          inputClassName="text-text-secondary w-full border-b-2 border-text-secondary"
        />
      </View>

      <AccessibleCheckbox
        label={[
          { type: 'text', text: 'אישרתי את ' },
          {
            type: 'link',
            text: 'תנאי השימוש',
            url: 'https://example.com/terms',
          },
          { type: 'text', text: ' ואת ' },
          {
            type: 'link',
            text: 'מדיניות הפרטיות',
            url: 'https://example.com/privacy',
          },
        ]}
        initialChecked={isChecked}
        onCheckedChange={setIsChecked}
        accessibilityLabel="אישור תנאי השימוש ומדיניות הפרטיות"
        required={true}
      />
      <View className="items-center justify-center mt-4">
        {/* אפשרויות השליחה */}
        <AccsesibleText
          text="שלח לי את הקוד ב-"
          className="text-center justify-center self-center items-center"
        />

        <View className="flex-row justify-center items-center self-center">
          {sendingMethodText.map((method, index) => (
            <View key={index} className="flex-row items-center">
              <AccessibleButton
                label={method}
                variant={method === selectedMethod ? 'active' : 'transparent'}
                onPress={() => handlePressForMethod(method)}
                accessibilityLabel={`בחר ${method}`}
                accessibilityHint={`שלח לי את הקוד ב-${method}`}
                textColor="#404156"
                activeColor={method === selectedMethod ? '#388E3C' : '#404156'}
                // אם הכפתור נבחר, הטקסט יודגש
                textStyle={{
                  fontWeight: method === selectedMethod ? 'bold' : 'normal',
                }}
                containerStyle={{ marginHorizontal: 5, padding: 10 }}
              />

              {/* מפריד בין האפשרויות - למעט האחרון */}
              {index < sendingMethodText.length - 1 && (
                <Text className="text-lg mx-3 text-text-secondary"> | </Text>
              )}
            </View>
          ))}
        </View>

        <View>
          <AccessibleButton
            label={mainButtonName}
            variant="background"
            disabled={disableTheConfirme}
            onPress={onSendCode}
            accessibilityLabel={mainButtonName}
            accessibilityHint={`שלח לי את הקוד ב-${selectedMethod}`}
            textColor="#FFFFFF"
            activeColor="#388E3C"
            className='text-center'
            containerStyle={{
              marginTop: 40,
              marginBottom: 20,
              borderRadius: 25,
              width: 250,
              height: 50,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </View>

        <PopupMessage
          header={'שגיאה!'}
          text={
            'לא הצלחנו לאמת את פרטי הכניסה\n שלך. נשמח לדבר ב WhatsApp\n ולעזור לך במהירות.'
          }
          visible={showPopup}
          onConfirm={closePopup}
          onClose={closePopup}
        />
      </View>
    </>
  );
};

export default MiddleSection;
