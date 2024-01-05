import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import email from 'react-native-email';

const { width } = Dimensions.get('window');

function Contact() {
  const [consulta, setConsulta] = useState('');
  const [nombre, setNombre] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');

  const enviarConsulta = () => {
    const subject = 'Consulta de Afiliado';
    const body = `Nombre: ${nombre}\nEmail: ${emailUsuario}\nConsulta: ${consulta}`;

    email(['administrativa@pecifa.org'], {
      subject,
      body,
    }).catch((error) => {
      console.error('Error al abrir la aplicación de correo electrónico:', error);
      Alert.alert('Error', 'Ocurrió un error al abrir la aplicación de correo electrónico');
    });
  };

  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/contacto.png')} style={styles.headerImage} />

        <Text style={styles.title}>Formulario de Consulta:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={emailUsuario}
          onChangeText={setEmailUsuario}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { marginBottom: 30 }]}
          value={consulta}
          onChangeText={setConsulta}
          placeholder="Escriba su consulta"
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={enviarConsulta}>
            <Text style={styles.buttonText}>Enviar Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
});

export default Contact;
