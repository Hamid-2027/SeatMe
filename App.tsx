import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import DetailsScreen from './src/Screens/details-screen';
import LoginScreen from './src/Screens/home-screen';
import WelcomeScreen from './src/Screens/welcome-screen';



const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Details" component={DetailsScreen} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
          <Stack.Screen name="welcome" component={WelcomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;