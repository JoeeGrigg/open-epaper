import { Text, View } from "react-native";
import { Header } from "ui";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Header
        title="Home"
        icon="plus"
        iconLink="/new"
        iconLeft="gear"
        iconLeftLink="/settings"
      />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
