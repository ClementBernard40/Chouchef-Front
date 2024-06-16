import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ProgressBar } from "react-native-paper"; // Import ProgressBar component from react-native-paper
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../authContext";
import axiosInstance from "../../axiosInstance";

const ListScreen = ({ navigation }) => {
  const { userId } = useAuth();
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lists, setLists] = useState([]);
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [renameError, setRenameError] = useState("");

  const mascot = require("../../assets/images/mascot.png");
  const plus = require("../../assets/images/+.png");
  const points = require("../../assets/images/troispoints.png");
  const pencil = require("../../assets/images/pencil.png");
  const cross = require("../../assets/images/cross.png");

  const fetchData = async () => {
    try {
      const storedId = await AsyncStorage.getItem("userId");
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedId && storedToken) {
        setToken(storedToken);
        setId(storedId);
        console.log("Fetching user data...");
        const response = await axiosInstance.get(`/users/${storedId}`);
        setEmail(response.data.email);
        setName(response.data.name);
        setLists(response.data.user_shop);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId])
  );

  const handleNewList = () => {
    navigation.navigate("CreateList");
  };

  const handleRename = (listId) => {
    setSelectedListId(listId);
    setModalVisible(false);
    setRenameModalVisible(true);
  };

  const handleRenameCancel = () => {
    setRenameModalVisible(false);
  };

  const handleRenameConfirm = async () => {
    if (!newName.trim()) {
      setRenameError("Veuillez entrer un nom");
      return;
    }

    if (selectedListId && newName.trim()) {
      try {
        const response = await axiosInstance.put(`/shops/${selectedListId}`, {
          name: newName,
        });
        const updatedList = response.data;
        setLists((prevLists) =>
          prevLists.map((list) =>
            list._id === selectedListId ? updatedList : list
          )
        );
        setRenameModalVisible(false);
        setRenameError(""); // Clear error message
      } catch (error) {
        console.error("Error renaming list:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedListId) {
      try {
        await axiosInstance.delete(`/shops/${selectedListId}`);
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== selectedListId)
        );
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    }
  };

  const handleMenu = () => {
    navigation.navigate("HomeScreen");
  };

  const renderListItem = ({ item }) => {
    let progress = 0;

    if (item.foods_in_shop && item.foods_in_shop.length > 0) {
      progress = item.nb_checked / item.foods_in_shop.length;

      return (
        <TouchableOpacity
          className="bg-deep-green p-5 m-2 rounded-lg w-[80vw] "
          onPress={() =>
            navigation.navigate("DetailScreen", { listId: item._id })
          }
        >
          <View className="flex-1 flex flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedListId(item._id);
                setModalVisible(true);
              }}
            >
              <Image
                source={points}
                style={{ resizeMode: "contain", width: 15, height: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProgressBar
              className="rounded-lg border border-white "
              progress={progress}
              color="#FFFFE5"
              style={{
                marginTop: 10,
                width: 200,
                height: 10,
                backgroundColor: "#103B00",
              }}
            />
            <Text
              className="text-white mt-[10px] "
              style={{ fontWeight: "bold" }}
            >
              {item.nb_checked}/{item.foods_in_shop.length}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-deep-green w-full p-5 rounded-t-lg shadow-lg h-[200px]">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-2xl font-bold text-white ">
                Modifier la liste
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-lg font-bold text-white">✕</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center">
              <Image
                source={pencil}
                style={{ resizeMode: "contain", width: 15, height: 15 }}
              />
              <TouchableOpacity
                className="py-2"
                onPress={() => handleRename(selectedListId)}
              >
                <Text className=" ml-1 text-white text-lg">Renommer</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center">
              <Image
                source={cross}
                style={{ resizeMode: "contain", width: 15, height: 15 }}
              />
              <TouchableOpacity className="py-2" onPress={handleDelete}>
                <Text className="text-orange text-lg ml-1">Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={renameModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View className="bg-deep-green p-5 rounded-lg w-[90%]">
            <TextInput
              placeholder="Renommez la liste"
              placeholderTextColor="#FFFFE5"
              className="text-2xl mb-3 font-rubikBold"
              editable={false}
            />
            <View className="border border-yellow rounded-full mb-4">
              <TextInput
                className="text-lg ml-2 font-rubik  text-white opacity-75 pt-1 pb-3"
                placeholder="Nom"
                placeholderTextColor="#FFFFE5"
                value={newName}
                onChangeText={(text) => {
                  setNewName(text);
                  setRenameError(""); // Clear error message on input change
                }}
              />
            </View>
            {renameError ? (
              <Text className="text-red-500 text-center text-lg mb-4">
                {renameError}
              </Text>
            ) : null}
            <View className="flex flex-row justify-evenly">
              <TouchableOpacity
                className="bg-orange  p-4 rounded-full w-28"
                onPress={handleRenameCancel}
              >
                <Text
                  className="text-center text-white "
                  style={{ fontWeight: "bold" }}
                >
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white  p-4 rounded-full w-28"
                onPress={handleRenameConfirm}
              >
                <Text
                  className="text-center text-deep-green"
                  style={{ fontWeight: "bold" }}
                >
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TextInput
        className="text-3xl font-arco mt-10 w-[50%] mb-10"
        placeholder="Mes listes"
        placeholderTextColor="#103B00"
        editable={false}
      />
      {lists.length === 0 ? (
        <>
          <Image
            source={mascot}
            className="w-[50%]"
            style={{ resizeMode: "contain" }}
          />
          <TextInput
            className="text-lg text-center text-deep-green"
            placeholder="Qu'est ce que votre"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-lg text-center text-deep-green"
            placeholder="chouchef a choisi cette"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-lg text-center text-deep-green mb-2"
            placeholder="semaine ?"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-sm text-center text-deep-green"
            placeholder="Appuyez sur le bouton pour"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-sm text-center text-deep-green"
            placeholder="creer votre premier liste"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TouchableOpacity
            className="flex-row items-center bg-deep-green rounded-full p-3 my-5"
            onPress={handleNewList}
          >
            <Image source={plus} className="resize-contain mr-3" />
            <Text className="text-white text-lg font-bold">Nouvelle liste</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <FlatList
            data={lists}
            renderItem={renderListItem}
            keyExtractor={(item) => item._id}
          />
          <TouchableOpacity
            className="flex-row items-center bg-deep-green rounded-full p-3 my-5"
            onPress={handleNewList}
          >
            <Image source={plus} className="resize-contain mr-3" />
            <Text className="text-white text-lg font-bold">Nouvelle liste</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default ListScreen;
