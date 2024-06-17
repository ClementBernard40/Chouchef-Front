import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";
const mascot = require("../assets/images/mascot.png");

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (
      name === "" ||
      password === "" ||
      email === "" ||
      confirmPassword === ""
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    console.log(email, password);
    axiosInstance
      .post("/users/register", userData)
      .then((response) => {
        console.log("ok");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.error(error.message);
        if (error.response.status == 592) {
          setError("l'adresse email est deja utilisé");
        } else {
          console.log(error.response.status);
          setError(
            "Adresse email ou mot de passe incorrect.",
            error.response.data.message
          );
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <View className="flex-1 justify-center items-center">
            <TextInput
              className="text-3xl text-center text-deep-green font-arco w-[70vw] mb-10"
              placeholder="Inscription"
              placeholderTextColor="#103B00"
              editable={false}
            />

            <View className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
              <TextInput
                className="text-lg text-center text-deep-green font-rubik"
                placeholder="Nom"
                placeholderTextColor="#ADC319"
                value={name}
                onChangeText={setName}
                onFocus={() => setError("")}
              />
            </View>
            <View className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
              <TextInput
                className="text-lg text-center text-deep-green font-rubik"
                placeholder="Adresse email"
                keyboardType="email-address"
                placeholderTextColor="#ADC319"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setError("")}
              />
            </View>
            <View className="border border-deep-green rounded-full mb-5 w-80">
              <TextInput
                className="text-lg text-center text-deep-green font-rubik pt-1 pb-3"
                placeholder="Mot de passe"
                placeholderTextColor="#ADC319"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setError("")}
              />
            </View>
            <View className="border border-deep-green rounded-full mb-5 w-80">
              <TextInput
                className="text-lg text-center text-deep-green font-rubik pt-1 pb-3"
                placeholder="Confirmez le mot de passe"
                placeholderTextColor="#ADC319"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setError("")}
              />
            </View>
            {error ? <Text className="text-red-500 mb-5">{error}</Text> : null}
            <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] mb-8">
              <TouchableOpacity onPress={handleRegister}>
                <Text className="text-white text-lg font-rubikBold">
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={mascot}
              className="w-[50vw] h-[50vw]"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;
