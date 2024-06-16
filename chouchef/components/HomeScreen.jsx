import React from "react";
import { SafeAreaView, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeProfile from "./profile/HomeProfile";
import HomeList from "./liste/HomeList";

const ListIconSelected = require("../assets/images/Listesicon.png");
const ListIconNotSelected = require("../assets/images/Listesicon2.png");

const ProfileIconNotSelected = require("../assets/images/Profileicon.png");
const ProfileIconSelected = require("../assets/images/Profilelist2.png");

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Liste") {
              iconSource = focused ? ListIconSelected : ListIconNotSelected;
            } else if (route.name === "Profil") {
              iconSource = focused
                ? ProfileIconSelected
                : ProfileIconNotSelected;
            }

            return (
              <Image
                source={iconSource}
                style={{ width: 24, height: 24 }} // Ajustez la taille de l'icône selon vos besoins
              />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#103B00",
            borderTopWidth: 0,
            elevation: 10, // Pour Android
            shadowOpacity: 0.1, // Pour iOS
            shadowRadius: 10, // Pour iOS
            shadowOffset: { width: 0, height: 0 }, // Pour iOS
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Liste" component={HomeList} />
        <Tab.Screen name="Profil" component={HomeProfile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;
