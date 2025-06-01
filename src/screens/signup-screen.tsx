import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../navigation/MainAppStack';
import { saveUserToStorage } from '../utils/auth';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '211288303829-63kqnb1d6n699n65sdnrmnah1i2fpk18.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export default function SignupScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    type SignInError = {
      code?: typeof statusCodes[keyof typeof statusCodes];
      message: string;
    };
    try {
      setIsLoading(true);
      console.log('Starting Google Sign-In process...');

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Play Services check passed');

      // Get the users ID token
      console.log('Attempting to get ID token...');
      // Get tokens
      await GoogleSignin.signIn();
      const { accessToken, idToken } = await GoogleSignin.getTokens();
      console.log('Got tokens');
      
      if (!idToken) {
        throw new Error('No ID token present in sign-in response');
      }

      // Create a Google credential with the token
      console.log('Creating Google credential...');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      console.log('Signing in with Firebase...');
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log('Firebase sign-in successful:', userCredential.user.uid);
      
      // Save user data to AsyncStorage
      await saveUserToStorage(userCredential.user);
      
      // Navigate to profile screen and prevent going back
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
    } catch (error: unknown) {
      const signInError = error as SignInError;
      console.error('Sign-in error:', signInError);
      
      if (signInError.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in was cancelled');
      } else if (signInError.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign in is already in progress');
      } else if (signInError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services are not available or need to be updated');
      } else {
        Alert.alert('Error', `Sign-in failed: ${signInError.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.googleButton]}
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Image 
          source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' }}
          style={styles.socialIcon}
        />
        <Text style={styles.buttonText}>
          {isLoading ? 'Please wait...' : 'Continue with Google'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.facebookButton]}>
        <Image 
          source={{ uri: 'https://www.facebook.com/favicon.ico' }}
          style={styles.socialIcon}
        />
        <Text style={[styles.buttonText,{color:'#fff'}]}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.emailButton]}>
        <Text style={styles.buttonText}>Sign up with Email</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  emailButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});
