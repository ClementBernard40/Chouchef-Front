import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styled } from "nativewind";
import { useAuth } from "../../authContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import axiosInstance from "../../axiosInstance";

const ProfileScreen = ({ route }) => {
  const { signOut } = useAuth();
  const { userId } = useAuth();
  const fleche = require("../../assets/images/fleche.png");
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledImageBackground = styled(ImageBackground);
  const StyledSafeAreaView = styled(SafeAreaView);
  const StyledScrollView = styled(ScrollView);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        const storedId = id;
        if (storedId) {
          console.log("Fetching user data...");
          const response = await axiosInstance.get(`/users/${storedId}`);
          console.log(response.data);
          setEmail(response.data.email);
          setName(response.data.name);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  useEffect(() => {
    if (route.params?.refresh) {
      fetchData();
    }
  }, [route.params?.refresh]);

  const handleLogout = () => {
    signOut();
    navigation.dispatch(StackActions.popToTop());
  };

  const handleDeleteAccount = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        await axiosInstance.delete(`/users/${id}`);
        signOut();
        navigation.dispatch(StackActions.popToTop());
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white items-center justify-center">
      <StyledScrollView horizontal={true}>
        <View className="flex w-[90vw]">
          <StyledView className="flex flex-row gap-46 items-end justify-between flex-no-wrap">
            <StyledView className="flex ">
              <StyledText className="h-[39px] text-[34px] font-bold text-deep-green">
                {name}
              </StyledText>
              <StyledText className=" h-[17px] font-Rubik text-[14px] leading-[16.59px] text-deep-green">
                {email}
              </StyledText>
            </StyledView>
            <StyledImageBackground
              className="w-[90.847px] h-[90.847px] relative z-[5]"
              source={require("../../assets/images/ce6f57dd-a026-4ce9-8481-143c360ac484.png")}
              resizeMode="cover"
            />
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
                  className="w-[10] -right-8"
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
                onPress={() => navigation.navigate("ChangeMail")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10] -right-8"
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
                onPress={() => navigation.navigate("ChangePassword")}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10] -right-8"
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
                onPress={() => setModalVisible(true)}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10] -right-8"
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
                onPress={() => setDeleteModalVisible(true)}
                style={{ zIndex: 2 }}
              >
                <Text></Text>
                <Image
                  source={fleche}
                  className="w-[10] -right-8"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </StyledView>
        </View>
      </StyledScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-[90%] bg-deep-green rounded-lg p-4 shadow-lg">
            <Text className="text-2xl font-bold text-white text-center mb-4">
              Se déconnecter ?
            </Text>
            <View className="items-center">
              <TouchableOpacity
                className="px-4 py-2 bg-orange rounded-[20px] w-[188px]"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleLogout();
                }}
              >
                <Text className="text-lg font-bold text-white text-center">
                  Se déconnecter
                </Text>
              </TouchableOpacity>
            </View>

            <View className="items-center mb-4">
              <TouchableOpacity
                className="px-4 py-2 bg-white rounded-[20px] mt-[10px] w-[188px]"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-lg font-bold text-deep-green text-center">
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-[90%] bg-deep-green rounded-lg p-4 shadow-lg">
            <Text className="text-2xl font-bold text-white text-center mb-4">
              Supprimer le compte ?
            </Text>
            <View className="items-center">
              <TouchableOpacity
                className="px-4 text-lg py-2 bg-orange rounded-[20px] w-[188px]"
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                  handleDeleteAccount();
                }}
              >
                <Text className="text-white text-lg font-bold text-center">
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>

            <View className="items-center mb-4">
              <TouchableOpacity
                className="px-4 py-2 bg-white rounded-[20px] mt-[10px] w-[188px]"
                onPress={() => setDeleteModalVisible(!deleteModalVisible)}
              >
                <Text className="text-deep-green text-lg font-bold text-center">
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default ProfileScreen;
