import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const fleche = require("../../assets/images/arrow.png");
const check = require("../../assets/images/check.png");
const menu = require("../../assets/images/menu.png");

const IndicationPhoto = ({ navigation }) => {
  const route = useRoute();
  const { nameList } = route.params;

  const handlephoto = () => {
    navigation.navigate("AddAliment", { nameList: nameList });
  };

  const returnBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <TouchableOpacity onPress={returnBack}>
          <Image
            source={fleche}
            className="w-[20px] p-4 mr-10 mt-2 mb-2 ml-8 items-center"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View className="items-center">
          <TextInput
            className="text-4xl text-center text-deep-green font-arco w-[70vw] mt-4"
            placeholder="Prennez en"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-4xl text-center text-deep-green font-arco w-[100vw]"
            placeholder="Photo le menu"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-4xl text-center text-deep-green font-arco w-[70vw]"
            placeholder="chouchef"
            placeholderTextColor="#103B00"
            editable={false}
          />
        </View>
        <View>
          <TextInput
            className="text-2xl text-center text-deep-green font-rubikBold w-[100vw] mt-8"
            placeholder="Assurez vous que :"
            placeholderTextColor="#103B00"
            editable={false}
          />
        </View>
        <View className="flex flex-row items-center justify-center mt-2">
          <Image
            source={check}
            className="w-[13px] mr-2" // Adjust the height to maintain aspect ratio
            resizeMode="contain"
          />
          <TextInput
            className="text-lg text-center text-deep-green font-rubik"
            placeholder="La photo soit nette"
            placeholderTextColor="#103B00"
            editable={false}
          />
        </View>
        <View className="flex flex-row items-center justify-center mt-2">
          <Image
            source={check}
            className="w-[13px] mr-2" // Adjust the height to maintain aspect ratio
            resizeMode="contain"
          />
          <TextInput
            className="text-lg text-center text-deep-green font-rubik"
            placeholder="La photo soit de bonne qualité"
            placeholderTextColor="#103B00"
            editable={false}
          />
        </View>
        <View className="flex flex-row items-center justify-center mt-2">
          <Image
            source={check}
            className="w-[13px] mr-2" // Adjust the height to maintain aspect ratio
            resizeMode="contain"
          />
          <TextInput
            className="text-lg text-center text-deep-green font-rubik"
            placeholder="Tous les produits sont visibles"
            placeholderTextColor="#103B00"
            editable={false}
          />
        </View>
        <View className="items-center ">
          <Image source={menu} style={{ width: "90%" }} resizeMode="contain" />
        </View>
        <View className="items-center mb-8">
          <TouchableOpacity
            className="bg-deep-green rounded-[30px] py-3 px-12"
            onPress={handlephoto}
          >
            <Text className="text-white text-lg font-rubikBold">
              J'ai compris !
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndicationPhoto;
