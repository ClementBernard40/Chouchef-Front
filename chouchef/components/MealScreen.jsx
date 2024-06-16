import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MealScreen = () => {
  const navigation = useNavigation();

  const handleMenu = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Page REPAAAAAAAAAS</Text>
      <Button title="retour" onPress={handleMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealScreen;
