import AccessibleText from '@/components/AccsesibleText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { isRTL } from '../utils/rtl';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [rtlEnabled, setRtlEnabled] = useState(isRTL());
  
  // נעקוב אחרי שינויים במצב ה-RTL
  useEffect(() => {
    setRtlEnabled(isRTL());
  }, []);

  // נגדיר את המסכים - תיקנתי את שגיאות הכתיב
  const slides: OnboardingSlide[] = [
    {
      id: '1',
      title: 'פעולות בקליק',
      description:
        'הוספת נהג, פתיחת דיווח, עדכון פרטים ועוד מגוון פעולות ללא המתנה לנציג',
      icon: 'gesture-tap-button',
    },
    {
      id: '2',
      title: 'כל המידע במקום אחד',
      description: 'לדעת מה בדיוק הפוליסה שלך מכסה ולצפות בכל המידע החשוב באמת',
      icon: 'information-outline',
    },
    {
      id: '3',
      title: 'הטבות',
      description:
        'רק לקוחות ביטוח ישיר נהנים ממגוון הטבות ומבצעים במיוחד בשבילכם!',
      icon: 'gift-outline',
    },
    {
      id: '4',
      title: 'יותר ביטוח',
      description:
        'כל מה שאתם צריכים מחברת הביטוח שלכם ויותר! שירותים דיגיטליים, שירות עד בית הלקוח ועוד',
      icon: 'shield-check-outline',
    },
  ];

  // גלילה למסך הבא
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (flatListRef.current) {
        const slidesCount = slides.length;
        
        // טיפול שונה בגלילה בהתאם למצב RTL
        if (rtlEnabled) {
          // במצב RTL, אנחנו צריכים לגלול לכיוון ההפוך
          const rtlOffset = (slidesCount - 1 - nextIndex) * width;
          flatListRef.current.scrollToOffset({
            offset: rtlOffset,
            animated: true,
          });
        } else {
          // במצב LTR רגיל
          flatListRef.current.scrollToOffset({
            offset: nextIndex * width,
            animated: true,
          });
        }
      }
    } else {
      onComplete();
    }
  };

  // דילוג למסך הבית
  const handleSkip = () => {
    onComplete();
  };

  // עידכון אינדקס במהלך גלילה
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const slidesCount = slides.length;
    
    // חישוב אינדקס נכון בהתאם למצב RTL
    let index;
    if (rtlEnabled) {
      // במצב RTL, סדר השקופיות הפוך, לכן יש להפוך את חישוב האינדקס
      index = slidesCount - 1 - Math.round(contentOffsetX / width);
    } else {
      // במצב LTR רגיל
      index = Math.round(contentOffsetX / width);
    }
    
    // עדכון האינדקס אם הוא בטווח תקין
    if (index >= 0 && index < slidesCount) {
      setCurrentIndex(index);
    }
  };

  // רינדור של שקופית יחידה
  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View className="justify-center items-center px-8 mt-12 " style={{ width }}>
      <View className="rounded-full p-5 bg-blue-50">
        <MaterialCommunityIcons name={item.icon} size={120} color="#1E3A8A" />
      </View>
      <AccessibleText
        text={item.title}
        type="header"
        size="large"
        fontWeight="bold"
        accessibilityLabel={item.title}
        accessibilityHint={item.description}
        className="text-DEFAULT-500 text-3xl font-bold mt-8 mb-4 text-center"
      />
      <AccessibleText
        text={item.description}
        type="text"
        size="medium"
        fontWeight="normal"
        accessibilityLabel={item.description}
        accessibilityHint={item.description}
        className="text-gray-600 text-base text-center"
      />
    </View>
  );

  // רינדור של אינדיקטורים (נקודות)
  const renderDotIndicators = () => (
    <View className="flex-row justify-center my-8">
      {slides.map((_, index) => (
        <View
          key={index}
          className={`w-2 h-2 rounded-full mx-1 ${
            index === currentIndex ? 'bg-blue-900' : 'bg-gray-300'
          }`}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* FlatList לכל המסכים */}
        <FlatList
          ref={flatListRef}
          inverted={rtlEnabled}
          data={rtlEnabled ? [...slides].reverse() : slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          snapToInterval={width}
          snapToAlignment="center"
          decelerationRate="fast"
          removeClippedSubviews={false}
        />

        {/* אינדיקטורים (נקודות) */}
        {renderDotIndicators()}

        {/* כפתורים */}
        <View className="px-8 mb-12">
          {currentIndex === slides.length - 1 ? (
            <TouchableOpacity
              className="bg-primary py-4 rounded-lg items-center"
              onPress={onComplete}
              accessible={true}
              accessibilityLabel="התחל להשתמש באפליקציה"
              accessibilityRole="button"
            >
              <Text className="text-white text-base font-bold text-center">
                בואו נתחיל!
              </Text>
            </TouchableOpacity>
          ) : (
            <View className={`flex-row ${rtlEnabled ? 'flex-row-reverse' : ''}`}>
             
              {/* כפתור דילוג */}
              <TouchableOpacity
                className="bg-transparent py-4 flex-1 items-center"
                onPress={handleSkip}
                accessible={true}
                accessibilityLabel="דלג למסך הבית"
                accessibilityRole="button"
              >
                <Text className="text-gray-500 text-base font-medium">דלג</Text>
              </TouchableOpacity>

               <TouchableOpacity
                className="bg-primary py-4 rounded-3xl items-center flex-1"
                onPress={handleNext}
                accessible={true}
                accessibilityLabel="המשך למסך הבא"
                accessibilityRole="button"
              >
                <Text className="text-white text-base font-bold">המשך</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
