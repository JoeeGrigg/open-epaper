import { View, StyleSheet } from 'react-native';
import { Header, TextInput } from 'ui';

export default function () {
  return (
    <View style={styles.container}>
      <Header title="Settings" iconLeft="chevron-left" iconLeftLink="/" />
      <View style={styles.form}>
        <TextInput label="Name" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    flex: 1,
    padding: 20,
  },
});
