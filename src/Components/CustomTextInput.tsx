import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';
interface CustomTextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  backgroundColor = 'white',
  borderColor = 'gray',
  borderWidth = 0,
  borderRadius = 100,
  ...rest
}) => {
  const { wp, hp } = useResponsiveDimensions();
  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: backgroundColor,
      paddingVertical: hp(2),
      width: '100%',
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: borderRadius,
      paddingHorizontal: wp(8),

    },
  });
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="black"
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}

      {...rest}
    />
  );
};

export default CustomTextInput;
