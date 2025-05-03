import { useState } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'ui';

export default function Index() {
  return (
    <View
      style={{ flex: 1 }}
    >
      <Header title="Template App" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello World</Text>
      </View>
    </View>
  );
}
