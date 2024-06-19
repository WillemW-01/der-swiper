import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Game() {
  const { deck, title } = useLocalSearchParams();

  console.log(deck, title);

  return (
    <SafeAreaView>
      <Text>Game</Text>
      <Text>{deck}</Text>
      <Text>{title}</Text>
    </SafeAreaView>
  );
}
