import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";
import ListScreen from "./ListScreen";
import ProfileScreen from "./ProfileScreen";
import HomeProfile from "./HomeProfile";
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut();
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Liste" component={ListScreen} />
        <Tab.Screen name="HomeProfil" component={HomeProfile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;
