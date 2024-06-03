import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../authContext"; // update with your actual path

const ListScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      setToken(storedToken);
    };

    getToken();
  }, []);

  const handleMenu = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Page liste</Text>
      <Text>{isAuthenticated ? `Token: ${token}` : "Not Authenticated"}</Text>
      <Button title="Retour au menu" onPress={handleMenu} />
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

export default ListScreen;
