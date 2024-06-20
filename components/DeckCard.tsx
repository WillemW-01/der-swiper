import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { Word } from "@/types/word";

interface Props {
  title: string;
  onPress: (deck: string) => void;
  tier?: Tier;
  progress?: Progress;
}

export type Tier = 0 | 1 | 2 | 3 | 4;
export type Progress = 0 | 1 | 2 | 3 | 4;

const tierColors = {
  0: "#219ebc",
  1: "#023047",
  2: "#d00000",
  3: "#ffb703",
  4: "#fb8500",
};

const borderWidth = 6;

const getProgressBorder = (
  tier: Tier | null | undefined,
  progress: Progress | null | undefined
) => {
  if ((tier || tier == 0) && (progress || progress == 0)) {
    let progressBorder = {
      borderColor: tierColors[tier],
    } as ViewStyle;

    // prettier-ignore
    switch (progress) {
      // INTENTIONAL FALLTHROUGH!
      case 0: break;
      case 4: progressBorder.borderTopWidth = borderWidth;
      case 3: progressBorder.borderLeftWidth = borderWidth;
      case 2: progressBorder.borderBottomWidth = borderWidth;
      case 1: progressBorder.borderRightWidth = borderWidth;
    }

    return progressBorder;
  } else {
    return {};
  }
};

export default function DeckCard({ title, onPress, tier, progress }: Props) {
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
        ...getProgressBorder(tier, progress),
      }}
      onPress={() => onPress(title)}
    >
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}
