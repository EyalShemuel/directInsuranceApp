import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = 'he';
  }
}, []);
  
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
    <View className="flex-1 bg-blue-500 justify-center items-center">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
        className="items-center"
      >
        <View className="w-20 h-20 bg-white rounded-full mb-4 items-center justify-center">
          <MaterialCommunityIcons name="wallet-outline" size={36} color="#2196F3" />
        </View>
        <Text className="text-white text-3xl font-bold  items-center justify-center">ביטוח ישיר</Text>
        <Text className="text-white text-base items-center justify-center">הכל במקום אחד</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
