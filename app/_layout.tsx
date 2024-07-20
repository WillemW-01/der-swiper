import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const DEV = __DEV__;

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="wordbank.sqlite"
      assetSource={{
        assetId: require("@/assets/db/wordbank.sqlite"),
        forceOverwrite: DEV,
      }}
      options={{ useNewConnection: DEV }}
    >
      <SafeAreaProvider>
        <StatusBar barStyle={"light-content"} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade_from_bottom",
            animationDuration: 500,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="gameScreen" />
          <Stack.Screen name="adjektive" />
          <Stack.Screen name="derDieDas" />
          <Stack.Screen name="habenSein" />
          <Stack.Screen name="nomAkkDat" />
        </Stack>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
