import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axiosInstance from "../../axiosInstance";

const checkedImage = require("../../assets/images/checked.png");
const uncheckedImage = require("../../assets/images/unchecked.png");
const fleche = require("../../assets/images/arrow.png");
const plusImage = require("../../assets/images/plus.png");
const croixRougeImage = require("../../assets/images/croixrouge.png");

const ALIMENTS = [
  "Poireau",
  "Citrouille",
  "Tomate",
  "Brocoli",
  "Carotte",
  "Concombre",
  "Riz",
  "Pates",
  "Mais",
  "Cereales",
  "Patate",
  "Pain",
  "Pomme",
  "Orange",
  "Kiwi",
  "Banane",
  "Poire",
  "Fraise",
  "Lait",
  "Yaourt",
  "Fromage",
  "Beurre",
  "Poulet",
  "Boeuf",
  "Agneau",
  "Poisson",
  "Oeuf",
];

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { listId } = route.params;
  const [listDetails, setListDetails] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [changedCheckedItems, setChangedCheckedItems] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addAliments, setAddAliments] = useState([]);

  const fetchListDetails = async () => {
    try {
      const response = await axiosInstance.get(`/shops/${listId}`);
      setListDetails(response.data);
      const checkedFoods = response.data.food_checked || [];
      initializeCheckedItems(response.data.foods_in_shop, checkedFoods);
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  const initializeCheckedItems = (foods, checkedFoods) => {
    const initialCheckedItems = {};
    foods.forEach((food) => {
      initialCheckedItems[food._id] = checkedFoods.includes(food._id);
    });
    setCheckedItems(initialCheckedItems);
  };

  useEffect(() => {
    fetchListDetails();
  }, [listId]);

  const handleToggleCheck = (itemId) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };

    setCheckedItems(newCheckedItems);
    setChangedCheckedItems({
      ...changedCheckedItems,
      [itemId]: !checkedItems[itemId],
    });
  };

  const handleSaveCheckedItems = async () => {
    const checkedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    try {
      await axiosInstance.put(`/shops/${listId}/check-item`, {
        food_checked: checkedIds,
      });
    } catch (error) {
      console.error("Error saving checked items:", error);
    }
  };

  const handleAddAliment = (aliment) => {
    setAddAliments((prevAliments) =>
      prevAliments.includes(aliment)
        ? prevAliments.filter((item) => item !== aliment)
        : [...prevAliments, aliment]
    );
  };

  const handleSaveAddAliments = async () => {
    try {
      if (addAliments.length > 0) {
        console.log("List ID:", listId);
        console.log("Aliments to add:", addAliments);

        const response = await axiosInstance.post(
          `/shops/${listId}/add-foods`,
          {
            foodNames: addAliments,
          }
        );

        console.log("Response:", response.data);

        setAddAliments([]); // Réinitialiser addAliments après ajout
        await fetchListDetails(); // Recharger les détails de la liste
      }
    } catch (error) {
      console.error("Error adding aliments:", error.response.data);
    }
  };

  const handleRemoveFood = async (foodId) => {
    try {
      console.log("Removing food with ID:", foodId); // Log the food ID
      console.log("From list with ID:", listId); // Log the list ID

      // Supprimer l'aliment de foods_in_shop
      await axiosInstance.delete(`/shops/${listId}/foods_in_shop/${foodId}`);

      console.log("Food removed successfully");

      // Supprimer l'aliment de food_checked s'il est présent
      if (checkedItems[foodId]) {
        console.log("Food is checked, removing from checked items");

        const updatedCheckedItems = { ...checkedItems };
        delete updatedCheckedItems[foodId];
        setCheckedItems(updatedCheckedItems);

        await axiosInstance.put(`/shops/${listId}/food_checked`, {
          food_checked: Object.keys(updatedCheckedItems),
        });
      }

      // Recharger les détails de la liste après la suppression
      await fetchListDetails();
    } catch (error) {
      console.error("Error removing food:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      handleSaveCheckedItems();
      if (editMode) handleSaveAddAliments();
    });

    return unsubscribe;
  }, [navigation, checkedItems, addAliments, editMode]);

  if (!listDetails) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const returnBack = () => {
    navigation.goBack();
  };

  const availableAliments = ALIMENTS.filter((aliment) => {
    const foodsInShop = listDetails.foods_in_shop || [];
    return !foodsInShop.some(
      (food) => food.name && food.name.toLowerCase() === aliment.toLowerCase()
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row items-center mt-10 mb-10">
        <TouchableOpacity onPress={returnBack}>
          <Image
            source={fleche}
            className="w-[15px] p-4 mr-12 ml-8 items-center"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TextInput
          className="text-3xl text-deep-green font-arco"
          placeholder={listDetails.name}
          placeholderTextColor="#103B00"
          editable={false}
          style={{ flex: 1, marginLeft: -20 }}
        />
      </View>
      <ScrollView>
        <View>
          {listDetails.foods_in_shop.map((item) => (
            <View key={item._id} className="flex-row items-center ml-8 p-3">
              <TouchableOpacity
                className="flex-1 flex-row items-center"
                onPress={() => handleToggleCheck(item._id)}
              >
                <Image
                  source={
                    checkedItems[item._id] ? checkedImage : uncheckedImage
                  }
                  className="w-[30px] h-[30px] mr-4"
                />
                <Text className="text-xl font-semibold text-deep-green">
                  {item.name}
                </Text>
              </TouchableOpacity>
              {editMode && (
                <TouchableOpacity onPress={() => handleRemoveFood(item._id)}>
                  <Image
                    source={croixRougeImage}
                    className="w-[12px] h-[12px] ml-auto"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        {editMode && (
          <View>
            {availableAliments.map((item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`} // Générer une clé unique en combinant l'élément et l'index
                className="flex-row items-center ml-8 p-3"
                onPress={() => handleAddAliment(item)}
              >
                <Image
                  source={
                    addAliments.includes(item) ? uncheckedImage : plusImage
                  }
                  className="w-[30px] h-[30px] mr-4"
                />
                <Text className="text-xl font-semibold text-deep-green">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <View className="flex-row justify-center mt-4 mb-4">
        <TouchableOpacity
          className={`py-3 px-8 rounded-full ${
            editMode ? "bg-deep-green" : "bg-blue"
          }`}
          onPress={() => {
            if (editMode) {
              handleSaveAddAliments();
            }
            setEditMode(!editMode);
          }}
          style={{ width: "auto" }}
        >
          <Text className="text-white text-lg font-rubikBold text-center">
            {editMode ? "Terminer" : "Modifier"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
