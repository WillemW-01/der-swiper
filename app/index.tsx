import React, { useEffect, useState } from "react";
import { Switch, View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import CardDeck from "@/components/CardDeck";

export default function index() {
  const [hasReset, setHasReset] = useState(false);

  useEffect(() => {
    if (hasReset) {
      setHasReset(!hasReset);
    }
  }, [hasReset]);

  return (
    <SafeAreaView style={styles.container}>
      {!hasReset && <CardDeck />}
      <View style={styles.row}>
        <Button title="Reset" onPress={() => setHasReset(true)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
