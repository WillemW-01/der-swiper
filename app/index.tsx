import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/components/BackgroundGradient";
import GameModeButton from "@/components/GameModeButton";

export default function index() {
  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Der Swiper!</Text>
        <Text style={styles.paragraph}>
          Some parts of learning German can only be memorised. This game helps you to do
          that by swiping cards like in Tinder! Choose one of the game modes below.
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          <GameModeButton name="Der Die Das" route="/derDieDas" shadowColor={"#BB5084"} />
          <GameModeButton
            name="Haben vs Sein"
            route="habenSein"
            shadowColor={"#51a3a3"}
          />
          <GameModeButton
            name="Adjektive Deklination"
            route="adjektive"
            shadowColor={"#cb904d"}
          />
          <GameModeButton
            name="Akk vs Dat Verben"
            route="nomAkkDat"
            shadowColor={"#cb904d"}
          />
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
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  paragraph: {
    padding: 30,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  scrollContent: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
});
