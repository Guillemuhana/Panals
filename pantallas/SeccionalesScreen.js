import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Drawer } from 'react-native-paper';

const SeccionalesScreen = ({ navigation }) => {
  const seccionales = [
    { id: 'Nacional', name: 'Nacional', phone: '123-456-7890', email: 'administrativa@example.com', address: 'Dirección de Capital' },
    { id: 'capital_federal', name: 'Capital federal', phone: '123-456-7890', email: 'capital@example.com', address: 'Dirección de Capital' },
    { id: 'Cordoba Capital', name: 'Córdoba Capital', phone: '0351 422-3384', email: 'cordoba@pecifa.org', address: '25 de Mayo 576, X5000' },
    { id: 'parana', name: 'Paraná', phone: '234-567-8901', email: 'parana@example.com', address: 'Dirección de Paraná' },
    { id: 'mendoza', name: 'Mendoza', phone: '234-567-8901', email: 'mendoza@example.com', address: 'Dirección de Mendoza' },
    { id: 'Gran Bs As', name: 'Gran Bs As', phone: '234-567-8901', email: 'granbsas@pecifa.org', address: 'Dirección de Trelew' },

    { id: 'Curuzu', name: 'Curuzu', phone: '3774445677', email: 'curuzu@pecifa.org', address: 'Sarmiento 1449' },

    { id: 'Santa fe', name: 'Santa fe', phone: '234-567-8901', email: 'santafe@example.com', address: 'Dirección de Trelew' },
    { id: 'Rio Cuarto', name: 'Rio cuarto', phone: '234-567-8901', email: 'riocuarto@example.com', address: 'Dirección de Trelew' },
    { id: 'Chamical', name: 'Chamical', phone: '234-567-8901', email: 'chamical@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Las Plata', name: 'La Plata', phone: '234-567-8901', email: 'Laplata@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Misiones', name: 'Misiones', phone: '234-567-8901', email: 'Misiones@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Punta Alta', name: 'Punta Alta', phone: '234-567-8901', email: 'puntaalta@pecifa.org	', address: 'Dirección de Trelew' },   
    { id: 'Reconquista', name: 'Reconquista', phone: '234-567-8901', email: 'reconquista@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Salta', name: 'Salta', phone: '234-567-8901', email: 'Salta@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'trelew', name: 'Trelew', phone: '234-567-8901', email: 'trelew@example.com', address: 'Dirección de Trelew' },

    { id: 'Tandil', name: 'Tandil', phone: '234-567-8901', email: 'Tandil@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Tucuman', name: 'Tucuman', phone: '234-567-8901', email: 'tucuman@pecifa.org	', address: 'Dirección de Trelew' },
    { id: 'Villa Mercedes', name: 'Villa Mercedes', phone: '234-567-8901', email: 'villamercedes@pecifa.org', address: 'Paraguay 304 (5730) – Villa Mercedes – San Luis ' },






    // ... Agrega otros datos de seccionales si lo deseas.
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Seccionales</Text>
      </View>
      {seccionales.map((seccional) => (
        <View key={seccional.id} style={styles.itemContainer}>
          <Drawer.Item
            label={seccional.name}
            style={styles.drawerItem}
            labelStyle={styles.drawerLabel}
            onPress={() => {
              navigation.navigate('DetalleSeccional', { seccional });
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
  },
  drawerItem: {
    marginHorizontal: 10,
    borderRadius: 5,
  },
  drawerLabel: {
    fontSize: 20,
    color: '#555',
  },
});

export default SeccionalesScreen;
