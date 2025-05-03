import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { InputWrapperProps, InputWrapper } from './InputWrapper';
import { styles as styleUtils } from '../utils/styles';
export type TextInputProps = Omit<InputWrapperProps, 'children'> & {
    value?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void,
    hidden?: boolean,
    style?: object,
    onSubmitEditing?: () => void,
    disabled?: boolean,
    onFocus?: () => void,
    multiline?: boolean
}

function Input ({
  label,
  value,
  description,
  placeholder,
  onChangeText,
  containerStyles,
  hidden = false,
  style = {},
  onSubmitEditing,
  disabled = false,
  onFocus,
  multiline = false
}: TextInputProps) {
  let [textVisible, setTextVisible] = useState(!hidden);

  return (
    <InputWrapper label={label} description={description} containerStyles={containerStyles}>
      <View style={styles.inputRow}>
        <TextInput
          style={{
            ...styles.input,
            ...style,
            ...(multiline && styles.multilineInput),
            borderTopRightRadius: hidden ? 0 : 5,
            borderBottomRightRadius: hidden ? 0 : 5
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!textVisible}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
          editable={!disabled}
          onFocus={onFocus}
          multiline={multiline}
        />
        {hidden && (
          <TouchableOpacity onPress={() => setTextVisible(!textVisible)} style={styles.hiddenButton}>
            <FontAwesome name={textVisible ? 'eye-slash' : 'eye'} size={20}/>
          </TouchableOpacity>
        )}
      </View>
    </InputWrapper>
  );
}
export { Input as TextInput };

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...styleUtils.input,
    flex: 1
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  hiddenButton: {
    padding: 10,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  }
});