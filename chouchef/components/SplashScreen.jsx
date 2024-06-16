import React, { useEffect } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../authContext";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigation.navigate("HomeScreen");
      }, 2200);
    } else {
      setTimeout(() => {
        navigation.navigate("LoginScreen");
      }, 2000);
    }
  }, [isAuthenticated, navigation]);

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
