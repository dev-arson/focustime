import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import UiCountdown from '../../components/ui-countdown';
import UiRoundedButton from '../../components/ui-rounded-button';
import { fontSizes, spacing } from '../../utils/sizes';

export default ({ minutes, subject, onTimerEnd, clearSubject }) => {

  const [isStarted, setIsStarted] = useState(false);

  const onStartClick = () => {
    setIsStarted((old) => !old);
  }

  const getButtonTitle = () => isStarted ? 'pause' : 'start';

  const onProgress = () => {};

  const onEnd = () => {};

  return (
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <Text style={styles.taskName}>{subject}</Text>
          <View style={styles.countdown}>
            <UiCountdown
              minutes
              isPaused={!isStarted}
              onEnd={onEnd}
              onProgress={onProgress}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <UiRoundedButton
            onPress={onStartClick}
            text={getButtonTitle()}
            textStyle={styles.startButton}/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  taskName: {
    fontSize: fontSizes.xxl,
    textAlign: 'center',
    paddingVertical: spacing.xxl,
    fontWeight: 'bold',
    color: 'white',
  },
  taskContainer: {
    flex: 0.5,
    backgroundColor: '#1e58af',
    borderRadius: spacing.xl,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  startButton: {
    color: '#fff',
    fontSize: fontSizes.xl
  }
});
