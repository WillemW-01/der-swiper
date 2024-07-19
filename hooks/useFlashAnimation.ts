import { useState, useCallback } from "react";
import { Animated } from "react-native";

export const useFlashAnimation = () => {
  const [flashAnim] = useState(new Animated.Value(0));

  const interpolateColor = flashAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["#0C011E", "#949D6A", "#0C011E", "red"],
  });

  const animateFromTo = useCallback(
    (from: number, to: number) => {
      flashAnim.setValue(from);
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: to,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: from,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    },
    [flashAnim]
  );

  const flashColor = useCallback(
    (color: "correct" | "incorrect") => {
      const index = color === "correct" ? 1 : 3;
      animateFromTo(index - 1, index);
    },
    [animateFromTo]
  );

  return { interpolateColor, flashColor };
};

// StyleSheet.create({})
