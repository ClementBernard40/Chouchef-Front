import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import axiosInstance from "../../axiosInstance";
import levenshtein from "fast-levenshtein";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ALIMENTS = [
  "POIREAU",
  "CITROUILLE",
  "TOMATE",
  "BROCOLI",
  "CAROTTE",
  "CONCOMBRE",
  "RIZ",
  "PATES",
  "MAIS",
  "CEREALES",
  "PATATE",
  "PAIN",
  "POMME",
  "ORANGE",
  "KIWI",
  "BANANE",
  "POIRE",
  "FRAISE",
  "LAIT",
  "YAOURT",
  "FROMAGE",
  "FROMAGE BLANC",
  "BEURRE",
  "POULET",
  "BOEUF",
  "AGNEAU",
  "POISSON",
  "OEUF",
];

const OCRComponent = ({ imageUri, nameList, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [alimentsListLev, setAlimentsListLev] = useState([]);
  const [alimentsList, setAlimentsList] = useState([]);
  const [mergedAlimentsList, setMergedAlimentsList] = useState([]);
  const [idList, setIdList] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", {
          uri: imageUri,
          type: "image/png", // Changed to PNG
          name: "image.png", // Changed to PNG
        });

        console.log("Fetching data...");
        const response = await axiosInstance.post("/detectText", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const extractedText = response.data.detections;
        console.log("Extracted Text:", extractedText);
        setText(extractedText);

        const detectedAliments = ALIMENTS.filter((aliment) =>
          extractedText.toUpperCase().includes(aliment)
        );
        console.log("Detected Aliments:", detectedAliments);
        setAlimentsList(detectedAliments);

        const words = extractedText.split(/\s+/);
        const detectedAlimentslev = new Set();
        words.forEach((word) => {
          ALIMENTS.forEach((aliment) => {
            if (levenshtein.get(word.toUpperCase(), aliment) <= 2) {
              detectedAlimentslev.add(aliment);
            }
          });
        });
        console.log(
          "Detected Aliments Levenshtein:",
          Array.from(detectedAlimentslev)
        );
        setAlimentsListLev(Array.from(detectedAlimentslev));

        const mergedSet = new Set([
          ...detectedAliments,
          ...detectedAlimentslev,
        ]);
        const mergedAlimentsArray = Array.from(mergedSet);
        console.log("Merged Aliments List:", mergedAlimentsArray);
        setMergedAlimentsList(mergedAlimentsArray);

        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          const userData = { name: nameList };
          console.log("User ID:", storedId);
          const response = await axiosInstance.post(
            `/shops/${storedId}`,
            userData
          );
          console.log("Shop Data:", response.data);
          setIdList(response.data._id);

          const foodList = mergedAlimentsArray.map((aliment) =>
            capitalizeFirstLetter(aliment.toLowerCase())
          );
          console.log("Food List:", foodList);

          // Moved AddAliment call here
          await AddAliment(foodList, response.data._id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (imageUri && nameList) {
      fetchData();
    }
  }, [imageUri, nameList]);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const AddAliment = async (foodList, shopId) => {
    try {
      if (foodList.length > 0 && shopId) {
        console.log(
          "teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest"
        );
        const foodData = { foodNames: foodList };
        const response = await axiosInstance.post(
          `shops/${shopId}/add-foods`,
          foodData
        );
        console.log(
          "OUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUIOUI"
        );
        console.log("Add Food Response:", response.data);
        navigation.reset({ index: 0, routes: [{ name: "List" }] });
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleExtractText = () => {
    setLoading(true);
    setText("");
    setAlimentsList([]);
    setAlimentsListLev([]);
    setMergedAlimentsList([]);
    setIdList("");
    fetchData();
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <TextInput
            className="text-3xl text-center text-deep-green font-arco w-[85vw]"
            placeholder="Nous analysons"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <TextInput
            className="text-3xl text-center text-deep-green font-arco w-[85vw] mb-10"
            placeholder="votre image"
            placeholderTextColor="#103B00"
            editable={false}
          />
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <Text> c'est good</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OCRComponent;
