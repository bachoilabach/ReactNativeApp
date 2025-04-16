import { Text } from '@react-navigation/elements';
import { forwardRef, useRef } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export function Updates() {
  const parentRef = useRef<TextInput>(null);

  const focusInput = () => {
    if (parentRef.current) {
      parentRef.current.focus(); 
    }
  };

  const updateInputValue = () => {
    if (parentRef.current) {
      parentRef.current.setNativeProps({ text: 'Updated from Parent' }); 
    }
  };

  return (
    <View style={styles.container}>
      <Text>Parent Component</Text>
      <Child ref={parentRef} />
      <Button title="Focus Input" onPress={focusInput} />
      <Button title="Update Input Value" onPress={updateInputValue} />
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
