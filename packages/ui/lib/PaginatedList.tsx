import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';

export type PaginatedListProps<T> = {
  items: T[],
  renderItem: (item: T) => React.ReactNode,
  keyExtractor: (item: T) => string,
};

export function PaginatedList<T>({
  items,
  renderItem,
  keyExtractor,
}: PaginatedListProps<T>) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const changePage = (direction: number) => {
    setPage(page + direction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {items.map((item) => (
          <View key={keyExtractor(item)}>
            {renderItem(item)}
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Button
          icon="chevron-left"
          iconStyle={{paddingTop: 2, paddingRight: 7}}
          disabled={page < 1}
          onPress={() => changePage(-1)}
        />
        <Button
          icon="chevron-right"
          iconStyle={{paddingTop: 2, paddingLeft: 8}}
          disabled={page >= Math.floor(items.length / itemsPerPage)}
          onPress={() => changePage(1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
  },
  list: {
    flex: 1,
    backgroundColor: 'blue',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
