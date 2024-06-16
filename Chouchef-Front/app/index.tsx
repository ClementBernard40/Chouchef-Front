// Index.tsx
import React, { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "../authContext";
import SplashScreen from "@/components/SplashScreen";
import HomeScreen from "@/components/HomeScreen";
import LoginScreen from "@/components/LoginScreen";
import RegisterScreen from "@/components/RegisterScreen";
import MealScreen from "@/components/MealScreen";
import ListScreen from "@/components/ListScreen";

import { RootStackParamList } from "../types"; // Importer les types
// Rest of the import statements

const loadFonts = async () => {
  await Font.loadAsync({
    ARCO: require("../assets/fonts/ARCO.ttf"),
    Rubik: require("../assets/fonts/Rubik-Regular.ttf"),
  });
};
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadAllFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }
    loadAllFonts();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="MealScreen" component={MealScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
    </Stack.Navigator>
  );
};

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAllFonts();
    console.log(fontsLoaded);
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
