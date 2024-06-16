import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CameraComponent from "./CameraComponent";
import OCRComponent from "./OCRComponent";
import { useRoute } from "@react-navigation/native";

const AddAliment = ({ navigation }) => {
  const route = useRoute();
  const [photoUri, setPhotoUri] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);

  const handlePictureTaken = (uri) => {
    setPhotoUri(uri);
  };

  const handleTextExtracted = (recognizedAliments) => {
    setShoppingList((prevList) => [...prevList, ...recognizedAliments]);
  };

  const { nameList } = route.params;

  return (
    <View style={styles.container}>
      {photoUri ? (
        <OCRComponent
          imageUri={photoUri}
          onTextExtracted={handleTextExtracted}
          nameList={nameList}
          navigation={navigation}
        />
      ) : (
        <CameraComponent onPictureTaken={handlePictureTaken} />
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
});

export default AddAliment;
