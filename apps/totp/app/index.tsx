import { View, StyleSheet, Text } from 'react-native';
import { Header, ScrollList } from 'ui';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TotpItemConfig, getConfig } from '@/lib/storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

const TotpItem = ({ item }: { item: TotpItemConfig }) => {
  return (
    <Link href={`/code/${item.uuid}`}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <FontAwesome name="chevron-right" size={20} color="black" />
      </View>
    </Link>
  );
};

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
      <View style={styles.list}>
        {items.length > 0 && (
          <ScrollList
            items={items}
            renderItem={(item) => <TotpItem item={item} />}
            keyExtractor={(item) => item.uuid}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%'
  },
  list: {
    flex: 1
  }
});
