import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleSignIn from './src/GoogleSignIn'; // Import the GoogleSignIn component
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '698870086535-9u7om62751c3ivum8f2nboe1iophqdom.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <GoogleSignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});
