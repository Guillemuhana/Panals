import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import email from 'react-native-email';

function Afiliate() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [numeroIosfa, setNumeroIosfa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [seccional, setSeccional] = useState('');
  const [lugarTrabajo, setLugarTrabajo] = useState('');

  const enviarCorreo = () => {
    const subject = 'Nuevo formulario de afiliación';
    const body = `Nombre: ${nombre}\nApellido: ${apellido}\nDNI: ${dni}\nN° IOSFA: ${numeroIosfa}\nTeléfono: ${telefono}\nEmail: ${emailUsuario}\nSeccional: ${seccional}\nLugar de trabajo: ${lugarTrabajo}`;

    email(['adjunta@pecifa.org'], {
      subject,
      body,
    }).catch(error => {
      console.error('Error al abrir la aplicación de correo electrónico:', error);
      Alert.alert('Error', 'Ocurrió un error al abrir la aplicación de correo electrónico');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Agrega la imagen al principio del formulario */}
      <Image source={require('../assets/afiliate.jpg')} style={styles.headerImage} />
      <Text style={styles.title}>Formulario de Pre-Afiliación</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese su nombre"
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Ingrese su apellido"
      />

      <Text style={styles.label}>DNI:</Text>
      <TextInput
        style={styles.input}
        value={dni}
        onChangeText={setDni}
        placeholder="Ingrese su DNI"
        keyboardType="numeric"
      />

      <Text style={styles.label}>N° IOSFA:</Text>
      <TextInput
        style={styles.input}
        value={numeroIosfa}
        onChangeText={setNumeroIosfa}
        placeholder="Ingrese su N° IOSFA"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Ingrese su teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={emailUsuario}
        onChangeText={setEmailUsuario}
        placeholder="Ingrese su correo electrónico"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Seccional:</Text>
      <TextInput
        style={styles.input}
        value={seccional}
        onChangeText={setSeccional}
        placeholder="Ingrese su seccional"
      />

      <Text style={styles.label}>Lugar de trabajo:</Text>
      <TextInput
        style={styles.input}
        value={lugarTrabajo}
        onChangeText={setLugarTrabajo}
        placeholder="Ingrese su lugar de trabajo"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={enviarCorreo}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.unionContainer}>
        <Text style={styles.unionText}>"LA UNIÓN ES EL CAMINO"</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  unionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  unionText: {
    fontSize: 18,
    color: '#007bff',
  },
});

export default Afiliate;
