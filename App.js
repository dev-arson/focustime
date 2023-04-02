import React, { useState } from 'react';
import {
  StyleSheet, StatusBar,
} from 'react-native';
import { Home } from '@/views';
import {
  SafeAreaProvider, SafeAreaView,
} from 'react-native-safe-area-context';
import FocusView from './src/views/timer';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [subject, setSubject] = useState(null);

  return (<SafeAreaProvider>
    <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'#252525'}/>
    <SafeAreaView
      edges={['top']}
      style={{ flex: 0, backgroundColor: '#252525' }}
    />
    <SafeAreaView style={styles.wrapper} edges={['left', 'right']}>
      {subject ? (
        <FocusView
          subject={subject}
          onTimerEnd={() => {
          }}
          clearSubject={() => {
          }}
        />) : (<Home addSubcject={setSubject}/>)}
    </SafeAreaView>
    <SafeAreaView edges={['bottom']} backgroundColor="#252525"/>
  </SafeAreaProvider>);
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#252525',
    padding: spacing.xl,
  },
});
