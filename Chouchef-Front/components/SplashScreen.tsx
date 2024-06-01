// SplashScreen.tsx
import React, { useEffect } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "../authContext";
import { RootStackParamList } from "../types"; // Importer les types

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Utiliser le type approprié
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Ajoutez un délai avant de naviguer vers l'écran suivant
    {
      isAuthenticated
        ? setTimeout(() => {
            navigation.navigate("HomeScreen");
          }, 2200)
        : setTimeout(() => {
            navigation.navigate("LoginScreen");
          }, 2000);
    }

    setTimeout(() => {
      navigation.navigate("HomeScreen");
    }, 2000); // 2000 millisecondes (2 secondes)
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animatable.View
          animation="fadeIn"
          duration={1500} // durée de l'animation en millisecondes
          style={styles.logoContainer}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffe5",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 138,
  },
});

export default SplashScreen;
