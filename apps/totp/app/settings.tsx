import { View } from 'react-native';
import { Header } from 'ui';

export default function () {
  return (
    <View>
      <Header title="Settings" iconLeft="chevron-left" iconLeftLink="/" />
    </View>
  );
}