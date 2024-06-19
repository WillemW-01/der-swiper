import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";

import BackgroundGradient from "@/components/BackgroundGradient";
import WordCard from "@/components/WordCard";

const switchTable = {
  left: "der",
  right: "die",
  up: "das",
  down: "error",
};

type Direction = "left" | "right" | "up" | "down";

export interface Word {
  english: string;
  article: string;
  singular: string;
  plural: string;
}

const directionToArticle = (direction: Direction): string => {
  return switchTable[`${direction}`];
};

export default function CardDeck() {
  const { deck, title } = useLocalSearchParams() as { deck: string; title: string };
  const wordBank = JSON.parse(deck) as Word[];
  const [lastDirection, setLastDirection] = useState("");
  const [showCards, setShowCards] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  const [animatedValue] = useState(new Animated.Value(0));

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["#0C011E", "#949D6A", "#0C011E", "red"],
  });

  const animateFromTo = useCallback(
    (from: number, to: number) => {
      animatedValue.setValue(from);
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: to,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: from,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    },
    [animatedValue]
  );

  const flashColor = useCallback(
    (color: "correct" | "incorrect") => {
      const index = color === "correct" ? 1 : 3;
      animateFromTo(index - 1, index);
    },
    [animateFromTo]
  );

  const swiped = (direction: Direction, word: Word) => {
    const chosenArticle = directionToArticle(direction);
    console.log(`Chosen article: ${chosenArticle}, correct: ${word.article}`);
    setCurrentWord(word);

    if (chosenArticle === word.article) {
      flashColor("correct");
      setIsCorrect(true);
    } else {
      flashColor("incorrect");
      setIsCorrect(false);
    }

    setLastDirection(directionToArticle(direction));
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  useEffect(() => {
    if (!showCards) {
      setShowCards(true);
    }
  }, [showCards]);

  return (
    <Animated.View style={{ flex: 1, backgroundColor: interpolateColor }}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.areaLabel}>Das</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.areaLabel}>Der</Text>
          </View>
          <View style={styles.midContainer}>
            <View style={styles.infoContainer}>
              {lastDirection && (
                <Text style={styles.infoText}>Chosen: {lastDirection}</Text>
              )}
              {currentWord && (
                <Text style={styles.infoText}>Correct: {currentWord.article}</Text>
              )}
            </View>
            <View key={renderKey} style={styles.cardContainer}>
              {wordBank &&
                wordBank.map((word, index) => (
                  <WordCard
                    key={index}
                    word={word}
                    swiped={swiped}
                    outOfFrame={outOfFrame}
                  />
                ))}
            </View>
            <Text style={{ fontSize: 24, color: "#51a3a3", fontWeight: "bold" }}>
              {title} Deck
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setRenderKey((prev) => prev + 1)}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.areaLabel}>Die</Text>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  topContainer: {
    width: "100%",
    height: 60,
    alignItems: "center",
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 10,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    paddingLeft: 20,
  },
  midContainer: {
    flex: 5,
    height: "100%",
    alignItems: "center",
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    height: "100%",
    paddingRight: 20,
  },
  cardContainer: {
    width: 200,
    height: 200,
  },
  infoText: {
    justifyContent: "center",
    color: "white",
    fontSize: 35,
  },
  areaLabel: {
    fontSize: 35,
    color: "white",
  },
  resetButton: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
