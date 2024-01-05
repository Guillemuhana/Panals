import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function WordPressBeneficios() {
  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      'Más información',
      'Para más información, ingresa en nuestra web oficial: www.pecifa.org',
    );
  };

  const navigateToCarnetDigital = () => {
    navigation.navigate('CarnetDigital'); // Replace 'CarnetDigital' with the actual screen name
  };

  const navigateToOptica = () => {
    // Implement navigation logic for 'Optica' screen
  };

  const navigateToTurismo = () => {
    // Implement navigation logic for 'Turismo' screen
  };

  const navigateToNacimiento = () => {
    // Implement navigation logic for 'Nacimiento' screen
  };

  const navigateToMatrimonio = () => {
    // Implement navigation logic for 'Matrimonio' screen
  };

  const navigateToBodasDePlata = () => {
    // Implement navigation logic for 'Bodas de Plata' screen
  };

  const navigateToJubilacion = () => {
    // Implement navigation logic for 'Jubilacion' screen
  };

  const renderCard = (title, imageSource, onPress) => (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={imageSource} resizeMode="contain" />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>Completa con tus datos y obtén este nuevo beneficio</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {renderCard('Nuevo carnet digital', require('../assets/pecifacarnet.webp'), () => {
        
          navigateToCarnetDigital();
        })}
        
        {renderCard('Óptica', require('../assets/smartflex.jpg'), () => {
          showAlert();
          navigateToOptica();
        })}

        {renderCard('Turismo', require('../assets/turismo.jpg'), () => {
          showAlert();
          navigateToTurismo();
        })}

        {renderCard('Nacimiento', require('../assets/bnpecifa.jpg'), () => {
          showAlert();
          navigateToNacimiento();
        })}

        {renderCard('Matrimonio', require('../assets/boda.jpg'), () => {
          showAlert();
          navigateToMatrimonio();
        })}

        {renderCard('Bodas de Plata', require('../assets/plata.jpg'), () => {
          showAlert();
          navigateToBodasDePlata();
        })}

        {renderCard('Jubilacion', require('../assets/jubi.jpg'), () => {
          showAlert();
          navigateToJubilacion();
        })}

        {/* Add similar logic to other cards */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 14,
  },
  card: {
    marginBottom: 16,
  },
});

export default WordPressBeneficios;
