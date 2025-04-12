import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button } from './Button';

export type ButtonModalProps = {
  buttons: {
    text: string;
    onPress: () => void;
  }[];
  visible: boolean;
  onRequestClose: () => void;
}

export function ButtonModal({
  visible,
  onRequestClose,
  buttons
}: ButtonModalProps) {
  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <View style={styles.optionsModal}>
        <View style={styles.content}>
          {buttons.map((button, index) => (
            <Button key={index} text={button.text} onPress={button.onPress} style={styles.button}/>
          ))}
        </View>
        <View style={styles.footer}>
          <Button text="Close" onPress={onRequestClose} style={styles.closeButton}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionsModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    margin: 10,
    padding: 10,
    gap: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  button: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    width: '100%',
    borderWidth: 0
  },
});