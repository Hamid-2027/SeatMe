import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '211288303829-63kqnb1d6n699n65sdnrmnah1i2fpk18.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Google Sign-In process...');

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Play Services check passed');

      // Get the users ID token
      console.log('Attempting to get ID token...');
      const signInResult = await GoogleSignin.signIn();
      console.log('Got sign-in result:', signInResult);
      
      // Get the ID token
      const { accessToken } = await GoogleSignin.getTokens();
      if (!accessToken) {
        throw new Error('No access token present in sign-in response');
      }

      // Create a Google credential with the token
      console.log('Creating Google credential...');
      const googleCredential = auth.GoogleAuthProvider.credential(accessToken);

      // Sign-in the user with the credential
      console.log('Signing in with Firebase...');
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log('Firebase sign-in successful:', userCredential.user.uid);
      
      setUserInfo(userCredential.user);
      Alert.alert('Success', 'Logged in successfully!');
      // navigation.navigate('Home'); // Uncomment this when you have a Home screen
    } catch (error) {
      console.error('Sign-in error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services are not available or need to be updated');
      } else {
        Alert.alert('Error', `Sign-in failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      setUserInfo(null);
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Make sure to add your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to SeatMe</Text>
      </View>

      {!userInfo ? (
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={isLoading}
        />
      ) : (
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  googleButton: {
    width: 240,
    height: 48,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
