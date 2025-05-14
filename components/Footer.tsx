import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AccessibleButton from './AccsesibleButton'
import AccsesibleText from './AccsesibleText'


const Footer = () => {
const [isLoading, setIsLoading] = useState(false)
const [disableTheConfirme, setdisableTheConfirme] = useState(false)
const [accessibilityHint, setAccessibilityHint] = useState('שילחו לי את הקוד ב-')

const handlePress = () => {
  setIsLoading(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 2000)
}
const handlePressForMethod = (method:string) => {
   setAccessibilityHint('שילחו לי את הקוד ב-' + method)
   // עדכון הטקסט של הכפתור הראשי
}

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
    <View className='flex-row justify-center items-center mb-4 px-2'>
      {sendingMethodText.map((method, index) => (
        <View key={index} className='flex-row items-center'>
          <AccessibleButton 
            title={method}
            variant="text"
            accessibilityHint={accessibilityHint}
            disabled={disableTheConfirme}
            className={method === 'SMS' ? 'p-0 min-h-0' : 'p-0 min-h-0'}
            textClassName={method === 'SMS' ? 'font-bold text-primary-DEFAULT' : ''}
            onPress={() => handlePressForMethod(method)}
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
        title="SMS-שלחו לי את הקוד ב"
        variant="text"
        accessibilityHint="לחץ כדי לשלוח את הקוד"
        className='font-bold'
        textClassName='text-primary-DEFAULT '
        onPress={() => {}} // יש להוסיף פונקציית onPress מתאימה
      />
    </View>
  </View>
)
}

export default Footer