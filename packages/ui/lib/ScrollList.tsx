import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

export type ScrollListProps<T> = {
  items: T[],
  renderItem: (item: T) => React.ReactNode,
  keyExtractor: (item: T) => string,
  gap?: number,
};

export function ScrollList<T>({
  items,
  renderItem,
  keyExtractor,
  gap = 0,
}: ScrollListProps<T>) {
  let containerHeight = useRef(0);
  let itemHeights = useRef<[number, number][]>([]);
  let pages = useRef<number[][]>([]);
  let [pagesCalculated, setPagesCalculated] = useState(false);
  let [pageIndex, setPageIndex] = useState(0);

  const calculatePages = () => {
    if (pagesCalculated) return;
    let currentPageHeight = gap;
    pages.current = [];
    let currentPage = [];

    for (let i = 0; i < itemHeights.current.length; i++) {
      const [index, height] = itemHeights.current[i];;
      const newHeight = currentPageHeight + height + gap;
      if (newHeight > containerHeight.current) {
        pages.current.push(Object.assign([], currentPage));
        currentPageHeight = height + gap;
        currentPage = [];
        currentPage.push(index);
      } else {
        currentPageHeight = newHeight;
        currentPage.push(index);
      }
    }

    pages.current.push(Object.assign([], currentPage));
    setPagesCalculated(true);
    console.log(pages.current);
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        containerHeight.current = event.nativeEvent.layout.height;
      }}
    >
      {items.map((item, index) => {
        return (
          <View
            key={keyExtractor(item)}  
            style={styles.calculationItem}
            onLayout={(event) => {
              itemHeights.current.push([index, event.nativeEvent.layout.height]);
            }}
          >
            {renderItem?.(item)}
          </View>
        );
      })}
      <GestureRecognizer
        style={[styles.containerCover, { gap }]}
        onLayout={calculatePages}
        onSwipeUp={() => {
          setPageIndex((pageIndex) => {
            if (pageIndex >= pages.current.length - 1) return 0;
            return pageIndex + 1;
          });
        }}
        onSwipeDown={() => {
          setPageIndex((pageIndex) => {
            if (pageIndex <= 0) return pages.current.length - 1;
            return pageIndex - 1;
          });
        }}
      >
        {pagesCalculated && pages.current[pageIndex]?.map((itemIndex) => {
          return (
            <View key={itemIndex}>
              {renderItem?.(items[itemIndex])}
            </View>
          );
        })}
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calculationItem: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    opacity: 0
  },
  containerCover: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    opacity: 1,
    justifyContent: 'center',
  },
});