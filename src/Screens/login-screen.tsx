import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import GoogleSignIn from '../google-sign-in-screen';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../../i18n';
import SelectLangModal from '../core/components/SelectLangModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectLanguage, setSelectLanguage] = useState('English');
  const [showModal, setShowModal] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    checkLng();
  }, []);
  const checkLng = async () => {
    const x = await AsyncStorage.getItem('LANG');
    if (x != null) {
      i18n.changeLanguage(x);
      let lng =
        x == 'en'
          ? 'English'
          : 'اردو'
      setSelectLanguage(lng);
    }
  };

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
      <TouchableOpacity
        style={styles.langView}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text  style={{color:'black'}}>{selectLanguage}</Text>
        {/* <Image source={require('../images/dropdown.png')} style={styles.icon} /> */}
      </TouchableOpacity>
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
        <Text style={styles.loginButtonText}>{t('login')}</Text>
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
     <SelectLangModal
            visible={showModal}
            selectedLang={selectLanguage}
            onClose={() => {
              setShowModal(false);
            }}
            onSelect={async lang => {
              let lng =
                lang == 'English'
                  ? 'en'
                  : 'ur';
              await AsyncStorage.setItem('LANG', lng);
              i18n.changeLanguage(lng);
              setSelectLanguage(lang);
              setShowModal(false);
            }}
          />        
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
  langView: {

    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#9e9e9e',
    position: 'absolute',
    top: -130,
    right: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
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
