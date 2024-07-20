import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import TinderCard from "react-tinder-card";
import { WordArticle, WordVerb, isWordArticle } from "@/types/word";
import { useState } from "react";
import { Direction } from "@/app/gameScreen";

interface Props {
  word: WordArticle | WordVerb;
  swiped: (direction: Direction, target: string) => void;
  outOfFrame?: (word: string) => void;
}

const seinToText = (usesSein: boolean) => {
  return usesSein ? "sein" : "haben";
};

export default function WordCard({ word, swiped }: Props) {
  const [showEnglish, setShowEnglish] = useState(false);
  const isArticle = isWordArticle(word);
  const presentedWord = isArticle ? word.singular : word.perfectForm;
  const preventedDirections = isArticle ? ["down"] : ["up", "down"];
  const target = isArticle ? word.article : seinToText(word.usesSein);

  return (
    <TinderCard
      key={isArticle ? word.singular : word.verb}
      onSwipe={(dir) => swiped(dir, target)}
      swipeRequirementType="position"
      preventSwipe={preventedDirections}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onLongPress={() => setShowEnglish((prev) => !prev)}
      >
        <Text style={styles.cardTitle}>
          {!showEnglish ? presentedWord : word.english}
        </Text>
        <Text style={styles.cardTitle}>
          {isArticle ? `(pl.  ${word.plural})` : `(inf. ${word.verb})`}
        </Text>
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
    fontSize: Platform.select({ ios: 25, android: 20 }),
  },
});
