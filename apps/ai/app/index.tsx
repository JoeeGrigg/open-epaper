import { Text, View } from 'react-native';
import { ScrollList } from 'ui';

const items = Array.from({ length: 10 }, (_, i) => ({ id: i.toString(), height: Math.floor(Math.random() * 101) + 50 }));

const renderItem = (item: { id: string, height: number }) => {
  return (
    <View style={{
      height: item.height,
      backgroundColor: 'green',
    }}>
      <Text>{item.id} - {item.height}</Text>
    </View>
  );
};

export default function IndexView() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollList
        items={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        gap={10}
      />
    </View>
  );
}