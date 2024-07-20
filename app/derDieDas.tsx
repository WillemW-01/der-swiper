import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import DeckCard from "@/components/DeckCard";

import { useDatabase } from "@/hooks/useDatabase";
import { useGameCompletion } from "@/hooks/useGameCompletion";

import { DeckData } from "@/types/decks";

export default function DerDieDas() {
  const { updateData, deckNames } = useGameCompletion();
  const navigation = useNavigation();
  const dbMan = useDatabase();

  const toGameScreen = async (deck: DeckData) => {
    const deckWords = await dbMan.loadDeck(deck.id, true);
    console.log(`Loaded deck: `, deckWords);

    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(deckWords),
        title: deck.title,
        allCorrect: "false",
        gameMode: "derDieDas",
      },
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      console.log("Screen is focused!");
      updateData("derDieDas");
    });

    return () => {
      unsub();
    };
  }, [navigation, updateData]);

  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Der Die Das!</Text>
        <Text style={styles.paragraph}>
          This mode allows you to classify nouns into either der, die or das. Choose from
          some of the word decks below to get started.
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
          <DeckCard title="+" onPress={() => {}} />
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
    paddingBottom: 20,
  },
});
