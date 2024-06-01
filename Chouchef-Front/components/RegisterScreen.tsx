import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import axiosInstance from "@/axiosInstance";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    console.log(email, password);
    axiosInstance
      .post("/users/register", userData)
      .then((response) => {
        console.log("ok");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.error(error);
        // setError('Adresse email ou mot de passe incorrect.');
      });
  };

  //     try {
  //       const response = await fetch("http://192.168.1.12:3001/users/register", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(userData),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log('ok')
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       console.error('Register error:', error);
  //       setError('Une erreur est survenue lors de l\'inscription.');
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Text className="text-deep-green text-4xl">Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#ADC319"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ADC319"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#ADC319"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmez le mot de passe"
        placeholderTextColor="#ADC319"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffe5",
  },
  titre: {
    fontSize: 40,
    marginBottom: 30,
    color: "#103B00",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 30,
    width: "80%",
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export default RegisterScreen;
