// App.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';


import Inicio from './Inicio';
import SeccionalesScreen from './SeccionalesScreen';
import DetalleSeccionalScreen from './DetalleSeccionalScreen';
import WordPressBeneficios from './Beneficios';
import DataEntryScreen from './CernetDigital';
import Afiliación  from './Afiliación';

import Contacto from './Contacto';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const drawerItems = [
    { label: 'Inicio', screen: 'Inicio', icon: <FontAwesome name="newspaper-o" size={24} color="#1358ab" /> },
    { label: 'Seccionales', screen: 'Seccionales', icon: <AntDesign name="pluscircleo" size={24} color="#1358ab" /> },
    { label: 'Beneficios', screen: 'Beneficios', icon: <AntDesign name="tagso" size={24} color="#1358ab" /> },
    { label: 'Afiliarse a PE.CI.FA', screen: 'Afiliación', icon: <FontAwesome name="user-plus" size={24} color="#1358ab" /> },

    { label: 'Contacto', screen: 'Contacto', icon: <FontAwesome name="phone" size={24} color="#1358ab" /> },
    
    { label: 'Carnet digital', screen: 'CarnetDigital', icon: <Entypo name="v-card" size={78} color="#1358ab" />},
  ];

  return (
    <DrawerContentScrollView style={styles.drawerContent} {...props}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Image
            source={require('../assets/escudo2014.png')}
            style={styles.headerImage}
          />
          
        </View>
        <View style={styles.additionalHeaderContent}>
          <FontAwesome name="" size={24} color="#fff" />
          <Text style={styles.additionalHeaderText}></Text>
        </View>
      </View>
      <View style={styles.divider} />

      {drawerItems.map((item, index) => (
        <View key={index}>
          {index > 0 && <View style={styles.divider} />}

          <DrawerItem
            label={item.label}
            onPress={() => props.navigation.navigate(item.screen)}
            labelStyle={styles.drawerLabel}
            icon={() => (typeof item.icon === 'string' ? <Icon name={item.icon} size={20} color="#e91e63" /> : item.icon)}
          />
        </View>
      ))}
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1752a1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Seccionales" component={SeccionalesScreen} />
        <Drawer.Screen name="DetalleSeccional" component={DetalleSeccionalScreen} />
        <Drawer.Screen name="Beneficios" component={WordPressBeneficios} />
        <Drawer.Screen name="CarnetDigital" component={DataEntryScreen} />
        <Drawer.Screen name="Afiliación" component={Afiliación} />

        <Drawer.Screen name="Contacto" component={Contacto} />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1752a1',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#fffaf4',
  },
  headerWrapper: {
    backgroundColor: '#1752a1',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },
  additionalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  additionalHeaderText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    color: '#fff',
  },
  drawerLabel: {
    color: 'black',
    fontSize: 16,
  },
  divider: {
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5,
    marginVertical: 4,
  },
});

export default App;
