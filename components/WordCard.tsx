import { View, Text, StyleSheet } from "react-native";
import TinderCard from "react-tinder-card";
import { Word } from "@/types/word";

interface Props {
  word: Word;
  swiped: (direction: Direction, word: Word) => void;
  outOfFrame: (word: string) => void;
}

type Direction = "left" | "right" | "up" | "down";

export default function WordCard({ word, swiped, outOfFrame }: Props) {
  return (
    <TinderCard
      key={word.singular}
      onSwipe={(dir) => swiped(dir, word)}
      onCardLeftScreen={() => outOfFrame(word.singular)}
      // onSwipeRequirementFulfilled={(direction: string) =>
      //   console.log("Fulfilled, " + direction)
      // }
      swipeRequirementType="position"
      preventSwipe={["down"]}
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{word.singular}</Text>
        <Text style={styles.cardTitle}>(pl. {word.plural})</Text>
      </View>
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
