import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ChangeName from "./ChangeName";
const HomeProfile = (navigation) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Profil" component={ProfileScreen} />
      <Stack.Screen name="ChangeName" component={ChangeName} />
    </Stack.Navigator>
  );
};

export default HomeProfile;
