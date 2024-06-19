import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import TinderCard from "react-tinder-card";
import { LinearGradient } from "expo-linear-gradient";

const words = [
  { english: "Man", article: "der", singular: "Man", plural: "Die Männe" },
  { english: "Hand", article: "die", singular: "Hand", plural: "Die Händ" },
  { english: "Day", article: "der", singular: "Tag", plural: "Die Tage" },
  { english: "Way", article: "der", singular: "Weg", plural: "Die Weg" },
  { english: "Eye", article: "das", singular: "Auge", plural: "Die Auge" },
  { english: "Thing", article: "das", singular: "Ding", plural: "Die Ding" },
  { english: "Head", article: "der", singular: "Kopf", plural: "Die Köpf" },
  { english: "Year", article: "das", singular: "Jahr", plural: "Die Jahr" },
  { english: "Room", article: "die", singular: "Raum", plural: "Die Räume" },
] as Word[];

const switchTable = {
  left: "der",
  right: "die",
  up: "das",
  down: "error",
};

type Direction = "left" | "right" | "up" | "down";

interface Word {
  english: string;
  article: string;
  singular: string;
  plural: string;
}

const directionToArticle = (direction: Direction): string => {
  return switchTable[`${direction}`];
};

export default function CardDeck() {
  const wordBank = words;
  const [lastDirection, setLastDirection] = useState("");
  const [showCards, setShowCards] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  const [animatedValue] = useState(new Animated.Value(0));

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["#0C011E", "#949D6A", "#0C011E", "red"],
  });

  const animateFromTo = (from: number, to: number) => {
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
  };

  const flashColor = (color: "correct" | "incorrect") => {
    const index = color === "correct" ? 1 : 3;
    animateFromTo(index - 1, index);
  };

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
      <LinearGradient
        style={styles.der}
        colors={["#cb904d", "transparent"]}
        start={[0.1, 0.5]}
        end={[1, 0.5]}
      />
      <LinearGradient
        style={styles.die}
        colors={["#BB5084", "transparent"]}
        start={[1, 0.5]}
        end={[0, 0.5]}
      />
      <LinearGradient
        style={styles.das}
        colors={["#51a3a3", "transparent"]}
        start={[0.5, 0.1]}
        end={[0.5, 1]}
      />
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
            {showCards && (
              <View style={styles.cardContainer}>
                {wordBank.map((word) => (
                  <TinderCard
                    key={word.singular}
                    onSwipe={(dir) => swiped(dir, word)}
                    onCardLeftScreen={() => outOfFrame(word.singular)}
                    onSwipeRequirementFulfilled={(direction: string) =>
                      console.log("Fulfilled, " + direction)
                    }
                    swipeRequirementType="position"
                    preventSwipe={["down"]}
                  >
                    <View style={styles.card}>
                      <Text style={styles.cardTitle}>{word.singular}</Text>
                      <Text style={styles.cardTitle}>( pl. {word.plural})</Text>
                    </View>
                  </TinderCard>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setShowCards(false)}
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
    // backgroundColor: "white",
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
    width: 250,
    height: 250,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 250,
    height: 250,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    color: "black",
    fontSize: 25,
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
    height: 60,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  der: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: "50%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  das: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
    paddingTop: 50,
    alignItems: "center",
  },
  die: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "50%",
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
