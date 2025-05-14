import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface PopupMessageProps {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
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
          <TouchableOpacity 
            className="absolute right-4 top-4" 
            onPress={onClose}
          >
            <Text className="text-2xl font-bold">×</Text>
          </TouchableOpacity>
          
          {/* אייקון התראה */}
          <View className="w-14 h-14 rounded-full border-2 border-indigo-900 items-center justify-center my-6">
            <Text className="text-indigo-900 text-3xl font-bold">!</Text>
          </View>
          
          {/* כותרת */}
          <Text className="text-indigo-900 text-2xl font-bold mb-10">
            הקוד נשלח שוב
          </Text>
          
          {/* כפתור אישור */}
          <TouchableOpacity
            className="w-full bg-indigo-900 py-4 rounded-full mb-2"
            onPress={onConfirm}
          >
            <Text className="text-white text-center font-bold text-lg">
              אישור
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupMessage;