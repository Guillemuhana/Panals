import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

// Importa la imagen local
import CordobaImage from '../assets/fc.jpg';

const DetalleSeccionalScreen = ({ route }) => {
  const { seccional } = route.params;

  const openGoogleMaps = () => {
    // Use the latitude and longitude values from your seccional data
    const latitude = seccional.latitude || 0;
    const longitude = seccional.longitude || 0;

    // Generate the Google Maps URL
    const mapsUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;

    // Open the Google Maps app or website
    Linking.openURL(mapsUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle Seccional</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Seccional:</Text>
        <Text style={styles.value}>{seccional.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{seccional.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{seccional.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Dirección:</Text>
        <TouchableOpacity onPress={openGoogleMaps}>
          <Text style={[styles.value, styles.link]}>{seccional.address}</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.title1}>"La unión es el camino"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e2e2e2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0077B6',
    alignSelf: 'center',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0077B6',
    alignSelf: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  label: {
    fontSize: 20,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});

export default DetalleSeccionalScreen;
