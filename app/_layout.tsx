import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as NavigationBar from "expo-navigation-bar";
// import { useEffect } from "react";

const DEV = true;

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
