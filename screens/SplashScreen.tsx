import AccessibleText from '@/components/AccsesibleText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);


  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  return (
   <View className="flex-1 w-full bg-blue-900 justify-center items-center">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center justify-center"
      >
        {/* עטיפה חיצונית לאייקון עם מיקום מדויק */}
        <View className="w-20 h-20 bg-white rounded-full mb-4  items-center justify-center ">
          
            <MaterialCommunityIcons
              name="wallet-outline"
              size={36}
              color="#1E3A8A"
              style={{ textAlign: 'center' }}
            />
       
        </View>

        <View className="flex items-center justify-center">


        <AccessibleText
          text="ביטוח ישיר"
          type="header"          
          fontWeight="bold"
          accessibilityLabel="ביטוח ישיר"
          accessibilityHint="הכל במקום אחד"
          className="text-white text-3xl font-bold mb-2 text-center text-justify-center"
        />
        <AccessibleText
          text="הכל במקום אחד"
          type="text"
         
          fontWeight="normal"
          accessibilityLabel="הכל במקום אחד"
          accessibilityHint="הכל במקום אחד"
          className="text-white text-base text-center"
        />
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
