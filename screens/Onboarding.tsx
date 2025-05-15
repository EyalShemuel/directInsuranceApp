import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { t } = useTranslation(); // הוספת תמיכה בתרגום
  
  // נגדיר את המסכים - תיקנתי את שגיאות הכתיב
  const slides: OnboardingSlide[] = [
    {
      id: '1',
      title: 'פעולות בקליק',
      description: 'הוספת נהג, פתיחת דיווח, עדכון פרטים ועוד מגוון פעולות ללא המתנה לנציג',
      icon: 'gesture-tap-button'
    },
    {
      id: '2',
      title: 'כל המידע במקום אחד',
      description: 'לדעת מה בדיוק הפוליסה שלך מכסה ולצפות בכל המידע החשוב באמת',
      icon: 'information-outline'
    },
    {
      id: '3',
      title: 'הטבות',
      description: 'רק לקוחות ביטוח ישיר נהנים ממגוון הטבות ומבצעים במיוחד בשבילכם!',
      icon: 'gift-outline'
    },
    {
      id: '4',
      title: 'יותר ביטוח',
      description: 'כל מה שאתם צריכים מחברת הביטוח שלכם ויותר! שירותים דיגיטליים, שירות עד בית הלקוח ועוד',
      icon: 'shield-check-outline'
    }
  ];
  
  // גלילה למסך הבא
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: nextIndex * width,
          animated: true
        });
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
    const currentIndex = Math.round(contentOffsetX / width);
    
    if (currentIndex >= 0 && currentIndex < slides.length) {
      setCurrentIndex(currentIndex);
    }
  };
  
  // רינדור של שקופית יחידה
  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View 
      className="justify-center items-center px-8" 
      style={[{ width }, styles.slideContainer]}
    >
      <View 
        className="rounded-full p-5 bg-blue-50"
      >
        <MaterialCommunityIcons name={item.icon} size={120} color="#2196F3" />
      </View>
      <Text style={styles.rtlText} className="text-2xl font-bold mt-8 mb-4 text-center">{item.title}</Text>
      <Text style={styles.rtlText} className="text-base text-center text-gray-600">{item.description}</Text>
    </View>
  );
  
  // רינדור של אינדיקטורים (נקודות)
  const renderDotIndicators = () => (
    <View className="flex-row justify-center my-8">
      {slides.map((_, index) => (
        <View
          key={index}
          className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
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
          data={slides}
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
              className="bg-blue-500 py-4 rounded-lg items-center"
              onPress={onComplete}
              accessible={true}
              accessibilityLabel="התחל להשתמש באפליקציה"
              accessibilityRole="button"
            >
              <Text style={styles.rtlText} className="text-white text-base font-bold text-center">בואו נתחיל!</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row">
              <TouchableOpacity
                className="bg-transparent py-4 flex-1 items-center"
                onPress={handleSkip}
                accessible={true}
                accessibilityLabel="דלג למסך הבית"
                accessibilityRole="button"
              >
                <Text style={styles.rtlText} className="text-gray-500 text-base font-medium">דלג</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="bg-blue-500 py-4 rounded-lg items-center flex-1"
                onPress={handleNext}
                accessible={true}
                accessibilityLabel="המשך למסך הבא"
                accessibilityRole="button"
              >
                <Text style={styles.rtlText} className="text-white text-base font-bold">המשך</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// הוספת סגנונות בסוף הקובץ
const styles = StyleSheet.create({
  slideContainer: {
    // הוספת תמיכה בכיוון RTL - שימוש ב-direction עבור View
    direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'right',
  }
});

export default Onboarding;

