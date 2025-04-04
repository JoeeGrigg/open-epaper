import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from './Button';

const itemHeight = 50;

export type PaginatedListProps<T> = {
  items: T[],
  textExtractor: (item: T) => string,
  keyExtractor: (item: T) => string,
};

export function PaginatedList<T>({
  items,
  textExtractor,
  keyExtractor,
}: PaginatedListProps<T>) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const [pageItems, setPageItems] = useState<T[]>([]);

  useEffect(() => {
    setItemsPerPage(Math.floor(listHeight / itemHeight));
    calculatePageItems();
  }, [listHeight]);

  const calculatePageItems = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPageItems(items.slice(start, end));
  };

  useEffect(() => { calculatePageItems(); }, [page, itemsPerPage]);

  const changePage = (direction: number) => {
    setPage(page + direction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list} onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setListHeight(height);
      }}>
        {pageItems.map((item, i) => (
          <TouchableOpacity key={keyExtractor(item)} style={styles.item} onPress={() => {
            console.log(item);
          }}>
            <Text
              style={styles.itemText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {textExtractor(item)}
            </Text>
            <Text>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Button
          icon="chevron-left"
          iconStyle={{paddingTop: 2, paddingRight: 7}}
          disabled={page <= 1}
          onPress={() => changePage(-1)}
        />
        <Button
          icon="chevron-right"
          iconStyle={{paddingTop: 2, paddingLeft: 8}}
          disabled={page >= Math.ceil(items.length / itemsPerPage)}
          onPress={() => changePage(1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
    overflow: 'hidden'
  },
  item: {
    height: itemHeight,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    marginRight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
