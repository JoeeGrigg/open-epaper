import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'ui';

export default function() {
  return (
    <View style={styles.container}>
      <Header
        title="Code"
        icon="trash"
        iconLeft="chevron-left"
        iconLeftLink="/"
      />
      <Text>Code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});