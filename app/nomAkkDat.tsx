import BackgroundGradient from "@/components/BackgroundGradient";
import ThemedButton from "@/components/ThemedButton";
import { WordArticle } from "@/types/word";
import { router } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NomAkkDat() {
  const toGameScreen = async () => {
    // const deckWords = await dbMan.loadDeck(deck.id);
    const deckWords = [] as WordArticle[];
    console.log(`Loaded deck: `, deckWords);

    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(deckWords),
        title: "test",
        allCorrect: "false",
        gameMode: "nomAkkDat",
      },
    });
  };

  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Akkusativ vs Dativ Verben!</Text>
        <Text style={styles.paragraph}>
          This mode lets you choose whether a verb is akkusativ, dativ or both (wechsel)!
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          {/* {deckNames &&
            deckNames.map((deck) => {
              return (
                <DeckCard
                  key={deck.id}
                  title={deck.title}
                  onPress={() => toGameScreen(deck)}
                  tier={deck.tier}
                  progress={deck.progress}
                />
              );
            })}*/}
        </ScrollView>
        <ThemedButton title="Start" onPress={toGameScreen} absoluteBottom />
        {/* <Button title="Reset" onPress={resetData} /> */}
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
