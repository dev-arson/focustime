import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { UiRoundedButton } from '@/components';

export default () => {
  const [subject, setSubcject] = useState(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSubcject}
          label="What would You like to focus on?"
          style={styles.textInput}/>
        <UiRoundedButton
          text="+"
          style={styles.buttonContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
  },
  textInput: {
    flex: 0.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  buttonContainer: {
    flex: 0.2,
  },
  text: {
    color: "#FFF",
    textAlignment: "center",
  },
});
