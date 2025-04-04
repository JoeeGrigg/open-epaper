import { View } from 'react-native';
import { Header } from 'ui';

export default function () {
  return (
    <View>
      <Header title="New" iconLeft="chevron-left" iconLeftLink="/" />
    </View>
  );
}