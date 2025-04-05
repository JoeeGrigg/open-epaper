import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { Button } from './Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const itemHeight = 50;

export type PaginatedListProps<T> = {
  items: T[],
  textExtractor: (item: T) => string,
  keyExtractor: (item: T) => string,
  linkExtractor?: (item: T) => LinkProps['href'],
  icon?: keyof typeof FontAwesome.glyphMap,
};

type ItemProps<T> = Pick<PaginatedListProps<T>, 'textExtractor' | 'icon'> & { item: T };

function Item<T>({ textExtractor, item, icon }: ItemProps<T>) {
  return (
    <View style={styles.item}>
      <Text
        style={styles.itemText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {textExtractor(item)}
      </Text>
      {icon && <FontAwesome name={icon} size={20} color="black" style={styles.icon} />}
    </View>
  );
}

export function PaginatedList<T>({
  items,
  textExtractor,
  keyExtractor,
  linkExtractor,
  icon,
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
        {pageItems.map((item) => (
          linkExtractor ? (
            <Link href={linkExtractor(item)} key={keyExtractor(item)}>
              <Item item={item} textExtractor={textExtractor} icon={icon} />
            </Link>
          ) : (
            <Item item={item} textExtractor={textExtractor} icon={icon} key={keyExtractor(item)} />
          )
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
  icon: {
    paddingTop: 5,
  },
});
