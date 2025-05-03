import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles as styleUtils } from '../utils/styles';
import { format } from 'date-fns';
import { InputWrapper, InputWrapperProps } from './InputWrapper';

const emptyDate = '...';
const dateFormat = 'yyyy-MM-dd';
const timeFormat = 'HH:mm:ss';

export type DateTimeInputProps = Omit<InputWrapperProps, 'children'> & {
  value?: Date | null,
  onChange?: (date: Date | null) => void,
}

export function DateTimeInput({
  label,
  description,
  value = null,
  onChange
}: DateTimeInputProps) {
  const [date, setDate] = useState<Date | null>(value);

  useEffect(() => { onChange?.(date); }, [date]);

  const setNow = () => setDate(new Date());

  return (
    <InputWrapper label={label} description={description}>
      <TouchableOpacity style={styles.container} onPress={setNow}>
        <Text style={[styles.input, styles.inputDate]}>{date ? format(date, dateFormat) : emptyDate}</Text>
        <View style={styles.separator} />
        <Text style={[styles.input, styles.inputTime]}>{date ? format(date, timeFormat) : emptyDate}</Text>
      </TouchableOpacity>
    </InputWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    ...styleUtils.input,
    flex: 1,
    textAlign: 'center'
  },
  inputDate: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  inputTime: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  separator: {
    height: '100%',
    backgroundColor: styleUtils.input.borderColor,
    width: styleUtils.input.borderWidth
  }
});