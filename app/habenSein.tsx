import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import DeckCard from "@/components/DeckCard";

import { useDatabase } from "@/hooks/useDatabase";
import { useGameCompletion } from "@/hooks/useGameCompletion";

import { DeckData } from "@/types/decks";
import { getRandomPerson } from "@/constants/Conjugations";

export default function HabenSein() {
  const { updateData, deckNames } = useGameCompletion("habenSein");
  const navigation = useNavigation();
  const dbMan = useDatabase("habenSein");

  const toGameScreen = async (deck: DeckData) => {
    const deckWords = await dbMan.loadDeck(deck.id, true);
    // const deckWords = [] as WordArticle[];
    console.log(`Loaded deck: `, deckWords);

    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(deckWords),
        title: deck.title,
        allCorrect: "false",
        gameMode: "habenSein",
        person: getRandomPerson(),
      },
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      console.log("Screen is focused!");
      updateData();
    });

    return () => {
      unsub();
    };
  }, [navigation, updateData]);

  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Haben vs Sein</Text>
        <Text style={styles.paragraph}>
          This mode allows you to clasify verbs into either haben or sein. Remember
          "moving" or "state changing" verbs use sein!
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          {deckNames &&
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
            })}
        </ScrollView>
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
