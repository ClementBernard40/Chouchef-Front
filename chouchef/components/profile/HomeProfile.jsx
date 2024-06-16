import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ChangeName from "./ChangeName";
import ChangeMail from "./ChangeMail";
import ChangePassword from "./ChangePassword";

export default function HomeProfile(navigation) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ProfilScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfilScreen" component={ProfileScreen} />
      <Stack.Screen name="ChangeName" component={ChangeName} />
      <Stack.Screen name="ChangeMail" component={ChangeMail} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
