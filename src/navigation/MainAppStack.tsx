import * as React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import SearchBusScreen from '../screens/search-bus-screen';
import PaymentFlowMainScreen from '../screens/payment-flow/payment-flow-main-screen';
import PaymentScreen from '../screens/payment-flow/payment-screen';
import SignupScreen from '../screens/signup-screen';
import ProfileScreen from '../screens/profile-screen';

// Define the type for the root stack navigator
export type RootStackParamList = {
  TabHome: undefined; // Tab navigator does not have parameters
  searchBusScreen: { source: string; destination: string }; 
  PaymentFlowMainScreen: undefined;
  PaymentScreen: undefined;
  Signup: undefined;
  Profile: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabHome" component={BottomTabNavigator} />
      <Stack.Screen name="searchBusScreen" component={SearchBusScreen} />
      <Stack.Screen name="PaymentFlowMainScreen" component={PaymentFlowMainScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
} 