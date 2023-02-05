import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { formatTime, minutesToMilis } from '../../utils/time-converter';

const SECOND_IN_MILIS = 1000;
export default ({
  minutes, isPaused, onProgress = () => {}, onEnd = () => {},
}) => {
  const interval = useRef(null);
  const [millis, setMilis] = useState(0);

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }

      onProgress();
      const timeLeft = time - SECOND_IN_MILIS;
      return timeLeft
    });
  }

  useEffect(() => { 
    setMilis(minutesToMilis(minutes))
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMilis(minutes))
  }, [millis])

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


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(millis) ?? '0:00'}
      </Text>
    </View>
  );
};

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
