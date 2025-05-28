import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectValue, setValue, clearValue } from '../slices/exampleSlice';

const ExampleRedux = () => {
  const [inputValue, setInputValue] = useState('');
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  const handleSetValue = () => {
    dispatch(setValue(inputValue));
    setInputValue('');
  };

  const handleClearValue = () => {
    dispatch(clearValue());
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Example</Text>
      
      <Text style={styles.label}>Current value in store:</Text>
      <Text style={styles.value}>{value || 'No value set'}</Text>
      
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter a value"
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Set Value" onPress={handleSetValue} disabled={!inputValue} />
        <View style={styles.buttonSpacer} />
        <Button title="Clear Value" onPress={handleClearValue} disabled={!value} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSpacer: {
    width: 16,
  },
});

export default ExampleRedux;
