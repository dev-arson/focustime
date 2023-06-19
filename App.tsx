import React, {useState} from 'react';
import {Keyboard, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider, SafeAreaView,
} from 'react-native-safe-area-context';
import {Provider} from 'react-native-paper';
import {FocusView, HomeView} from '@/views';
import {spacing} from '@/utils/sizes';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export default function App() {

  const [isWorkTimerShowed, setIsWorkTimerShowed] = useState<boolean | null>(null)
  const inputTextHeight: SharedValue<number> = useSharedValue(1);
  const timerViewHeight: SharedValue<number> = useSharedValue(0);


  const showTimer = (): void => {
    Keyboard.dismiss();
    setIsWorkTimerShowed(true);
    inputTextHeight.value = withTiming(0.1, { duration: 300 });
    timerViewHeight.value = withTiming(0.9, { duration: 300 });
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
          <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'#252525'}/>
          <SafeAreaView
            edges={['top']}
            style={{flex: 0, backgroundColor: '#252525'}}
          />
          <Animated.View style={[{ padding: spacing.md }, inputAnimatedStyle]}>
            <HomeView onAddPress={showTimer}/>
          </Animated.View>
          <Animated.View style={[{ padding: spacing.md }, timerAnimatedStyle]}>
            {isWorkTimerShowed ?
              <FocusView/>
              : null}
          </Animated.View>
          <SafeAreaView
            edges={['bottom']}
            style={{backgroundColor: "#252525"}}/>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>);
}
