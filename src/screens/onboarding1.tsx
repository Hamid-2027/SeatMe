import React, { useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Animated, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

// Define the navigation type
type Onboarding1NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding1'>;

const { width, height } = Dimensions.get('window');

export default function Onboarding1() {
  const navigation = useNavigation<Onboarding1NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnimImage = useRef(new Animated.Value(0)).current;
  const slideAnimImage = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Animate content
    Animated.parallel([
      // Animate image with slight delay
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(fadeAnimImage, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnimImage, {
            toValue: 0,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]),
      // Animate text
      Animated.sequence([
        Animated.delay(700),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, []);

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <LinearGradient
      colors={['#1E88E5', '#42A5F5', '#64B5F6']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.contentContainer}>
        {/* Illustration Area */}
        <Animated.View 
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnimImage,
              transform: [
                { translateY: slideAnimImage },
                { scale: scaleAnim }
              ],
            }
          ]}
        >
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../assets/firstLocation.png')} 
              style={styles.landmarkIcon}
            />
            <Image 
              source={require('../../assets/lcoationLogo.png')} 
              style={[styles.landmarkIcon, styles.secondIcon]}
            />
            <View style={styles.worldIconContainer}>
              <View style={styles.worldIcon} />
            </View>
            <View style={styles.decorativeCircle} />
            <View style={[styles.decorativeCircle, styles.smallerCircle]} />
          </View>
        </Animated.View>

        {/* Text Content */}
        <Animated.View 
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.title}>Discover Top Attractions & Experiences Worldwide</Text>
          <Text style={styles.subtitle}>
            Explore famous landmarks, local tours, and unique experiences all in one place
          </Text>
        </Animated.View>

        {/* Navigation Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
          </View>
          
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  illustrationContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  landmarkIcon: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 2,
  },
  secondIcon: {
    top: 40,
    right: 40,
    width: 80,
    height: 80,
    transform: [{ rotate: '0deg' }],
  },
  worldIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  worldIcon: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    bottom: 30,
    left: 30,
  },
  smallerCircle: {
   top: 30,
    right: 35,
    width: 90,
    height: 90,
    borderRadius: 45,
    left: undefined,
    bottom: undefined,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
    borderRadius: 10,
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nextButtonText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
