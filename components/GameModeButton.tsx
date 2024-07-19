import { ColorValue, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface GameModeProps {
  name: string;
  route: string;
  shadowColor: ColorValue;
}

export default function GameModeButton({ name, route, shadowColor }: GameModeProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        width: 150,
        height: 150,
        backgroundColor: "white",
        borderRadius: 75,
        alignContent: "center",
        justifyContent: "center",
        shadowColor: shadowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        padding: 10,
        elevation: 10,
      }}
      onPress={() => router.navigate(route)}
    >
      <Text style={{ textAlign: "center", fontSize: 18, width: "100%" }}>{name}</Text>
    </TouchableOpacity>
  );
}
