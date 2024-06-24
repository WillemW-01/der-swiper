import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button } from "react-native";
import { Word } from "@/types/word";
import BackgroundGradient from "@/components/BackgroundGradient";
import { router, useLocalSearchParams } from "expo-router";
import DeckCard, { Progress, Tier } from "@/components/DeckCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataSchlafzimmer = require("@/assets/decks/schlafzimmer.json") as Word[];
const dataWohnzimmer = require("@/assets/decks/wohnzimmer.json") as Word[];
const dataBuro = require("@/assets/decks/buro.json") as Word[];
const dataGarten = require("@/assets/decks/garten.json") as Word[];
const dataSchule = require("@/assets/decks/schule.json") as Word[];
const dataBadezimmer = require("@/assets/decks/badezimmer.json") as Word[];
const dataKueche = require("@/assets/decks/kueche.json") as Word[];
const dataTest = require("@/assets/decks/test.json") as Word[];

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
  const [progresses, setProgresses] = useState<Progress[]>(
    Array(deckNames.length).fill(0)
  );
  const [tiers, setTiers] = useState<Tier[]>(Array(deckNames.length).fill(0));

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

  const loadProgresses = async () => {
    try {
      const result = await AsyncStorage.getItem("progresses");
      if (result) {
        console.log("Saved Progresses: ", result);
        return JSON.parse(result);
        // setProgresses(JSON.parse(result));
      } else {
        console.log("Couldn't load progresses");
        setProgresses([0, 0, 0, 0, 0, 0, 0, 0]);
      }
    } catch (err) {
      console.log("Couldn't find the key progresses");
    }
  };

  const loadTiers = async () => {
    try {
      const result = await AsyncStorage.getItem("tiers");
      if (result) {
        console.log("Saved Tiers: ", result);
        return JSON.parse(result);
        // setTiers(JSON.parse(result));
      } else {
        console.log("Couldn't load tiers");
        setTiers([0, 0, 0, 0, 0, 0, 0, 0]);
      }
    } catch (err) {
      console.log("Couldn't find the key tiers");
    }
  };

  const saveProgresses = async (progressData: Progress[]) => {
    try {
      console.log("Saving progresses: ", progressData);
      await AsyncStorage.setItem("progresses", JSON.stringify(progressData));
    } catch (err) {
      console.log("Couldn't save progresses");
    }
  };

  const saveTiers = async (tiersData: Tier[]) => {
    try {
      console.log("Saving tiers: ", tiersData);
      await AsyncStorage.setItem("tiers", JSON.stringify(tiersData));
    } catch (err) {
      console.log("Couldn't save tiers");
    }
  };

  const resetData = async () => {
    try {
      const emptyArray = Array(deckNames.length).fill(0);
      await AsyncStorage.setItem("progresses", JSON.stringify(emptyArray));
      await AsyncStorage.setItem("tiers", JSON.stringify(emptyArray));
      setProgresses(emptyArray);
      setTiers(emptyArray);
    } catch (err) {
      console.log("Couldn't reset data");
    }
  };

  const updateData = async () => {
    const tempProgresses = await loadProgresses();
    const tempTiers = await loadTiers();

    if (amountCorrect && progress && title) {
      if (amountCorrect == progress) {
        const index = deckNames.indexOf(title as string);
        console.log("All correct!");

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
        }
      } else {
        console.log("Not all correct: ", amountCorrect, progress);
      }
    }

    setProgresses(tempProgresses);
    setTiers(tempTiers);
    await saveProgresses(tempProgresses);
    await saveTiers(tempTiers);
  };

  useEffect(() => {
    updateData();
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
        <Button title="Reset" onPress={resetData} />
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
