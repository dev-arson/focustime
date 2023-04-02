import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { UiRoundedButton } from '@/components';
import EStyleSheet from 'react-native-extended-stylesheet';

export default ({ addSubcject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSubject}
          label="What would You like to focus on?"
          style={styles.textInput}/>
      </View>
      <UiRoundedButton
        text="+"
        style={styles.buttonContainer}
        textStyle={styles.text}
        onPress={() => {
          addSubcject(subject);
        }}/>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
  },
  textInput: {
    flex: 1,
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

  },
  text: {
    color: '#FFF',
    fontSize: '3rem',
    textAlignment: 'center',
  },
});
