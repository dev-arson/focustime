import { React } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import UiIcon from '../ui-icon';

export default UiRoundedButton = ({
  onPress = () => {},
  iconName,
  style = {},
  size = 80,
  text = '',
  textStyle = {},
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius]} onPress={onPress}>
      {iconName && (
        <UiIcon
          name={iconName}
          color="#fff"
          style={[textStyle, styles(size).text]}
        />
      )}
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderColor: 'gray',
    borderRadius: size,
    borderWidth: 2,
  },
  text: {
    color: '#fff',
    fontSize: size,
  },
});
