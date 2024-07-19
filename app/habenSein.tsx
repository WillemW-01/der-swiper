import BackgroundGradient from "@/components/BackgroundGradient";
import ThemedButton from "@/components/ThemedButton";
import { Word } from "@/types/word";
import { router } from "expo-router";
import { View, Text, ScrollView, StyleSheet, Button, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabenSein() {
  const toGameScreen = async () => {
    // const deckWords = await dbMan.loadDeck(deck.id);
    const deckWords = [] as Word[];
    console.log(`Loaded deck: `, deckWords);

    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(deckWords),
        title: "test",
        allCorrect: "false",
        gameMode: "habenSein",
      },
    });
  };

  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Haben vs Sein</Text>
        <Text style={styles.paragraph}>
          This mode allows you to clasify verbs into either haben or sein. Remember
          "moving" or "state changing" verbs use sein!
        </Text>
        <ThemedButton title="Start" onPress={toGameScreen} absoluteCenter />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#0C011E",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  paragraph: {
    padding: 30,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
});
