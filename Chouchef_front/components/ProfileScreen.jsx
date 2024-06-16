import React from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import { useAuth } from "../authContext";

import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { signOut } = useAuth();

  const fleche = require("../assets/images/fleche.png");
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledImageBackground = styled(ImageBackground);
  const StyledSafeAreaView = styled(SafeAreaView);
  const StyledScrollView = styled(ScrollView);
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut();
    navigation.navigate("LoginScreen");
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white items-center justify-center">
      <StyledScrollView horizontal={true}>
        <View className="flex bg-[#FFFFFF]">
          <StyledView className="flex flex-row gap-46 items-end flex-no-wrap">
            <StyledView className="flex items-start">
              <StyledText className="h-[39px] font-ARCO text-[34px] font-bold text-[#103b00]">
                clémence
              </StyledText>
              <StyledText className="flex w-[183px] h-[17px] justify-center items-start font-Rubik text-[14px] font-medium leading-[16.59px] text-[#103b00]">
                clemence.marr@gmail.com
              </StyledText>
            </StyledView>

            <StyledImageBackground
              className="w-[90.847px] h-[90.847px] relative z-[5]"
              source={require("../assets/images/ce6f57dd-a026-4ce9-8481-143c360ac484.png")}
              resizeMode="cover"
            />
            <StyledImageBackground
              className="w-[51.186px] h-[63.074px] absolute top-[10.771px] left-[250.832px] relative z-[6]"
              source={require("../assets/images/bc1eae3b4910e92a615e1bb37f187eff2b3ca655.png")}
              resizeMode="cover"
            />
            <StyledView className="flex w-[20.15px] h-[20.193px] py-[5.273px] px-[4.52px] gap-[7.533px] items-end bg-[#103b00] rounded-[150.66px] absolute top-[65.459px] left-[298.582px] relative z-[7]">
              <StyledImageBackground
                className="w-[11.111px] h-[9.646px] relative z-[8]"
                source={require("../assets/images/104eab36-0047-41ef-b283-9f91043a3e7b.png")}
                resizeMode="cover"
              />
            </StyledView>
          </StyledView>
          <StyledView className="flex w-[90%] gap-[30px] items-start flex-no-wrap mt-20">
            <View className="w-[100%] ">
              <TextInput
                className="text-[24px] font-rubikBold"
                placeholder="Modifier mon prénom"
                placeholderTextColor="#103B00"
                editable={false}
                style={{ zIndex: 1 }}
              />
              <TouchableOpacity
                className="absolute inset-0 flex flex-row items-center justify-between w-[100%]"
                onPress={() => navigation.navigate("ChangeName")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View className="w-[100%] ">
              <TextInput
                className="text-[24px] font-rubikBold"
                placeholder="Modifier mon mail"
                placeholderTextColor="#103B00"
                editable={false}
                style={{ zIndex: 1 }}
              />
              <TouchableOpacity
                className="absolute inset-0 flex flex-row items-center justify-end w-[100%]"
                onPress={() => navigation.navigate("ChangeName")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="w-[100%] ">
              <TextInput
                className="text-[24px] font-rubikBold"
                placeholder="Modifier le mot de passe"
                placeholderTextColor="#103B00"
                editable={false}
                style={{ zIndex: 1 }}
              />
              <TouchableOpacity
                className="absolute inset-0 flex flex-row items-center justify-between w-[100%]"
                onPress={() => navigation.navigate("ChangeName")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="w-[100%] ">
              <TextInput
                className="text-[24px] font-rubikBold"
                placeholder="Se deconnecter"
                placeholderTextColor="#103B00"
                editable={false}
                style={{ zIndex: 1 }}
              />
              <TouchableOpacity
                className="absolute inset-0 flex flex-row items-center justify-between w-[100%]"
                onPress={() => handleLogout()}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="w-[100%] ">
              <TextInput
                className="text-[24px] font-rubikBold"
                placeholder="Supprimer le compte"
                placeholderTextColor="#103B00"
                editable={false}
                style={{ zIndex: 1 }}
              />
              <TouchableOpacity
                className="absolute inset-0 flex flex-row items-center justify-between w-[100%]"
                onPress={() => navigation.navigate("ChangeName")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </StyledView>
        </View>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default ProfileScreen;
