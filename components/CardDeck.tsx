import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TinderCard from "react-tinder-card";
import { LinearGradient } from "expo-linear-gradient";

const db = [
  { name: "Richard Hendricks" },
  { name: "Erlich Bachman" },
  { name: "Monica Hall" },
  { name: "Jared Dunn" },
  { name: "Dinesh Chugtai" },
];

const directionToArticle = (direction: string): string => {
  if (direction === "left") {
    return "der";
  } else if (direction === "right") {
    return "die";
  } else if (direction === "up") {
    return "das";
  } else {
    return "";
  }
};

export default function CardDeck() {
  const characters = db;
  const [lastDirection, setLastDirection] = useState("");

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(directionToArticle(direction));
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.der}
        colors={["green", "transparent"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
        <Text style={styles.areaLabel}>Der</Text>
      </LinearGradient>
      <LinearGradient
        style={styles.die}
        colors={["red", "transparent"]}
        start={[1, 0.5]}
        end={[0, 0.5]}
      >
        <Text style={styles.areaLabel}>Die</Text>
      </LinearGradient>
      <LinearGradient
        style={styles.das}
        colors={["blue", "transparent"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
        <Text style={styles.areaLabel}>Das</Text>
      </LinearGradient>
      <View style={styles.cardContainer}>
        {characters.map((character) => (
          <TinderCard
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{character.name}</Text>
            </View>
          </TinderCard>
        ))}
      </View>

      {lastDirection ? (
        <Text style={styles.infoText}>You chose {lastDirection}</Text>
      ) : (
        <Text style={styles.infoText} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    position: "absolute",
    top: "60%",
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
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
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
    paddingTop: 20,
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
  areaLabel: {
    fontSize: 35,
    color: "white",
  },
});
