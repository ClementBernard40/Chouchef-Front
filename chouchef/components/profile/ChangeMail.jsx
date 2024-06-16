import React, { useState, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function ChangeMail({}) {
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState("");
  const [confirmNewMail, setConfirmNewEmail] = useState("");
  const [newMail, setNewMail] = useState("");
  const [id, setId] = useState("");
  const { userId } = useAuth();
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [verifEmail, SetVerifEmail] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        console.log("Fetching user data for modification email");
        const response = await axiosInstance.get(`/users/${storedId}`);
        console.log(response.data);
        setUserEmail(response.data.email);
        console.log(response.data.email);
        setId(storedId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const ModifNom = async () => {
    try {
      const response2 = await axiosInstance.get(`/users/email/${newMail}`);
      console.log("Fetched user:", response2.data);
      setError("Nouveau email deja attribué à un compte");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si l'email n'est pas trouvé (404), continuez avec la mise à jour de l'email
        if (email && newMail) {
          if (userEmail === email) {
            if (confirmNewMail === newMail) {
              try {
                const response = await axiosInstance.put(`/users/${id}`, {
                  email: newMail,
                });

                if (response.status === 200 || response.status === 203) {
                  console.log("adresse email mise à jour avec succès !");
                  setEmail(newMail);
                  setUserEmail(newMail);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "ProfilScreen" }],
                  });
                  Toast.show({
                    type: "success",
                    text1: "Succès",
                    text2: "L'adresse email a été mise à jour avec succès.",
                  });
                } else {
                  console.error("Échec de la mise à jour de l'email.");
                  Toast.show({
                    type: "error",
                    text1: "Erreur",
                    text2: "Échec de la mise à jour de l'email.",
                  });
                }
              } catch (error) {
                console.error(
                  "Erreur lors de la mise à jour de l'email :",
                  error
                );
                Toast.show({
                  type: "error",
                  text1: "Erreur",
                  text2:
                    "Une erreur est survenue lors de la mise à jour de l'email.",
                });
              }
            } else {
              setError("Les nouveaux emails ne correspondent pas");
            }
          } else {
            setError("Adresse actuelle incorrecte");
          }
        } else {
          setError("Veuillez remplir tous les champs");
        }
      } else {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  const returnBack = () => {
    navigation.goBack();
  };

  const fleche = require("../../assets/images/arrow.png");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row items-center mt-8">
        <TouchableOpacity onPress={returnBack}>
          <Image
            source={fleche}
            className="w-[20px] m-8 items-center"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TextInput
          className="text-2xl text-center text-deep-green font-rubikBold"
          placeholder="Modifier mon email"
          placeholderTextColor="#103B00"
          editable={false}
          style={{ flex: 1, marginLeft: -20 }}
        />
      </View>

      <View className="items-center justify-center">
        <View className="w-80 mt-5">
          <Text className="text-xs font-bold mb-2">Adresse email actuelle</Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Ancien email"
              placeholderTextColor="#103B00"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View className="w-80 mt-5">
          <Text className="text-xs font-bold mb-2">Nouvelle adresse email</Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Nouveau email"
              placeholderTextColor="#103B00"
              value={newMail}
              onChangeText={setNewMail}
            />
          </View>
        </View>
        <View className="mb-10 w-80 mt-5">
          <Text className="text-xs font-bold mb-2">
            Confirmer la nouvelle adresse email
          </Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Nouveau email"
              placeholderTextColor="#103B00"
              value={confirmNewMail}
              onChangeText={setConfirmNewEmail}
            />
          </View>
        </View>
        {error ? <Text className="text-red-500 mb-5">{error}</Text> : null}
        <TouchableOpacity onPress={ModifNom} className="mt-15">
          <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] items-center">
            <Text className="text-white text-lg font-rubikBold">Valider</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
