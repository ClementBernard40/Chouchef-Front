import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";
import { styled } from "nativewind";
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
          setError("Adresse email ou mot de passe incorrect.");
        }
      });
  };

  // Styled components
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTextInput = styled(TextInput);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledText = styled(Text);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledView className="flex-1 justify-center items-center bg-white">
        <StyledTextInput
          className="text-3xl text-center text-deep-green font-arco w-[70vw] mb-10"
          placeholder="Inscription"
          placeholderTextColor="#103B00"
          editable={false}
        />

        <StyledView className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
          <StyledTextInput
            className="text-lg text-center text-deep-green font-rubik"
            placeholder="Nom"
            placeholderTextColor="#ADC319"
            value={name}
            onChangeText={setName}
          />
        </StyledView>
        <StyledView className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
          <StyledTextInput
            className="text-lg text-center text-deep-green font-rubik"
            placeholder="Adresse email"
            keyboardType="email-address"
            placeholderTextColor="#ADC319"
            value={email}
            onChangeText={setEmail}
          />
        </StyledView>
        <StyledView className="border border-deep-green rounded-full mb-5 w-80">
          <StyledTextInput
            className="text-lg text-center text-deep-green font-rubik pt-1 pb-3"
            placeholder="Mot de passe"
            placeholderTextColor="#ADC319"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </StyledView>
        <StyledView className="border border-deep-green rounded-full mb-5 w-80">
          <StyledTextInput
            className="text-lg text-center text-deep-green font-rubik pt-1 pb-3"
            placeholder="Confirmez le mot de passe"
            placeholderTextColor="#ADC319"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </StyledView>
        {error ? (
          <StyledText className="text-red-500 mb-5">{error}</StyledText>
        ) : null}
        <StyledView className="btn bg-deep-green rounded-[30px] py-3 px-[15%] mb-8">
          <StyledTouchableOpacity onPress={handleRegister}>
            <StyledText className="text-white text-lg font-rubikBold">
              Valider
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        <StyledImage
          source={mascot}
          className="w-[50vw] h-[50vw]"
          style={{ resizeMode: "contain" }}
        />
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
