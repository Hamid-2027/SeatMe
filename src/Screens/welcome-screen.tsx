import React, { useState } from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { selectCount } from '../core/redux/slices/counterSlice';
import { increment, decrement } from '../core/redux/slices/counterSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setIsAppReady } from '../core/redux/slices/user-auth-slice';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

// type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  // navigation: DetailsScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = () => {
const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const navigation= useNavigation();

  const handleGoogleLogout = async () => {
  const {t} = useTranslation();

    setLoading(true);
    try {
      await GoogleSignin.signOut();
      dispatch(setIsAppReady(false))
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={{color:'black'}}> {t('welcome')} </Text>
      <Button title="Create you post" onPress={() => navigation.navigate('Post')} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color : 'black'}}>Redux Example</Text>
      <Text style={{ color : 'black'}}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>




    <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogout}>
      {loading ? <ActivityIndicator size="small" color="#ffff" /> : <Text style={styles.loginButtonText}>Login with Google</Text>}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',

  },
  loginButton: {
    width: '70%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginVertical:21,
  },
});

export default WelcomeScreen;
