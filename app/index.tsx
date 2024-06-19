import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import CardDeck from "@/components/CardDeck";

export default function index() {
  const [hasReset, setHasReset] = useState(false);

  useEffect(() => {
    if (hasReset) {
      setHasReset(!hasReset);
    }
  }, [hasReset]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      {!hasReset && <CardDeck />}
    </View>
  );
}
