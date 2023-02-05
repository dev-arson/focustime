import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar as DeviceStatusbar,
  Text,
  StatusBar,
} from 'react-native';
import { Home } from '@/views';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { default as FocusView } from './src/views/timer/index';

export default function App() {
  const [subject, setSubject] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={{ flex: 0, backgroundColor: '#252525' }}
      />
      <SafeAreaView style={styles.wrapper} edges={['left', 'right']}>
        {subject ? (
          <FocusView
            subject={subject}
            onTimerEnd={() => {}}
            clearSubject={() => {}}
          />
        ) : (
          <Home addSubcject={setSubject} />
        )}
      </SafeAreaView>
      <SafeAreaView edges={['bottom']} backgroundColor="#252525" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#252525',
  },
});
