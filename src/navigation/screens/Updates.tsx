/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@react-navigation/elements';
import { forwardRef, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native';

export function Updates() {
  const parentRef = useRef<TextInput>(null);

  const focusInput = () => {
    if (parentRef.current) {
      parentRef.current.focus();
    }
  };

  const updateInputValue = async () => {
    const newText = 'Updated from Parent';
    if (parentRef.current) {
      parentRef.current.setNativeProps({ text: newText });

      try {
        await AsyncStorage.setItem('input_value', newText);
        console.log('Saved to AsyncStorage');
      } catch (error) {
        console.log('Error saving to AsyncStorage', error);
      }
    }
  };

  const getDataFromAsyncStorage = async () => {
    const value = await AsyncStorage.getItem('input_value');
    console.log(value);
  };

  const clearDataAsyncStorage = async () => {
    await AsyncStorage.removeItem('input_value');
  };

  return (
    <View style={styles.container}>
      <Text>Parent Component</Text>
      <Child ref={parentRef} />
      <Button title="Focus Input" onPress={focusInput} />
      <Button
        title="Update Input Value"
        onPress={updateInputValue}
      />
      <Button
        title="Get item from async storage"
        onPress={getDataFromAsyncStorage}
      />
      <Button
        title="Delete Item in AsynStorage"
        onPress={clearDataAsyncStorage}
      />
    </View>
  );
}

const Child = forwardRef<TextInput, {}>((props, ref) => {
  return (
    <View>
      <Text>Child Component</Text>
      <TextInput ref={ref} style={styles.input} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});
