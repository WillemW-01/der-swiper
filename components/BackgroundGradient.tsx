import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function BackgroundGradient() {
  return (
    <>
      <LinearGradient
        style={styles.der}
        colors={["#cb904d", "transparent"]}
        start={[0.1, 0.5]}
        end={[1, 0.5]}
      />
      <LinearGradient
        style={styles.die}
        colors={["#BB5084", "transparent"]}
        start={[1, 0.5]}
        end={[0, 0.5]}
      />
      <LinearGradient
        style={styles.das}
        colors={["#51a3a3", "transparent"]}
        start={[0.5, 0.1]}
        end={[0.5, 1]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  der: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: "50%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  das: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
    paddingTop: 50,
    alignItems: "center",
  },
  die: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "50%",
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
