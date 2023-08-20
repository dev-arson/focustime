import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '@/utils/sizes';
import { formatTime, minutesToMilis } from '@/utils/time-converter';
import { EventsEmitter } from "@/events";
import { RESET_TIMER } from "@/events/types";

const SECOND_IN_MILLIS = 1000;
export default function UiCountdown(props) {
  const {
    minutes,
    isPaused,
    onProgress,
    onEnd,
  } = props;
  const interval = useRef(null);
  const [millis, setMillis] = useState(0);

  useEffect(() => {
    setMillis((prev) => prev + minutesToMilis(minutes));
  }, [minutes]);

  useEffect(() => {
    const progressTime = millis / minutesToMilis(minutes);
    onProgress(progressTime);
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    EventsEmitter.on(RESET_TIMER, reset)
    return () => {
      EventsEmitter.off(RESET_TIMER, reset)
    };
  }, []);

  const reset = () => {
    setMillis(minutesToMilis(minutes));
  }

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }

      onProgress();
      return time - SECOND_IN_MILLIS;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(millis) ?? '0:00'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    borderRadius: spacing.lg,
  },
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#FFF',
    padding: spacing.lg,
  },
});
