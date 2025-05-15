import Header from '@/components/Header';
import MiddleSection from '@/components/MiddleSection';
import MiddleSectionOTP from '@/components/MiddleSectionOTP';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

const authScreen = ({ name = 'בוריס' }) => {
  const [screenType, setScreenType] = useState<'welcome' | 'otp'>('welcome'); //welcome, otp

  return (
    <SafeAreaView className="flex-1 bg-background-DEFAULT w-11/12">
      <Header
        screenType={screenType}
        setScreenType={setScreenType}
        name={name}
      />
      {/* אם Welcom אז MiddleSection אחרת MiddleSectionOTP */}
      {screenType === 'welcome' ? (
        <MiddleSection screenType={screenType} setScreenType={setScreenType} />
      ) : (
        <MiddleSectionOTP />
      )}
    </SafeAreaView>
  );
};

export default authScreen;
