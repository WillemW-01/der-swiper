import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import DeckCard from "@/components/DeckCard";

import { useDatabase } from "@/hooks/useDatabase";

import { WordArticle } from "@/types/word";
import { DeckData } from "@/types/decks";

const shuffleArray = (array: WordArticle[]): WordArticle[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function DerDieDas() {
  const [deckNames, setDeckNames] = useState<DeckData[]>();

  const { title, allCorrect } = useLocalSearchParams();
  const dbMan = useDatabase();

  const toGameScreen = async (deck: DeckData) => {
    const deckWords = await dbMan.loadDeck(deck.id);
    console.log(`Loaded deck: `, deckWords);

    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(shuffleArray(deckWords)),
        title: deck.title,
        allCorrect: "false",
        gameMode: "derDieDas",
      },
    });
  };

  const updateData = async () => {
    const deckData = await dbMan.loadProgressData("derDieDas");

    if (allCorrect && title) {
      const lastTitle = title as string;
      const deck = deckData[deckData.findIndex((deck) => deck.title == lastTitle)];

      if (allCorrect) {
        console.log("All correct!");

        if (deck.tier == 4 && deck.progress == 4) {
          console.log("Max tier and progress!");
          return;
        } else {
          console.log(`Before tier: ${deck.tier}, progress: ${deck.progress}`);
          deck.progress += 1;
          if (deck.progress > 4) {
            deck.tier += deck.tier <= 3 ? 1 : 0;
            deck.progress = 0;
            console.log(`After tier: ${deck.tier}, progress: ${deck.progress}`);
          }
          console.log("Updating deck: ", deck);
          await dbMan.updateDeck(deck);
        }
      } else {
        console.log("Not all correct: ", allCorrect);
      }
    }

    setDeckNames(deckData);
  };

  useEffect(() => {
    updateData();
  }, []);

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
