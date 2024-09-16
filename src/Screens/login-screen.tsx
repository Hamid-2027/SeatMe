import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import GoogleSignIn from '../google-sign-in-screen';
import LinearGradient from 'react-native-linear-gradient';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // <View style={styles.container}>
    //   <Text>Home Screen</Text>
    //   <Button
    //     title="Go to Details"
    //     onPress={() => navigation.navigate('welcome')}
    //   />
    //     <GoogleSignIn />
    // </View>
      <LinearGradient
      colors={['#e0f7fa', '#ffffff']}
      start={{ x: 0, y: 0 }} 
      end={{ x: .8, y: 0 }} 
      style={styles.gradientColorStyle}
    >
    <View style={styles.container}>

      <Text style={styles.title}>Welcome <Text style={{color:'blue'}}>SeatMe</Text></Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={'black'}
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'black'}
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={()=>{}}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={{width:'100%'}}>
      <GoogleSignIn />
      </View>

      <Text style={styles.orText}>OR</Text>

      {/* <SocialIcon
        title="Sign In With Google"
        button
        type="google"
        onPress={handleGoogleLogin}
        style={styles.googleButton}
      /> */}

      <TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>        
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientColorStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:-12,
  },
  container: {
    paddingHorizontal: 20,
    width:'100%',
    alignItems:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  googleButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 20,
  },
});

export default LoginScreen;
