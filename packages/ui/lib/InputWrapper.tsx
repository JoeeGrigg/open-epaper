import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles as styleUtils } from "../utils/styles";

export type InputWrapperProps = {
  label?: string,
  description?: string,
  containerStyles?: object, 
  children: React.ReactNode
}

export function InputWrapper({
    children,
    label,
    description,
    containerStyles
}: InputWrapperProps) {
  return (
    <View style={containerStyles}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...styleUtils.label
  },
  description: {
    ...styleUtils.description
  }
});
