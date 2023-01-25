import React, { useState } from 'react';
import { StyleSheet, View, StatusBar as DeviceStatusbar, Text } from 'react-native';
import { Home } from '@/views';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { default as FocusView } from './src/views/timer/index';

export default function App() {
  const [subject, setSubject] = useState(null);

  return (
    <SafeAreaProvider>
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.container}>
          {subject 
            ? <FocusView />
            : <Home addSubcject={setSubject} />
          }
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
