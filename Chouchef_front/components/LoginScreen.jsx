import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Easing,
  Platform,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "nativewind";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";
import { useFonts } from "expo-font";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [imagePosition] = useState(new Animated.Value(0));
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const mascot = require("../assets/images/mascot.png");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event) => {
    const screenHeight = Dimensions.get("window").height;
    const keyboardHeight = event.endCoordinates.height;
    const inputFieldOffset = screenHeight - keyboardHeight - 520; // Adjust this value to move elements higher

    if (inputFieldOffset < 0) {
      Animated.timing(imagePosition, {
        toValue: inputFieldOffset,
        duration: 20,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  };

  const keyboardDidHide = () => {
    Animated.timing(imagePosition, {
      toValue: 0,
      duration: 20,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

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
        setError("Adresse email ou mot de passe incorrect.");
      });
  };

  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Bold": require("./../assets/fonts/Rubik-Bold.ttf"),
    arco: require("./../assets/fonts/ARCO.ttf"),
  });

  if (!fontsLoaded) {
    return null; // ou un indicateur de chargement
  }

  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTextInput = styled(TextInput);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledText = styled(Text);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFE5" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <View className="flex-1 items-center justify-center">
            <Animated.View
              style={{
                transform: [{ translateY: imagePosition }],
                alignItems: "center",
              }}
            >
              <Image
                source={mascot}
                className="w-[50vw] h-[50vw] mb-16"
                style={{ resizeMode: "contain" }}
              />
              <TextInput
                className="text-3xl text-center text-deep-green font-arco w-[70vw]"
                placeholder="Se connecter"
                placeholderTextColor="#103B00"
                editable={false}
              />
            </Animated.View>
          </View>
          <View className="flex-2 items-center ">
            <View className="border border-deep-green rounded-full pt-1 pb-3 mb-4 w-80">
              <TextInput
                className="text-xl text-center text-deep-green font-rubik"
                placeholder="Adresse email"
                keyboardType="email-address"
                placeholderTextColor="#ADC319"
                value={email}
                onChangeText={setEmail}
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
              />
            </View>
            {error ? <Text className="text-red-500 mb-5">{error}</Text> : null}

            <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] mb-8">
              <TouchableOpacity onPress={handleLogin}>
                <Text className="text-white text-lg font-rubikBold">
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text className="font-arco mb-3">
                Vous n'avez pas encore de compte ? Créez-en un !
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
