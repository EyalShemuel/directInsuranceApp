import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AccessibleButton from './AccsesibleButton'
import AccsesibleText from './AccsesibleText'


type FooterProps = {
  onPress: () => void;
};

const Footer = ({ onPress }: FooterProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [disableTheConfirme, setdisableTheConfirme] = useState(true)
  const [mainButtonName, setMainButtonName] = useState('שילחו לי את הקוד ב-')
  const [selectedMethod, setSelectedMethod] = useState('sms') // שיטת שליחה נוכחית
  type VariantType = 'background' | 'active' | 'transparent'
  const [variantMethodtype, setVariantMethodtype] = useState<VariantType>('background') // סוג הכפתור הנוכחי
  /* const handlePress = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  } */
  const handlePressForMethod = (method: string) => {
      // עדכון שיטת השליחה הנוכחית
      setSelectedMethod(method)
      // עדכון הטקסט של הכפתור הראשי
      setMainButtonName('שילחו לי את הקוד ב-' + method)
      // שינוי המצב של הכפתור לפעיל
      setVariantMethodtype('active')
    }
  

  useEffect(() => {
    // עדכון הטקסט של הכפתור הראשי
    handlePressForMethod(selectedMethod)
  }, [selectedMethod])

  useEffect(() => {
    if (isLoading) {
      setdisableTheConfirme(true)
    } else {
      setdisableTheConfirme(false)
    }
  }
    , [isLoading])

  // שיטות שליחה זמינות
  const sendingMethodText = ['Email', 'Whatsapp', 'SMS'];

  return (
    <View>
      <AccsesibleText text='שלח לי את הקוד ב-' className="text-center justify-center self-center items-center" />

      {/* אפשרויות השליחה */}
      <View className='flex-row justify-center items-center self-center'>
        {sendingMethodText.map((method, index) => (
          <View key={index} className='flex-row items-center'>
            <AccessibleButton
              label={method}
              variant={method === selectedMethod ? 'active' : 'transparent'}
              disabled={isLoading}
              onPress={() => handlePressForMethod(method)}
              accessibilityLabel={`בחר ${method}`}
              accessibilityHint={`שלח לי את הקוד ב-${method}`}
              textColor='#404156'
              activeColor={method === selectedMethod ? '#388E3C' : '#404156'}
              // אם הכפתור נבחר, הטקסט יודגש
              textStyle={{ fontWeight: method === selectedMethod ? 'bold' : 'normal' }}
              containerStyle={{ marginHorizontal: 5, padding: 10 }}
            />

            {/* מפריד בין האפשרויות - למעט האחרון */}
            {index < sendingMethodText.length - 1 && (
              <Text className='text-lg mx-3 text-text-secondary'> | </Text>
            )}
          </View>
        ))}
      </View>

      <View >
        <AccessibleButton
          label={mainButtonName}
          variant='background'
          disabled={disableTheConfirme}
          onPress={onPress}
          
          accessibilityLabel={mainButtonName}
          accessibilityHint={`שלח לי את הקוד ב-${selectedMethod}`}
          textColor='#FFFFFF'
          activeColor='#388E3C'
          containerStyle={{ marginTop: 20, marginBottom: 20, borderRadius: 25, width: 250, height: 40, justifyContent: 'center', alignSelf: 'center' }}

        />
      </View>
    </View>
  )
}

export default Footer;