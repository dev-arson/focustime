import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Vibration, View,
} from 'react-native';
import { IconButton, ProgressBar } from 'react-native-paper';
import { spacing } from '@/utils/sizes';
import UiCountdown from '../../components/ui-countdown';
import { TimingButtons } from './components';
import { EventsEmitter } from '@/events';
import { RESET_TIMER } from "@/events/types";

export default function Timer() {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(25)

  useEffect(() => {
    EventsEmitter.on(RESET_TIMER, resetTimer)
    return () => {
      EventsEmitter.off(RESET_TIMER, resetTimer)
    }
  }, [])

  const resetTimer = () => {
    Vibration.vibrate(3000, false);
    setIsStarted(false);
    setProgress(1);
    setMinutes(25) // TODO: DEFAULT MINUTES
  };

  const onStartClick = () => {
    setIsStarted((old) => !old);
  };

  const onProgress = (value) => {
    setProgress(value);
  };
  const getButtonIcon = () => (isStarted ? 'pause' : 'play');
  const onEnd = (reset) => {
    Vibration.vibrate(1000, false);
    setIsStarted(false);
    setProgress(1);
    setMinutes(25) // TODO: DEFAULT MINUTES
    if (reset) {
      reset();
    }
  };

  const onAddTime = (minutes) => {
    setMinutes((prev) => {
      console.log('min', minutes, prev, prev + minutes)
      minutes + prev
    })
  }

  const onResetTimer = () => {
    EventsEmitter.emit(RESET_TIMER);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.countdown}>
          <UiCountdown
            minutes={minutes}
            isPaused={!isStarted}
            onEnd={onEnd}
            onProgress={onProgress}
          />
        </View>
        <ProgressBar
          progress={progress}
          color="#545454"
          style={styles.progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <IconButton
          size={70}
          icon={getButtonIcon()}
          style={{
            alignSelf: 'center'
          }}
          onPress={onStartClick}
          onLongPress={onResetTimer}
          mode='contained'
        />
        <TimingButtons
          mode={'contained'}
          onTimeChange={onAddTime}
        />
      </View>
      <IconButton
        icon={'restart'}
        onPress={onResetTimer}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: spacing.md,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  taskContainer: {
    backgroundColor: '#1e58af',
    borderRadius: spacing.md,
    padding: spacing.sm,
  },
  buttonWrapper: {
    padding: spacing.xxl,
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 0.3
  },
  progress: {
    height: 10,
    borderRadius: spacing.md,
    margin: spacing.sm,
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
});
