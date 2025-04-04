import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

export type PaginatedListProps<T> = FlatListProps<T> & {};

export function PaginatedList<T>({
  data,
  renderItem,
  keyExtractor,
  ...rest
}: PaginatedListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...rest}
    />
  );
};
