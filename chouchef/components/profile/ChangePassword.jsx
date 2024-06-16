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

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [detailedError, setDetailedError] = useState("");
  const { userId } = useAuth();
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    try {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        // Logic to fetch user data if needed
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

  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axiosInstance.put(`/users/${userId}/password`, {
        currentPassword,
        newPassword,
      });

      if (response.status === 200 || response.status === 203) {
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: "Le mot de passe a été mis à jour avec succès.",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfilScreen" }],
        });
      } else {
        setError("Échec de la mise à jour du mot de passe.");
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Échec de la mise à jour du mot de passe.",
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du mot de passe:",
        error.response.data
      );
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setDetailedError(error.response.data.message);
      } else {
        setDetailedError(
          "Une erreur est survenue lors de la mise à jour du mot de passe."
        );
      }
      setError(
        "Une erreur est survenue lors de la mise à jour du mot de passe."
      );
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2:
          "Une erreur est survenue lors de la mise à jour du mot de passe.",
      });
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
          placeholder="Modifier mon mot de passe"
          placeholderTextColor="#103B00"
          editable={false}
          style={{ flex: 1, marginLeft: -20 }}
        />
      </View>

      <View className="items-center justify-center">
        <View className="w-80 mt-5">
          <Text className="text-xs font-bold mb-2">Mot de passe actuel</Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Mot de passe actuel"
              placeholderTextColor="#103B00"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
          </View>
        </View>
        <View className="w-80 mt-5">
          <Text className="text-xs font-bold mb-2">Nouveau mot de passe</Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Nouveau mot de passe"
              placeholderTextColor="#103B00"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>
        </View>
        <View className="mb-10 w-80 mt-5">
          <Text className="text-xs font-bold mb-2">
            Confirmer le nouveau mot de passe
          </Text>
          <View className="border border-deep-green rounded-full">
            <TextInput
              className="text-lg text-center opacity-50 text-deep-green font-rubik pt-1 pb-3"
              placeholder="Confirmer le nouveau mot de passe"
              placeholderTextColor="#103B00"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
            />
          </View>
        </View>
        {error ? <Text className="text-red-500 mb-5">{error}</Text> : null}
        {detailedError ? (
          <Text className="text-red-500 mb-5">{detailedError}</Text>
        ) : null}
        <TouchableOpacity onPress={updatePassword} className="mt-15">
          <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] items-center">
            <Text className="text-white text-lg font-rubikBold">Valider</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
