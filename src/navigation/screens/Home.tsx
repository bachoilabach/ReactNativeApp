import { Button, Text } from '@react-navigation/elements';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>
        Open up 'src/App.tsx' to start working on your app!
      </Text>
      <Button
        onPress={() => navigation.navigate('Settings')}>
        Go to Settings
      </Button>
      <Button onPressIn={() => navigation.navigate('New')}>
        Go to New
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
