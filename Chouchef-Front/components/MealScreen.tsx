import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/authContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Assurez-vous que ce chemin est correct

const MealScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const handleMenu = () => {
        navigation.navigate('HomeScreen');
      };


  return (
    <View style={styles.container}>
      <Text>Page REPAAAAAAAAAS</Text>
      <Button title="retour" onPress={handleMenu}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealScreen;
