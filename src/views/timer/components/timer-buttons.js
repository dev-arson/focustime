/* eslint-disable */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UiRoundedButton } from '@/components';

export default function TimerButtons(props) {
  const {
    onTimeChange = () => {}
  } = props;

  return (
    <View style={styles.wrapper}>
      <UiRoundedButton
        style={styles.button}
        text={'10'}
        onPress={() => onTimeChange(10)}
        />
      <UiRoundedButton
        style={styles.button}
        text={'15'}
        onPress={() => onTimeChange(15)}
      />
      <UiRoundedButton
        style={styles.button}
        text={'20'}
        onPress={() => onTimeChange(20)}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  button: {

  }
});
