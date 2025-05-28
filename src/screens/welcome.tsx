import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

// Define the root navigation types
type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

type WelcomeScreenProps = {
  route: {
    params?: {
      isFirstLaunch?: boolean;
    };
  };
};

export default function WelcomeScreen({ route }: WelcomeScreenProps) {
  // Check if it's first launch from route params
  const isFirstLaunch = route.params?.isFirstLaunch !== undefined ? route.params.isFirstLaunch : true;
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const flipXValue = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Create a new animated value for icon transition
  const iconTransition = useRef(new Animated.Value(0)).current;
  
  // Text animations
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(20)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleSlideAnim = useRef(new Animated.Value(20)).current;
  
  // Interpolate the flip value to create a horizontal flip animation
  const flipX = flipXValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'] // Flip horizontally (on X-axis)
  });
  
  // Create an opacity interpolation that switches images mid-flip
  // First image fully visible (opacity 1) from 0 to 0.49, then fades out
  const firstIconOpacity = flipXValue.interpolate({
    inputRange: [0, 0.49, 0.51],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  });
  
  // Second image starts invisible (opacity 0), then fades in after 0.51
  const secondIconOpacity = flipXValue.interpolate({
    inputRange: [0, 0.49, 0.51, 1],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp'
  });
  
  // Create a pulsating animation
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Animate the title and subtitle with a staggered effect
  const animateTexts = () => {
    // Title animation with bounce effect
    Animated.stagger(150, [
      // Title animation
      Animated.parallel([
        Animated.timing(titleFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(titleSlideAnim, {
          toValue: 0,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      // Subtitle animation
      Animated.parallel([
        Animated.timing(subtitleFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleSlideAnim, {
          toValue: 0,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  useEffect(() => {
    // Start text animations immediately alongside logo animations
    animateTexts();
    
    // Create animation sequence for better visual effect
    Animated.sequence([
      // First fade in and start flipping
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(flipXValue, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.bezier(0.2, 0.6, 0.4, 1),
          useNativeDriver: true
        })
      ]),
      // Then complete the flip with bounce and scale
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(flipXValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.bezier(0.1, 0.1, 0.35, 1.2),
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      // Start the pulsing animation after the initial animation completes
      startPulseAnimation();
    });
    
    // Navigate after animation completes, based on whether it's first launch
    const timer = setTimeout(() => {
      if (isFirstLaunch) {
        // First time user - go to onboarding screens
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding1' }],
        });
      } else {
        // Returning user - go directly to main app
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      }
    }, isFirstLaunch ? 5000 : 3000); // Shorter animation for returning users
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <LinearGradient
      colors={['#2980b9', '#3498db', '#48a6e8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.contentContainer}>
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }], 
            alignItems: 'center'
          }}
        >
          <Animated.View 
            style={[
              styles.logoContainer, 
              { 
                transform: [
                  { rotateY: flipX }, // Horizontal flip
                  { scale: pulseAnim }
                ],
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,
                elevation: 17,
              }
            ]}
          >
            <View style={styles.iconContainer}>
              {/* First icon - fades out during flip */}
              <Animated.Image 
                source={require('../../assets/firstLocation.png')} 
                style={[styles.logoImage, { opacity: firstIconOpacity, position: 'absolute' }]}
                resizeMode="contain"
              />
              {/* Second icon - fades in during flip */}
              <Animated.Image 
                source={require('../../assets/lcoationLogo.png')} 
                style={[styles.logoImage, { opacity: secondIconOpacity }]}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
          
          <Animated.Text 
            style={[
              styles.title,
              {
                opacity: titleFadeAnim,
                transform: [{ translateY: titleSlideAnim }]
              }
            ]}
          >
            SeatMe
          </Animated.Text>
          
          <Animated.Text 
            style={[
              styles.subtitle,
              {
                opacity: subtitleFadeAnim,
                transform: [{ translateY: subtitleSlideAnim }]
              }
            ]}
          >
            Find your perfect seat
          </Animated.Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 8, // Further reduced spacing
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  iconContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4, // Further reduced spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 