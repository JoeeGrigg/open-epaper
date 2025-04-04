import { Text, View } from 'react-native';
import { Header, PaginatedList } from 'ui';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Index() {
  const [items, setItems] = useState<{ id: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      setItems([
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
      ]);
    }, [])
  );

  return (
    <View>
      <Header
        title="Home"
        icon="plus"
        iconLink="/new"
        iconLeft="gear"
        iconLeftLink="/settings"
      />
      <PaginatedList
        data={items}
        renderItem={({ item }) => <Text>{item.id}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
