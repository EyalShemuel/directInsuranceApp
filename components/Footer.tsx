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
       
      />
    </View>
  </View>
)
}

export default Footer