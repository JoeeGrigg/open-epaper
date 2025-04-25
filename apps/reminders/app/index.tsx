import { useState } from 'react';
import { View } from 'react-native';
import { Header } from 'ui';

export default function Index() {
  const [list, setList] = useState<string | null>(null);

  return (
    <View
      style={{ flex: 1 }}
    >
      <Header
        title={list || 'Reminders'}
        icon="plus"
        iconLeft="bars"
      />
    </View>
  );
}
