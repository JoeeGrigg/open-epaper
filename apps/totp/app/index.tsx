import { View, StyleSheet } from 'react-native';
import { Header, PaginatedList } from 'ui';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TotpItemConfig, getConfig } from '@/lib/storage';

export default function Index() {
  // let [config, setConfig] = useState<StorageConfig>(defaultConfig);
  let [items, setItems] = useState<TotpItemConfig[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const config = await getConfig();
        setItems(Object.values(config.totps));
        // setConfig(config);
      };
      fetchData();
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
        textExtractor={(item) => item.name}
        keyExtractor={(item) => item.uuid}
        linkExtractor={(item) => `/code/${item.uuid}`}
        icon="chevron-right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
