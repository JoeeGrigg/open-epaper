import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export type TextInputProps = {
    label?: string,
    value?: string,
    description?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void,
    containerStyles?: object,
    hidden?: boolean,
    style?: object,
    onSubmitEditing?: () => void
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
  onSubmitEditing
}: TextInputProps) {
  let [textVisible, setTextVisible] = useState(!hidden);

  return (
    <View style={containerStyles}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={{
            ...styles.input,
            ...style,
            borderTopRightRadius: hidden ? 0 : 5,
            borderBottomRightRadius: hidden ? 0 : 5
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!textVisible}
          placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}
        />
        {hidden && (
          <TouchableOpacity onPress={() => setTextVisible(!textVisible)} style={styles.hiddenButton}>
            <FontAwesome name={textVisible ? 'eye-slash' : 'eye'} size={20}/>
          </TouchableOpacity>
        )}
      </View>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
}
export { Input as TextInput };

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 5
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    flex: 1,
    height: 50
  },
  hiddenButton: {
    padding: 10,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  description: {
    marginTop: 5
  }
});