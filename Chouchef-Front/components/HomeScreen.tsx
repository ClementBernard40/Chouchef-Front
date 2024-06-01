import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { useAuth } from "@/authContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // Assurez-vous que ce chemin est correct

const HomeScreen = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    signOut();
    navigation.navigate("LoginScreen");
  };
  const handleMeal = () => {
    signOut();
    navigation.navigate("MealScreen");
  };
  const handleList = () => {
    signOut();
    navigation.navigate("ListScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerTitre}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
          />
        </View>

        <View style={styles.containerBody}>
          <TouchableOpacity onPress={handleMeal}>
            <Text>Preparer une nouvelle semaine de repas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleList}>
            <Text>Historique des listes de course</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  containerTitre: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 270,
    height: 150,
    marginTop: 35,
  },
  containerBody: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default HomeScreen;
