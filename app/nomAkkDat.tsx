import BackgroundGradient from "@/components/BackgroundGradient";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NomAkkDat() {
  return (
    <View style={styles.rootContainer}>
      <BackgroundGradient />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Der Die Das!</Text>
        <Text style={styles.paragraph}>
          This mode lets you choose whether a verb is akkusativ, dativ or both (wechsel)!
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          {/* {deckNames &&
            deckNames.map((deck) => {
              return (
                <DeckCard
                  key={deck.id}
                  title={deck.title}
                  onPress={() => toGameScreen(deck)}
                  tier={deck.tier}
                  progress={deck.progress}
                />
              );
            })}
          <DeckCard title="+" onPress={() => {}} /> */}
        </ScrollView>
        {/* <Button title="Reset" onPress={resetData} /> */}
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
});
