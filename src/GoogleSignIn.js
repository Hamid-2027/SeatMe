import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
// import { onGoogleButtonPress } from './googleSignInConfig';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({ webClientId: '698870086535-9u7om62751c3ivum8f2nboe1iophqdom.apps.googleusercontent.com' });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      setLoading(false);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }

  };
  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      {userInfo != null && <Text style={{ color: 'black' }}>{userInfo.user.name}</Text>}
      {userInfo && <Text style={{ color: 'black' }}> {userInfo.user.email}</Text>}
      {userInfo && <Image style={{ width: 100, height: 80 }} source={{ uri: userInfo.user.photo }} />}



      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        {loading ? <ActivityIndicator size="small" color="#ffff" /> : <Text style={styles.buttonText}>Login with Google</Text>}
      </TouchableOpacity>
      {userInfo &&
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
    width: 233,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default GoogleSignIn;
