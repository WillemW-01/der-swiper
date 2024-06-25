import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";

const DEV = true;

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
      <StatusBar barStyle={"light-content"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="gameScreen" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
