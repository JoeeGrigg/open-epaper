import { View, StyleSheet } from 'react-native';
import { Header, PaginatedList } from 'ui';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Index() {
  const [items, setItems] = useState<{ id: string, text?: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      setItems([
        { id: '1' },
        { id: '2', text: 'Hello This is a long text and I wonder what will hapen when it gets too long to fit on the sreen' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
      ]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        icon="plus"
        iconLink="/new"
        iconLeft="gear"
        iconLeftLink="/settings"
      />
      <PaginatedList
        items={items}
        textExtractor={(item) => item.text || item.id}
        keyExtractor={(item) => item.id}
        linkExtractor={(item) => `/code/${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
