import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Word } from "@/components/CardDeck";
import BackgroundGradient from "@/components/BackgroundGradient";
import { router } from "expo-router";
import DeckCard from "@/components/DeckCard";

const dataSchlafzimmer = require("@/assets/decks/schlafzimmer.json") as Word[];
const dataWohnzimmer = require("@/assets/decks/wohnzimmer.json") as Word[];
const dataBuro = require("@/assets/decks/buro.json") as Word[];
const dataGarten = require("@/assets/decks/garten.json") as Word[];
const dataSchule = require("@/assets/decks/schule.json") as Word[];
const dataBadezimmer = require("@/assets/decks/badezimmer.json") as Word[];
const dataKueche = require("@/assets/decks/kueche.json") as Word[];
const test = [
  { english: "Day", article: "der", singular: "Tag", plural: "die Tage" },
  { english: "Way", article: "der", singular: "Weg", plural: "die Weg" },
] as Word[];

// prettier-ignore
const database: { [key: string]: Word[] } = {
  Schlafzimmer: dataSchlafzimmer,
  Wohnzimmer: dataWohnzimmer,
  Burö: dataBuro,
  Garten: dataGarten,
  Schule: dataSchule,
  Badezimmer: dataBadezimmer,
  Küche: dataKueche,
  Test: test,
};

export default function index() {
  const decks = Object.keys(database);

  const toGameScreen = (key: string) => {
    router.navigate({
      pathname: "/gameScreen",
      params: { deck: JSON.stringify(database[key]), title: key },
    });
  };

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
          {decks.map((deck) => {
            return <DeckCard key={deck} title={deck} onPress={toGameScreen} />;
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
