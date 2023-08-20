import React, { useState } from 'react';
import {Text, View} from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {spacing} from "@/utils/sizes";

export type StartWorkType = (value: string) => void;

type Props = {
  onAddPress: StartWorkType,
}
export default function UiHome(props: Props) {
  const offsetX: SharedValue<number> = useSharedValue(0);
  const { onAddPress } = props;
  const [subject, setSubject] = useState<string | null>(null);
  const [isFabVisible, setIsFabVisible] = useState<boolean>(true);
  const [isTextInputEnabled, setIsTextInputEnabled] = useState<boolean>(true);
  const animatedTextInputContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetX.value }],
    };
  });

  const onTextChange = (value: string): void => {
    setSubject(value);
  };
  const onFabClick = (): void => {
    if (subject != null) {
      setIsFabVisible(false);
      setIsTextInputEnabled(false);
      onAddPress(subject);
    } else {
      vibrateTextInput();
    }
  };

  const vibrateTextInput = () => {
    offsetX.value = withSequence(
      withTiming(-2, { duration: 20 }),
      withRepeat(withTiming(2, { duration: 20 }), 10, true),
      withTiming(0, { duration: 20 }),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[animatedTextInputContainerStyle]}>
        <TextInput
          onChangeText={onTextChange}
          label="What would You like to focus on?"
          outlineStyle={{
            borderRadius: 15,
          }}
          disabled={!isTextInputEnabled}
          numberOfLines={1}
          mode='outlined'
          accessibilityLabelledBy={undefined}
          accessibilityLanguage={undefined}
        />
      </Animated.View>

      <View style={{
        flex: 1,
        backgroundColor: '#43434343',
        borderRadius: 15,
        marginTop: spacing.md,
        padding: spacing.md,
      }}>
      <Text>
        Last sessions screen
      </Text>
      </View>
      {isFabVisible && <FAB
        style={{
          width: 100,
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={onFabClick}
        color={'black'}
        theme={'light'}
        label="work"
        accessibilityLabelledBy={undefined}
        accessibilityLanguage={undefined}
        icon={'play'}/>}
    </View>
  );
}
