import { Platform, Text, TouchableOpacity, ViewStyle } from "react-native";
import { WordArticle } from "@/types/word";

interface Props {
  title: string;
  onPress: (deck: string) => void;
  tier?: Tier;
  progress?: Progress;
  disabled?: boolean;
}

export type Tier = 0 | 1 | 2 | 3 | 4;
export type Progress = 0 | 1 | 2 | 3 | 4;

const tierColors = {
  0: "#219ebc",
  1: "#75C673",
  2: "#EE6676",
  3: "#ffb703",
  4: "#fb8500",
};

const borderWidth = 8;

const setBorder = (
  color: string,
  position: "Top" | "Left" | "Bottom" | "Right",
  tempBorder: ViewStyle
) => {
  tempBorder[`border${position}Width`] = borderWidth;
  tempBorder[`border${position}Color`] = color;
};

const getProgressBorder = (
  tier: Tier | null | undefined,
  progress: Progress | null | undefined
) => {
  if ((tier || tier == 0) && (progress || progress == 0)) {
    let progressBorder = {
      borderColor: tierColors[tier] + "50",
      borderWidth: borderWidth,
    } as ViewStyle;

    // prettier-ignore
    switch (progress) {
      // INTENTIONAL FALLTHROUGH
      case 0: break;
      case 4: setBorder(tierColors[tier], "Top", progressBorder);
      case 3: setBorder(tierColors[tier], "Left", progressBorder);
      case 2: setBorder(tierColors[tier], "Bottom", progressBorder);
      case 1: setBorder(tierColors[tier], "Right", progressBorder);
    }

    return progressBorder;
  } else {
    return {};
  }
};

export default function DeckCard({
  title,
  onPress,
  tier,
  progress,
  disabled = false,
}: Props) {
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
      disabled={disabled}
    >
      <Text style={{ fontSize: Platform.select({ ios: 18, android: 16 }) }}>{title}</Text>
    </TouchableOpacity>
  );
}
