import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as NavigationBar from "expo-navigation-bar";
// import { useEffect } from "react";

const DEV = false;

export default function RootLayout() {
  // async function changeNavigationBar() {
  //   if (Platform.OS == "android") {
  //     await NavigationBar.setBehaviorAsync("overlay-swipe");
  //     const behaviour = await NavigationBar.getBehaviorAsync();
  //     console.log(behaviour);
  //   }
  // }

  // useEffect(() => {
  //   changeNavigationBar();
  // }, []);

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
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
