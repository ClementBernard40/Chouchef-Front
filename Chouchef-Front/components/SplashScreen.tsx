import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Ajoutez un délai avant de naviguer vers l'écran suivant
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000); // 2000 millisecondes (2 secondes)
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={1500} // durée de l'animation en millisecondes
        style={styles.logoContainer}
      >
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </Animatable.View>
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 223,
  },
});

export default SplashScreen;
