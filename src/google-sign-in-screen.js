import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
// import { onGoogleButtonPress } from './googleSignInConfig';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAppReady } from './core/redux/slices/user-auth-slice';
import { Colors } from './Colors';

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation();
    const dispatch= useDispatch();
     const isAppReady = useSelector((state) => state.userAuth.isAppReady)

  useEffect(() => {
    console.log("isAppReady",userInfo)
    GoogleSignin.configure({ webClientId: '698870086535-9u7om62751c3ivum8f2nboe1iophqdom.apps.googleusercontent.com' });
    
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      console.log('before token')
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo); // user data
      console.log('after token')

      setLoading(false);
      dispatch(setIsAppReady(true));
      await AsyncStorage.setItem("isUserLogin", ); // for persist login data
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }

  };
  // const handleGoogleLogout = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     setUserInfo(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.loginButton} onPress={handleGoogleSignIn}>
      {loading ? <ActivityIndicator size="small" color="#ffff" /> : <Text style={styles.loginButtonText}>Login with Google</Text>}
      </TouchableOpacity>

      {/* {userInfo &&
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width:'100%',
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
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: Colors.primary.deepBlue,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default GoogleSignIn;
