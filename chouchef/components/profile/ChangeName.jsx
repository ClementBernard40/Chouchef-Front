import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../authContext";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../axiosInstance";
import { useNavigation } from "@react-navigation/native";

export default function ChangeName({}) {
  const [name, setName] = useState("");
  const { userId } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setId(await AsyncStorage.getItem("userId"));
    };
    fetchData();
  }, [userId]);
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const ModifNom = async () => {
    if (name) {
      try {
        console.log(id);
        console.log(id);
        console.log(id);
        console.log(id);
        console.log(id);

        const response = await axiosInstance.put(`/users/${id}`, {
          name: name,
        });

        if (response.status === 200 || response.status === 203) {
          console.log("Nom mis à jour avec succès !");
          setName("");
          navigation.goBack();
          Toast.show({
            type: "success",
            text1: "Succès",
            text2: "Le nom a été mis à jour avec succès.",
          });
        } else {
          console.error("Échec de la mise à jour du nom.");
          Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Échec de la mise à jour du nom.",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du nom :", error);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Une erreur est survenue lors de la mise à jour du nom.",
        });
      }
    } else {
      setError("Veuillez rentrer un nom");
    }
  };

  const returnBack = () => {
    navigation.goBack();
  };
  const fleche = require("../../assets/images/arrow.png");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row items-center mt-10">
        <TouchableOpacity onPress={returnBack}>
          <Image
            source={fleche}
            className="w-[20px] m-8 items-center"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TextInput
          className="text-2xl text-center text-deep-green font-rubikBold"
          placeholder="Modifier mon prénom"
          placeholderTextColor="#103B00"
          editable={false}
          style={{ flex: 1, marginLeft: -20 }} // Ajuster le marginLeft selon vos besoins
        />
      </View>

      <View className="items-center justify-center">
        <View className="border border-deep-green rounded-full mb-10 w-80 mt-10">
          <TextInput
            className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
            placeholder="Nom"
            placeholderTextColor="#103B00"
            value={name}
            onChangeText={setName}
          />
        </View>
        {error ? <Text className="text-red-500 mb-5">{error}</Text> : null}
        <TouchableOpacity onPress={ModifNom} className="mt-15">
          <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] items-center ">
            <Text className="text-white text-lg font-rubikBold">Valider</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Toast />
    </SafeAreaView>
  );
}
