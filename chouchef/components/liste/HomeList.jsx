import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ListScreen from "./ListScreen";
import CreateList from "./CreateList";
import IndicationPhoto from "./IndicationPhoto";
import AddAliment from "./AddAliment";
import DetailScreen from "./DetailScreen";

const HomeList = (navigation) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="CreateList" component={CreateList} />
      <Stack.Screen name="indicPhoto" component={IndicationPhoto} />
      <Stack.Screen name="AddAliment" component={AddAliment} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeList;
