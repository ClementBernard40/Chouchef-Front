import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const CreateList = ({ navigation }) => {
  const [name, SetName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ListCreation = async () => {
    if (name.trim() === "") {
      setErrorMessage("Le nom de la liste ne peut pas être vide");
    } else {
      setErrorMessage(""); // Clear any previous error message
      navigation.navigate("indicPhoto", { nameList: name });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextInput
            className="text-4xl text-center text-deep-green font-arco w-[70vw] mt-20"
            placeholder="Nommez"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-4xl text-center text-deep-green font-arco w-[70vw]"
            placeholder="Votre Liste"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <View className="border border-deep-green rounded-full mb-4 w-80 mt-10">
            <TextInput
              className="text-lg text-center text-deep-green font-rubik pt-1 pb-3"
              placeholder="Liste"
              placeholderTextColor="#ADC319"
              value={name}
              onChangeText={SetName}
            />
          </View>
          {errorMessage ? (
            <Text style={{ color: "red", marginBottom: 20 }}>
              {errorMessage}
            </Text>
          ) : null}
          <View className="btn bg-deep-green rounded-[30px] py-3 px-[15%] ">
            <TouchableOpacity onPress={ListCreation}>
              <Text className="text-white text-lg font-rubikBold">Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreateList;
