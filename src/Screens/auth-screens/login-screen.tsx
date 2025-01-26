import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import GoogleSignIn from '../../google-sign-in-screen';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../../../i18n';
import SelectLangModal from '../../core/core-components/SelectLangModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../Colors';



const LoginScreen = ({ navigation }:any) => {
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
    <View style={styles.gradientColorStyle}>

    <View style={styles.container}>

      <Text style={styles.title}>Welcome To <Text style={{color:Colors.primary.deepBlue}}>SeatMe</Text></Text>
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
        placeholderTextColor={Colors.secondary.coolGray}
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.secondary.coolGray}
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={()=>{
        navigation.navigate("welcome")
      }}>
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
        <Text style={styles.signupText}>Don't have an account? <Text style={{color: Colors.primary.deepBlue}}>Sign Up</Text></Text>
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
      </View>

  );
};

const styles = StyleSheet.create({
  gradientColorStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:-12,
    backgroundColor:Colors.primary.black
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
    color:Colors.primary.white
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color:Colors.primary.white,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  langView: {
    backgroundColor:Colors.primary.white,
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
    color:Colors.primary.black,
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary.deepBlue,
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
  signupText: {
    color: Colors.primary.white,
    fontSize: 16,
    marginTop: 20,
  },
});

export default LoginScreen;
