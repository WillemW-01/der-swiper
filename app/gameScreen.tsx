import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import WordCard from "@/components/WordCard";
import ThemedButton from "@/components/ThemedButton";

import { useFadeAnimation } from "@/hooks/useFadeAnimation";
import { useFlashAnimation } from "@/hooks/useFlashAnimation";
import { table } from "@/constants/GameModeTables";

type Direction = "left" | "right" | "up" | "down";

export interface Word {
  english: string;
  article: string;
  singular: string;
  plural: string;
}

const formatLabel = (s: string) => {
  if (typeof s !== "string" || s === "error") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function GameScreenSwipe() {
  const { deck, title, gameMode } = useLocalSearchParams() as {
    deck: string;
    title: string;
    gameMode: keyof typeof table;
  };
  const wordBank = JSON.parse(deck) as Word[];
  const switchTable = table[gameMode] ?? table.derDieDas;

  const [showCards, setShowCards] = useState(true);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [progress, setProgress] = useState(0);
  const [amountCorrect, setAmountCorrect] = useState(0);

  const { interpolateColor, flashColor } = useFlashAnimation();
  const {
    fadeInAndOutAnim,
    fadeInAndOut,
    fadeInAnim,
    fadeIn,
    fadeOut,
    isFadingIn,
    setIsFadingIn,
    hasFaded,
    setHasFaded,
  } = useFadeAnimation();

  const translateDirection = (direction: Direction): string => {
    return switchTable[`${direction}`];
  };

  const handleSwipe = (direction: Direction, word: Word) => {
    const choice = translateDirection(direction);
    console.log(`Choice: ${choice}, correct: ${word.article}`);
    setCurrentWord(word);
    setProgress((prev) => prev + 1);

    if (choice === word.article) {
      flashColor("correct");
      setAmountCorrect((prev) => prev + 1);
    } else {
      flashColor("incorrect");
      fadeInAndOut();
    }
  };

  const finishRound = () => {
    console.log("Finishing!");
    router.navigate({
      pathname: `/${gameMode}`,
      params: {
        deck,
        title,
        allCorrect: String(amountCorrect == progress),
      },
    });
  };

  const resetCards = () => {
    if (!showCards) {
      setProgress(0);
      setAmountCorrect(0);
      setShowCards(true);
      setHasFaded(false);
      setIsFadingIn(false);
      fadeOut();
    }
  };

  useEffect(() => {
    if (progress == wordBank.length && !hasFaded && !isFadingIn) {
      fadeIn(1000);
    }
  });

  useEffect(() => {
    resetCards();
  }, [showCards]);

  return (
    <Animated.View style={{ flex: 1, backgroundColor: interpolateColor }}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.counterText}>{wordBank.length - progress}</Text>
          <Text style={{ ...styles.areaLabel, flex: 1, textAlign: "center" }}>
            {formatLabel(switchTable.up)}
          </Text>
          <Text style={styles.finishedText}>
            <Text style={{ color: "#e97d02" }}>{amountCorrect}</Text> |{" "}
            <Text style={{ color: "#da488f" }}>{progress - amountCorrect}</Text>
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.areaLabel} numberOfLines={1} ellipsizeMode="clip">
              {formatLabel(switchTable.left)}
            </Text>
          </View>
          <View style={styles.midContainer}>
            <Animated.View style={[styles.infoContainer, { opacity: fadeInAndOutAnim }]}>
              {currentWord && <Text style={styles.infoText}>{currentWord.article}</Text>}
            </Animated.View>

            <View style={styles.cardContainer}>
              {wordBank &&
                showCards &&
                wordBank.map((word, index) => (
                  <WordCard key={index} word={word} swiped={handleSwipe} />
                ))}
            </View>
            <Text style={{ fontSize: 24, color: "#51a3a3", fontWeight: "bold" }}>
              {title} Deck
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setShowCards(false)}
              disabled={isFadingIn}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.areaLabel}>{formatLabel(switchTable.right)}</Text>
          </View>
        </View>
        <Animated.View style={{ ...styles.doneButtonContainer, opacity: fadeInAnim }}>
          <ThemedButton title="Done" onPress={finishRound} />
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

const { width, height } = Dimensions.get("window");

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
    flexDirection: "row",
    paddingHorizontal: 20,
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
    flex: 3,
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
    fontSize: 45,
  },
  areaLabel: {
    fontSize: Platform.select({
      ios: 30,
      android: 22,
    }),
    color: "white",
  },
  resetButton: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  counterText: {
    fontSize: Platform.select({ ios: 25, android: 20 }),
    color: "#bebebe",
    width: 50,
  },
  finishedText: {
    fontSize: Platform.select({ ios: 25, android: 20 }),
    color: "#bebebe",
    width: 50,
    textAlign: "right",
  },
  doneButtonContainer: {
    position: "absolute",
    top: height / 2 - 25,
    left: width / 2 - 75,
  },
});
