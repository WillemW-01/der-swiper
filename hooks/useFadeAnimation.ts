import { useState } from "react";
import { Animated } from "react-native";

export const useFadeAnimation = () => {
  const [fadeInAndOutAnim] = useState(new Animated.Value(0));
  const [fadeInAnim] = useState(new Animated.Value(0));
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [hasFaded, setHasFaded] = useState(false);

  const fadeInAndOut = () => {
    Animated.sequence([
      Animated.timing(fadeInAndOutAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(fadeInAndOutAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeIn = (delay: number = 0) => {
    setIsFadingIn(true);
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFadingIn(false);
      setHasFaded(true);
    });
  };

  const fadeOut = () => {
    Animated.timing(fadeInAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return {
    fadeInAndOutAnim,
    fadeInAndOut,
    fadeInAnim,
    fadeIn,
    fadeOut,
    isFadingIn,
    setIsFadingIn,
    hasFaded,
    setHasFaded,
  };
};
