import React, {useState} from 'react';
import {Keyboard, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider, SafeAreaView,
} from 'react-native-safe-area-context';
import {Provider} from 'react-native-paper';
import {FocusView, HomeView} from '@/views';
import {spacing} from '@/utils/sizes';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SlideInUp,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import EStyleSheet from "react-native-extended-stylesheet";

export default function App() {

  const [isWorkTimerShowed, setIsWorkTimerShowed] = useState<boolean | null>(null)
  const inputTextHeight: SharedValue<number> = useSharedValue(1);
  const timerViewHeight: SharedValue<number> = useSharedValue(0);
  const [subject, setSubject] = useState<string>('');
  const showTimer = (value: string): void => {
    Keyboard.dismiss();
    setSubject(value);
    setIsWorkTimerShowed(true);
    inputTextHeight.value = withTiming(0.1, {duration: 300});
    timerViewHeight.value = withTiming(0.9, {duration: 300});
  }

  const timerAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: timerViewHeight.value,
    }
  })

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: inputTextHeight.value
    }
  })

  return (
    <Provider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'#1e58af'}/>
          <SafeAreaView
            edges={['top']}
            style={{flex: 0, backgroundColor: '#252525'}}
          />
          <LinearGradient colors={['#1e58af','#1565C0','#8A6896', '#FF6B6B']} angle={160} useAngle={true} style={{ flex: 1}} >
          <Animated.View style={[{padding: spacing.md}, inputAnimatedStyle]}>
            {!isWorkTimerShowed
              ? <HomeView onAddPress={showTimer}/>
              : <Animated.Text
                entering={SlideInUp}
                style={styles.workTextBox}>{subject}</Animated.Text>}
          </Animated.View>
          <Animated.View style={[{padding: spacing.md}, timerAnimatedStyle]}>
            {isWorkTimerShowed ?
              <FocusView/>
              : null}
          </Animated.View>
          </LinearGradient>
          <SafeAreaView
            edges={['bottom']}
            style={{backgroundColor: "#1e58af"}}/>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>);
}

const styles = EStyleSheet.create({
  workTextBox: {
    flex: 1,
    textAlign: 'center',
    fontSize: 40,
    justifyContent: 'center',
    fontWeight: 'bold'
  },
});
