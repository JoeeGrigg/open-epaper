import { View, StyleSheet } from 'react-native';
import { Header, TextInput, Button } from 'ui';
import { useState } from 'react';
import { addTotp } from '@/lib/storage';
import { router } from 'expo-router';

export default function () {
  let [name, setName] = useState('');
  let [secret, setSecret] = useState('');

  const save = async () => {
    await addTotp(name, secret);
    router.push('/');
  };
    
  return (
    <View style={{ flex: 1 }}>
      <Header title="New" iconLeft="chevron-left" iconLeftLink="/" />
      <View style={styles.page}>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          containerStyles={styles.inputContainer}
        />

        <TextInput
          label="Secret"
          value={secret}
          onChangeText={setSecret}
          containerStyles={styles.inputContainer}
        />

        <Button
          text="Save"
          onPress={save}
          disabled={name == '' || secret == ''}
          style={{ marginTop: 'auto' }}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flex: 1
  },
  inputContainer: {
    marginBottom: 20
  }
});