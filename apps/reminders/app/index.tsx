import { useState } from 'react';
import { View } from 'react-native';
import { ButtonModal, Header } from 'ui';
import { router } from 'expo-router';

export default function Index() {
  const [list, setList] = useState<string | null>(null);
  const [listsVisible, setListsVisible] = useState(false);

  const optionButtons = [
    { text: 'All', onPress: () => setList('all') },
    { text: 'Today', onPress: () => setList('today') },
    { text: 'This Week', onPress: () => setList('thisWeek') },
    { text: 'This Month', onPress: () => setList('thisMonth') },
  ];

  return (
    <View
      style={{ flex: 1 }}
    >
      <Header
        title={list || 'Reminders'}
        icon="plus"
        iconOnPress={() => router.push('/add')}
        iconLeft="bars"
        iconLeftOnPress={() => setListsVisible(true)}
      />
      <ButtonModal buttons={optionButtons} visible={listsVisible} onRequestClose={() => setListsVisible(false)} />
    </View>
  );
}
