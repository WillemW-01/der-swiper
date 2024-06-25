import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TinderCard from "react-tinder-card";
import { Word } from "@/types/word";
import { useState } from "react";

interface Props {
  word: Word;
  swiped: (direction: Direction, word: Word) => void;
  outOfFrame?: (word: string) => void;
}

type Direction = "left" | "right" | "up" | "down";

export default function WordCard({ word, swiped, outOfFrame }: Props) {
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <TinderCard
      key={word.singular}
      onSwipe={(dir) => swiped(dir, word)}
      // onCardLeftScreen={() => outOfFrame(word.singular)}
      swipeRequirementType="position"
      preventSwipe={["down"]}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onLongPress={() => setShowEnglish((prev) => !prev)}
      >
        <Text style={styles.cardTitle}>
          {!showEnglish ? word.singular : word.english}
        </Text>
        <Text style={styles.cardTitle}>(pl. {word.plural})</Text>
      </TouchableOpacity>
    </TinderCard>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 200,
    height: 200,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: "black",
    fontSize: 25,
  },
});
