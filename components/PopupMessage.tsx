import React from 'react';
import { Modal, Text, View } from 'react-native';
import AccessibleButton from './AccsesibleButton';
import AccessibleText from './AccsesibleText';

interface PopupMessageProps {
  header: string;
  text: string;
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  header,
  text,
  visible,
  onConfirm,
  onClose
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[90%] bg-white rounded-xl p-6 items-center">
          {/* כפתור סגירה */}
          <AccessibleButton 
            variant="transparent"
            onPress={onClose}
            accessibilityLabel="סגור חלונית"
            accessibilityHint="לחץ כדי לסגור את החלונית"
            containerStyle={{ position: 'absolute', right: 16, top: 16 }}
          >
            <Text className="text-2xl font-bold">×</Text>
          </AccessibleButton>
          
          {/* אייקון התראה */}
          <View className="w-14 h-14 rounded-full border-2 border-indigo-900 items-center justify-center my-6">
            <AccessibleText 
              text="!" 
              accessibilityLabel="סימן התראה"
              size="large"
              fontWeight="bold"
            />
          </View>
          
          {/* כותרת */}
          <AccessibleText 
            text={header}
            accessibilityLabel={header}
            type="header"
            size="large"
            fontWeight="bold"
          />
          
          {/* טקסט נוסף */}
          <AccessibleText
            text={text}
            accessibilityLabel={text}
            type="text"           
            fontWeight="normal"
            className="text-center mt-2 mb-4 text-lg"
          />
          
          {/* כפתור אישור */}
          <AccessibleButton
            variant="background"
            label="אישור"
            onPress={onConfirm}
            accessibilityLabel="אישור"
            accessibilityHint="לחץ לאישור ההודעה"
            backgroundColor="#312e81" // indigo-900
            containerStyle={{ width: '100%', marginTop: 40, marginBottom: 10, borderRadius: 24, padding: 14 }}
            textStyle={{ fontWeight: 'bold', fontSize: 18 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PopupMessage;