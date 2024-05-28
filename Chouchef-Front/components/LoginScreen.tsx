// LoginScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const navigation = useNavigation();

  const handleLogin = () => {
    // Logique d'authentification
    // Après authentification réussie, naviguer vers la page d'accueil
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Page de connexion</Text>
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default LoginScreen;
