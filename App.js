import React from 'react';
import { StyleSheet, View, StatusBar as DeviceStatusbar, Text } from 'react-native';
import { Home } from '@/views';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
          <Home />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#252525',
  },
  container: {
    flex: 1,
    paddingTop: DeviceStatusbar.currentHeight,
  },
});
