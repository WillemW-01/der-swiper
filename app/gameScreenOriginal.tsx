import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import WordCard from "@/components/WordCard";
import ThemedButton from "@/components/ThemedButton";

import { useFadeAnimation } from "@/hooks/useFadeAnimation";
import { useFlashAnimation } from "@/hooks/useFlashAnimation";

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

  const handleSwipe = (direction: Direction, word: Word) => {
    const chosenArticle = directionToArticle(direction);
    console.log(`Chosen article: ${chosenArticle}, correct: ${word.article}`);
    setCurrentWord(word);
    setProgress((prev) => prev + 1);

    if (chosenArticle === word.article) {
      flashColor("correct");
      setAmountCorrect((prev) => prev + 1);
    } else {
      flashColor("incorrect");
      fadeInAndOut();
    }

    // setLastDirection(directionToArticle(direction));
  };

  const finishRound = () => {
    console.log("Finishing!");
    router.replace({
      pathname: "/derDieDas",
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
          <Text style={{ ...styles.areaLabel, flex: 1, textAlign: "center" }}>Das</Text>
          <Text style={styles.finishedText}>
            <Text style={{ color: "#e97d02" }}>{amountCorrect}</Text> |{" "}
            <Text style={{ color: "#da488f" }}>{progress - amountCorrect}</Text>
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.areaLabel}>Der</Text>
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
            <Text style={styles.areaLabel}>Die</Text>
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
    fontSize: 45,
  },
  areaLabel: {
    fontSize: 30,
    color: "white",
  },
  resetButton: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  counterText: {
    fontSize: 25,
    color: "#bebebe",
    width: 50,
  },
  finishedText: {
    fontSize: 25,
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
