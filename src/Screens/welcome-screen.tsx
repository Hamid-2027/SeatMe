import React from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { selectCount } from '../core/redux/slices/counterSlice';
import { increment, decrement } from '../core/redux/slices/counterSlice';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    //(state)=> state.counter.value
const count = useSelector(selectCount);
  const dispatch = useDispatch();



  return (
    <>
    <View style={styles.container}>
      <Text style={{color:'black'}}>Details Screen</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color : 'black'}}>Redux Example</Text>
      <Text style={{ color : 'black'}}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
