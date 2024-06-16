// Index.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./authContext";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MealScreen from "./components/MealScreen";
import ListScreen from "./components/liste/ListScreen";
import { StatusBar, Text } from "react-native";

const loadFonts = async () => {
  await Font.loadAsync({
    ARCO: require("./assets/fonts/ARCO.ttf"),
    Rubik: require("./assets/fonts/Rubik-Regular.ttf"),
  });
};
const Stack = createStackNavigator();

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
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFE5" />
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
