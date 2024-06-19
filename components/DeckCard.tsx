import { Text, TouchableOpacity } from "react-native";
import { Word } from "@/types/word";

interface Props {
  title: string;
  onPress: (deck: string) => void;
}

export default function DeckCard({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: 150,
        height: 150,
        backgroundColor: "white",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => onPress(title)}
    >
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}
