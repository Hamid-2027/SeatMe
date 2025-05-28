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
type Onboarding2NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding2'>;

const { width, height } = Dimensions.get('window');

export default function Onboarding2() {
  const navigation = useNavigation<Onboarding2NavigationProp>();
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
    // Navigate to the main app after completing onboarding
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <LinearGradient
      colors={['#4A6DE5', '#7C8FF8', '#9BA8FA']}
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
            {/* Phone outline */}
            <View style={styles.phoneOutline}>
              <View style={styles.phoneScreen}>
                <View style={styles.ticketContainer}>
                  <View style={styles.ticket}>
                    <View style={styles.ticketHeader} />
                    <View style={styles.ticketDashedLine} />
                    <View style={styles.ticketBody}>
                      <View style={styles.ticketDetail} />
                      <View style={styles.ticketDetail} />
                    </View>
                  </View>
                </View>
                <View style={styles.confirmationCircle}>
                  <View style={styles.checkmark} />
                </View>
              </View>
            </View>
            <View style={styles.securityIconContainer}>
              <View style={styles.securityIcon} />
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
          <Text style={styles.title}>Book Tickets Instantly & Travel Smart</Text>
          <Text style={styles.subtitle}>
            Secure mobile payments and instant access to your bookings, all in one place
          </Text>
        </Animated.View>

        {/* Navigation Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.pagination}>
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.activeDot]} />
          </View>
          
          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
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
  phoneOutline: {
    width: 160,
    height: 280,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  phoneScreen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketContainer: {
    width: '100%',
    alignItems: 'center',
  },
  ticket: {
    width: '90%',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketHeader: {
    height: 25,
    backgroundColor: '#4A6DE5',
  },
  ticketDashedLine: {
    height: 2,
    backgroundColor: '#DADADA',
    marginVertical: 8,
  },
  ticketBody: {
    padding: 8,
  },
  ticketDetail: {
    height: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    borderRadius: 5,
  },
  confirmationCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  securityIconContainer: {
    position: 'absolute',
    top: 50,
    right: 60,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  securityIcon: {
    width: 20,
    height: 25,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4A6DE5',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 40,
    right: 30,
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
  getStartedButton: {
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
  getStartedText: {
    color: '#4A6DE5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
