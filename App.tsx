import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import DetailsScreen from './src/screens/intro-onboarding-screens';
import LoginScreen from './src/screens/auth-screens/login-screen';
import WelcomeScreen from './src/screens/welcome-screen';
import { useSelector } from 'react-redux';
import PostScreen from './src/screens/post-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderScreen from './src/screens/slider-screen';
import IntroOnboardingScreens from './src/screens/intro-onboarding-screens';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userData, setUserData] = useState(null);
  const isAppReady = useSelector((state) => state.userAuth.isAppReady)
  console.log("isAppReady...",isAppReady)
  const [isUserLogin, setIsUserLogin] = useState(false);

   
  useEffect(() => {
    const getUserLoginDetails = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData(userData);

      } else {
        setUserData(null);

      }
  console.log("data...",isAppReady)

    });

    return () => getUserLoginDetails();

  }, []);
  console.log("isUserLogin.>>>.",isUserLogin)
  useEffect(()=>{
    
    //................
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem("isUserLogin");
      console.log("loginStatusKK",loginStatus);
      if(loginStatus==='true') {setIsUserLogin(true);}
    };

    checkLoginStatus();
  },[isUserLogin,setIsUserLogin])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName=  {'IntroScreens' }>

        <Stack.Screen name="Auth" component={LoginScreen} />

        <Stack.Screen name="IntroScreens" component={IntroOnboardingScreens} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="SliderScreen" component={SliderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;