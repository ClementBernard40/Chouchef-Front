import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import { useAuth } from "@/authContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import axiosInstance from "../axiosInstance";
import { useFonts } from "expo-font";

const LoginScreen = () => {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const mascot = require("../assets/images/mascot.png");

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };
    console.log(email, password);
    axiosInstance
      .post("/users/login", userData)
      .then((response) => {
        console.log("ok");
        signIn(response.data.token);
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error(error);
        // setError('Adresse email ou mot de passe incorrect.');
      });
  };
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./../assets/fonts/Rubik-Regular.ttf"),
    arco: require("./../assets/fonts/ARCO.ttf"),
  });

  if (!fontsLoaded) {
    return null; // ou un indicateur de chargement
  }

  return (
    <SafeAreaView className="flex-1 bg-yellow-100">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFE5" />
      <View className="flex-2 items-center justify-center">
        <Image
          source={mascot}
          className="w-[50%] mb-5"
          style={{ resizeMode: "contain" }}
        />
        <Text className="text-3xl text-deep-green ">Se connecter</Text>
      </View>
      <View className="flex-2 items-center mt-10">
        <View className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
          <TextInput
            className="text-lg text-center text-deep-green font-arco"
            placeholder="Adresse email"
            placeholderTextColor="#ADC319"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="border border-deep-green rounded-full p-3 mb-4 w-80">
          <TextInput
            className="text-lg text-center text-deep-green font-arco"
            placeholder="Mot de passe"
            placeholderTextColor="#ADC319"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] mb-8">
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-white text-lg font-bold font-rubikBold">
              Valider
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text className="font-arco">
            Vous n'avez pas encore de compte ? Créez-en un !
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
