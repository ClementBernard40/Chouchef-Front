import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@/components/SplashScreen';
import HomeScreen from '@/components/HomeScreen';
import LoginScreen from '@/components/LoginScreen';

const Stack = createStackNavigator();

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Simulez une vérification d'authentification
      const userAuthenticated = false; // Changez cette valeur en fonction de la vérification réelle
      setIsAuthenticated(userAuthenticated);
    };

    checkAuth();
  }, []);

  return (
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
  );
}
