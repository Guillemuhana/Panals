import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();
  const [logoPressed, setLogoPressed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      drawerLabel: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    let timeout;
    if (logoPressed) {
      timeout = setTimeout(() => {
        // setShowWelcome(true); // No need for this line if you don't want to show the welcome text
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [logoPressed]);

  const handleLogoPress = () => {
    setLogoPressed(true);
    navigation.openDrawer();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Fondo Azul con Texto de Bienvenida */}
      <View style={styles.blueBackground}>
        <Text style={styles.title}>Bienvenidos a PECIFA Digital</Text>
        <TouchableOpacity
          onPress={handleLogoPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={require('../assets/escudo2014.png')}
            style={[styles.logo, logoPressed && styles.logoPressed, animatedStyle]}
          />
        </TouchableOpacity>
        {/* Removed the welcome text */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueBackground: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#1752a1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textTransform: 'uppercase', // Example additional style
    letterSpacing: 1, // Example additional style
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    top: 30,
  },
  logoPressed: {},
});

export default Inicio;
