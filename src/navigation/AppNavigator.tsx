import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import WelcomeScreen from '../screens/welcome';
import Onboarding1Screen from '../screens/onboarding1';
import Onboarding2Screen from '../screens/onboarding2';
import BottomTabNavigator from './BottomTabNavigator';
import { isFirstLaunch } from '../utils/firstLaunchUtil';
import MainAppStack from './MainAppStack';

// Define the root stack parameter list
export type RootStackParamList = {
  Welcome: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await isFirstLaunch();
        setIsFirstTime(firstLaunch);
        setIsLoading(false);
      } catch (error) {
        console.log('Error checking first launch:', error);
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        initialParams={{ isFirstLaunch: isFirstTime } as any}
      />
      {isFirstTime && (
        <>
          <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
          <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
        </>
      )}
      <Stack.Screen name="MainApp" component={MainAppStack} />
    </Stack.Navigator>
  );
} 