import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Word } from "@/components/CardDeck";
import BackgroundGradient from "@/components/BackgroundGradient";
import { router } from "expo-router";
import DeckCard from "@/components/DeckCard";

// prettier-ignore
const database: { [key: string]: Word[] } = {
  Test: [
    { english: "Day", article: "der", singular: "Tag", plural: "die Tage" },
    { english: "Way", article: "der", singular: "Weg", plural: "die Weg" },
  ],
  "Badezimmer": [
    { english: "Towel", article: "das", singular: "Handtuch", plural: "Handtücher" },
    { english: "Soap", article: "die", singular: "Seife", plural: "Seifen" },
    { english: "Toothbrush", article: "die", singular: "Zahnbürste", plural: "Zahnbürsten" },
    { english: "Toothpaste", article: "die", singular: "Zahnpasta", plural: "Zahnpasten" },
    { english: "Shampoo", article: "das", singular: "Shampoo", plural: "Shampoos" },
    { english: "Sink", article: "das", singular: "Waschbecken", plural: "Waschbecken" },
    { english: "Shower", article: "die", singular: "Dusche", plural: "Duschen" },
    { english: "Mirror", article: "der", singular: "Spiegel", plural: "Spiegel" },
    { english: "Toilet", article: "die", singular: "Toilette", plural: "Toiletten" },
    { english: "Bathtub", article: "die", singular: "Badewanne", plural: "Badewannen" }
  ],
  
  "Küche": [
    { english: "Knife", article: "das", singular: "Messer", plural: "Messer" },
    { english: "Fork", article: "die", singular: "Gabel", plural: "Gabeln" },
    { english: "Spoon", article: "der", singular: "Löffel", plural: "Löffel" },
    { english: "Plate", article: "der", singular: "Teller", plural: "Teller" },
    { english: "Cup", article: "die", singular: "Tasse", plural: "Tassen" },
    { english: "Glass", article: "das", singular: "Glas", plural: "Gläser" },
    { english: "Pan", article: "die", singular: "Pfanne", plural: "Pfannen" },
    { english: "Pot", article: "der", singular: "Topf", plural: "Töpfe" },
    { english: "Fridge", article: "der", singular: "Kühlschrank", plural: "Kühlschränke" },
    { english: "Oven", article: "der", singular: "Ofen", plural: "Öfen" },
    { english: "Microwave", article: "die", singular: "Mikrowelle", plural: "Mikrowellen" },
    { english: "Sink", article: "das", singular: "Spülbecken", plural: "Spülbecken" },
    { english: "Stove", article: "der", singular: "Herd", plural: "Herde" }
  ],
  "Schalfzimmer": [
    { english: "Bed", article: "das", singular: "Bett", plural: "Betten" },
    { english: "Pillow", article: "das", singular: "Kissen", plural: "Kissen" },
    { english: "Blanket", article: "die", singular: "Decke", plural: "Decken" },
    { english: "Wardrobe", article: "der", singular: "Kleiderschrank", plural: "Kleiderschränke" },
    { english: "Dresser", article: "die", singular: "Kommode", plural: "Kommoden" },
    { english: "Nightstand", article: "der", singular: "Nachttisch", plural: "Nachttische" },
    { english: "Lamp", article: "die", singular: "Lampe", plural: "Lampen" },
    { english: "Curtain", article: "der", singular: "Vorhang", plural: "Vorhänge" },
    { english: "Mirror", article: "der", singular: "Spiegel", plural: "Spiegel" },
    { english: "Carpet", article: "der", singular: "Teppich", plural: "Teppiche" }
  ]
  
  
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
