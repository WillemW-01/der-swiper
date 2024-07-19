import { TouchableOpacity, Text, ViewStyle, Dimensions, Platform } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  absoluteCenter?: boolean;
  absoluteBottom?: boolean;
}

export default function ThemedButton({
  title,
  onPress,
  absoluteCenter = false,
  absoluteBottom = false,
  style,
}: Props) {
  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#51A3A3",
          width: 150,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          ...style,
        },
        absoluteCenter && {
          position: "absolute",
          left: width / 2 - 75,
          top: height / 2 - 25,
        },
        absoluteBottom && {
          position: "absolute",
          left: width / 2 - 75,
          bottom: Platform.select({
            ios: 70,
            android: 45,
          }),
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{title}</Text>
    </TouchableOpacity>
  );
}
