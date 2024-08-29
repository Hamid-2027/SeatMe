import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import GoogleSignIn from '../GoogleSignIn';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('welcome')}
      />
    <View style={styles.container}>
        <GoogleSignIn />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
