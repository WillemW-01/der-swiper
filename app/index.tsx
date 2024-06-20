import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button } from "react-native";
import { Word } from "@/components/CardDeck";
import BackgroundGradient from "@/components/BackgroundGradient";
import { router, useLocalSearchParams } from "expo-router";
import DeckCard, { Progress, Tier } from "@/components/DeckCard";

const dataSchlafzimmer = require("@/assets/decks/schlafzimmer.json") as Word[];
const dataWohnzimmer = require("@/assets/decks/wohnzimmer.json") as Word[];
const dataBuro = require("@/assets/decks/buro.json") as Word[];
const dataGarten = require("@/assets/decks/garten.json") as Word[];
const dataSchule = require("@/assets/decks/schule.json") as Word[];
const dataBadezimmer = require("@/assets/decks/badezimmer.json") as Word[];
const dataKueche = require("@/assets/decks/kueche.json") as Word[];

// prettier-ignore
const database: { [key: string]: Word[] } = {
  Schlafzimmer: dataSchlafzimmer,
  Wohnzimmer: dataWohnzimmer,
  Burö: dataBuro,
  Garten: dataGarten,
  Schule: dataSchule,
  Badezimmer: dataBadezimmer,
  Küche: dataKueche,
};

export default function index() {
  const deckNames = Object.keys(database);
  const [progresses, setProgresses] = useState<Progress[]>([3, 0, 2, 4, 1, 0, 3]);
  const [tiers, setTiers] = useState<Tier[]>([0, 1, 2, 3, 4, 0, 1]);

  const { deck, title, amountCorrect, progress } = useLocalSearchParams();

  const toGameScreen = (key: string) => {
    router.navigate({
      pathname: "/gameScreen",
      params: {
        deck: JSON.stringify(database[key]),
        title: key,
        amountCorrect: -1,
        progress: -1,
      },
    });
  };

  useEffect(() => {
    if (amountCorrect && progress && title) {
      if (amountCorrect == progress) {
        const index = deckNames.indexOf(title as string);
        console.log("All correct!");

        const tempProgresses = [...progresses];
        const tempTiers = [...tiers];

        if (tempTiers[index] == 4 && tempProgresses[index] == 4) {
          console.log("Max tier and progress!");
          return;
        } else {
          console.log("Before tier: ", tempTiers[index]);
          console.log("Before progress: ", tempProgresses[index]);
          tempProgresses[index] += 1;
          console.log("Updated progress: ", tempProgresses[index]);
          if (tempProgresses[index] > 4) {
            console.log("Bumping up tier!");
            tempTiers[index] += tempTiers[index] <= 3 ? 1 : 0;
            console.log("After tier: ", tempTiers[index]);
            tempProgresses[index] = 0;
            console.log("Updated progress: ", tempProgresses[index]);
          }

          setProgresses(tempProgresses);
          setTiers(tempTiers);
        }
      } else {
        console.log("Not all correct: ", amountCorrect, progress);
      }

      console.log("Amount correct:", amountCorrect, "Progress:", progress);
    }
  }, []);

  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Der Swiper!</Text>
        <Text style={styles.paragraph}>
          This game allows you to swipe nouns to classify them into either der, die or
          das. Choose from some of the word decks below.
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          {deckNames.map((deck, index) => {
            return (
              <DeckCard
                key={deck}
                title={deck}
                onPress={toGameScreen}
                tier={tiers[index]}
                progress={progresses[index]}
              />
            );
          })}
          <DeckCard title="+" onPress={() => {}} />
        </ScrollView>
        <Button title="Reset" onPress={() => {}} />
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
    padding: 20,
  },
  title: {
    fontSize: 35,
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
