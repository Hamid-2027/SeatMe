import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
// import { configureGoogleSignIn } from './src/googleSignInConfig.js'; // Ensure configuration is set up
import GoogleSignIn from './src/GoogleSignIn'; // Import the GoogleSignIn component
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View>
      <Text>Welcome to the App!</Text>
      <GoogleSignIn />
    </View>
  );
}
