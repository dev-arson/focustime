/* eslint-disable */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from "@/utils/sizes";
import { IconButton, MD3Colors } from "react-native-paper";

export default function TimerButtons(props) {
  const {
    onTimeChange = () => {},
    size = 50,
    mode = 'outlined'
  } = props;

  return (
    <View style={styles.wrapper}>
      <IconButton
        icon={'numeric-1'}
        iconColor={MD3Colors.error50}
        size={size}
        mode={mode}
        onPress={() => onTimeChange(1)}
      >+</IconButton>
      <IconButton
        icon={'numeric-5'}
        iconColor={MD3Colors.error50}
        size={size}
        mode={mode}
        onPress={() => onTimeChange(5)}
      />
      <IconButton
        icon={'numeric-10'}
        iconColor={MD3Colors.error50}
        size={size}
        mode={mode}
        onPress={() => onTimeChange(10)}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  button: {
    margin: spacing.md,
    backgroundColor: spacing.md,
  }
});
