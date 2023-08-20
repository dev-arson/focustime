import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '@/utils/sizes';
import { formatTime, minutesToMillis } from '@/utils/time-converter';
import { EventsEmitter } from "@/events";
import { RESET_TIMER, TIME_ADDED } from "@/events/types";

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
      setMillis((prev) => prev + minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    const progressTime = millis / minutesToMillis(minutes);
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
    EventsEmitter.on(RESET_TIMER, reset);
    EventsEmitter.on(TIME_ADDED, onAddTime);
    return () => {
      EventsEmitter.off(RESET_TIMER, reset);
      EventsEmitter.off(TIME_ADDED, onAddTime);
    };
  }, []);

  const onAddTime = (newMinutes) => {
    setMillis((prev) => prev + minutesToMillis(newMinutes));
  };

  const reset = () => {
    setMillis(minutesToMillis(minutes));
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
    padding: spacing.md,
  },
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: '#FFF',
    margin: spacing.sm,
  },
});
