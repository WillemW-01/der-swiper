import React, { useEffect, useState } from "react";
import {
  Switch,
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
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
      <StatusBar barStyle={"light-content"} />
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
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
