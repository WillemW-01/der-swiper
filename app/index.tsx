import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CardDeck, { Word } from "@/components/CardDeck";
import BackgroundGradient from "@/components/BackgroundGradient";
import { router } from "expo-router";

const database: { [key: string]: Word[] } = {
  Test: [
    { english: "Man", article: "der", singular: "Man", plural: "Die Männe" },
    { english: "Hand", article: "die", singular: "Hand", plural: "Die Händ" },
    { english: "Day", article: "der", singular: "Tag", plural: "Die Tage" },
    { english: "Way", article: "der", singular: "Weg", plural: "Die Weg" },
  ],
  "Lektion 10": [
    { english: "Eye", article: "das", singular: "Auge", plural: "Die Auge" },
    { english: "Thing", article: "das", singular: "Ding", plural: "Die Ding" },
    { english: "Head", article: "der", singular: "Kopf", plural: "Die Köpf" },
    { english: "Year", article: "das", singular: "Jahr", plural: "Die Jahr" },
  ],
  "Lektion 11": [
    { english: "Room", article: "die", singular: "Raum", plural: "Die Räume" },
    { english: "Man", article: "der", singular: "Man", plural: "Die Männe" },
    { english: "Hand", article: "die", singular: "Hand", plural: "Die Händ" },
    { english: "Day", article: "der", singular: "Tag", plural: "Die Tage" },
  ],
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
    <View style={{ flex: 1, backgroundColor: "#0C011E" }}>
      <BackgroundGradient />
      <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 35, color: "white" }}>Welcome to Der Swiper!</Text>
        <Text style={{ padding: 30, color: "white", fontSize: 20, textAlign: "center" }}>
          This game allows you to swipe nouns to classify them into either der, die or
          das. Choose from some of the word decks below.
        </Text>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {decks.map((deck) => {
            return (
              <TouchableOpacity
                key={deck}
                activeOpacity={0.8}
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "white",
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => toGameScreen(deck)}
              >
                <Text>{deck}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
