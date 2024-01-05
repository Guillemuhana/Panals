import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ExpoFileSystem from 'expo-file-system';
import dnis from '../assets/BaseDatos/dni.json';
import escudo2014 from '../assets/escudo2014.png';
import fondo05 from '../assets/fondo05.png';
import pecifacarnet from '../assets/pecifacarnet.webp';

function DataEntryScreen() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [organismo, setOrganismo] = useState('');
  const [seccional, setSeccional] = useState('');
  const [generationDate, setGenerationDate] = useState(null);
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [dniActivo, setDniActivo] = useState(false);
  const [cardGenerated, setCardGenerated] = useState(false);
  const [dniUsuarios, setDniUsuarios] = useState([]);

  useEffect(() => {
    console.log('Entered DNI:', dni);

    if (dni) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      setGenerationDate(formattedDate);
    }

    const dnis2 = JSON.stringify(dnis, null, 2);
    setDniUsuarios(dnis2);

    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    setUniqueNumber(randomNumber);
  }, [dni]);

  const generateQRValue = () => {
    const uniqueNumberText = uniqueNumber ? `\nN° Único: ${uniqueNumber}` : '';
    const data =
      `PE.CI.FA Afiliado/a activo\n` +
      `Nombre y apellido: ${name} ${lastName}\n` +
      `N° DNI: ID:${dni}\n` +
      `Seccional: ${seccional}\n` +
      `Destino: ${organismo}` +
      uniqueNumberText;
    return data;
  };

  const handleValidarDatos = async () => {
    try {
      if (dniUsuarios.includes(dni)) {
        setDniActivo(true);
        alert(`El Afiliado con DNI ${dni} se encuentra activo ¡Generando carnet digital "Validez 24hs"`);
        setCardGenerated(true);
      } else {
        setDniActivo(false);
        alert(`El DNI ${dni} No está Activo. No se puede generar el carné digital.`);
      }
    } catch (error) {
      console.error('Error al validar DNIs activos:', error);
    }
  };

  const generatePdf = async () => {
    try {
      const qrCodeSvg = (
        <QRCode
          value={generateQRValue()}
          size={100}
          color="black"
          backgroundColor="white"
        />
      );

      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              #card-container {
                background-image: url('${ExpoFileSystem.documentDirectory}fondo02.jpg');
                background-size: cover;
                width: 250px;
                height: 200px;
                padding: 10px;
                box-sizing: border-box;
              }
              #logo {
                width: 112px;
                height: 112px;
                margin-bottom: 10px;
              }
              #qr-container {
                width: 110px;
                height: 110px;
                border-width: 2.5px;
                border-color: #ffbe08;
                justify-content: center;
                align-items: center;
                margin-left: 10px;
                border-radius: 6px;
              }
              #unique-number-text {
                text-align: center;
                color: black;
                position: absolute;
                top: 230px;
                right: -30px;
                font-size: 12px;
                transform: rotate(90deg);
              }
              #date-text {
                text-align: right;
                color: black;
                margin-top: 10px;
              }
              #union-text {
                text-align: center;
                margin-top: 10px;
                font-weight: bold;
              }
              .secretario-text {
                font-size: 14px;
                font-weight: bold;
                color: #ff0000; /* Cambia el color que desees */
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div id="card-container">
              <img src="${ExpoFileSystem.documentDirectory}escudo2014.png" id="logo" alt="Logo" />
              <p style="font-weight: bold; text-align: center;">TITULAR ACTIVO</p>
              <p>Nombre: ${name}</p>
              <p>Apellido: ${lastName}</p>
              <p>DNI: ${dni}</p>
              <p>Seccional: ${seccional}</p>
              ${dni === '30407303' ? '<p class="secretario-text">Secretario General Adjunto</p>' : ''}
              <p>Destino: ${organismo}</p>
              <!-- ... (resto del código) ... -->
            </div>
            ${uniqueNumber ? `<p id="unique-number-text">N° ${uniqueNumber}</p>` : ''}
            ${dni ? `<p id="date-text">Fecha de Generación: ${generationDate}</p>` : ''}
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'carnet',
        directory: 'Documents',
      };

      const pdf = await printToFileAsync(options);
      await shareAsync(pdf.uri);
    } catch (error) {
      console.error('Error al generar y compartir el PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={[styles.container, { backgroundColor: '#f9f8f6' }]}>
        <Image source={pecifacarnet} style={styles.headerImage} />
        <Text style={styles.title}>¡Obtené tu carnet digital completando el siguiente formulario con tus datos!</Text>
        <Input placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
        <Input placeholder="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
        <Input placeholder="DNI" value={dni} onChangeText={setDni} keyboardType="number-pad" style={styles.input} />
        <Input placeholder="Destino (Organismo)" value={organismo} onChangeText={setOrganismo} style={styles.input} />
        <Input placeholder="Seccional" value={seccional} onChangeText={setSeccional} style={styles.input} />

        <Button title="Validar datos" onPress={handleValidarDatos} style={styles.button} />

        {dniActivo && (
          <ImageBackground
            source={fondo05}
            style={styles.card}
            resizeMode="cover"
          >
            <View style={styles.cardContent}>
              <View style={styles.leftContent}>
                <Image source={escudo2014} style={styles.logo} />
                <View style={styles.textContainer}>
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    Nombre: {name}
                  </Text>
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    Apellido: {lastName}
                  </Text>
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    DNI: {dni}
                  </Text>
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    Seccional: {seccional}
                  </Text>
                 
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    Destino: {organismo}
                  </Text>
                  <Text style={styles.singleLineText} ellipsizeMode="tail" numberOfLines={1}>
                    Seccional: {seccional}
                  </Text>
                  {dni === '30407303' && (
                    <Text style={styles.secretarioText}>Secretario General Adjunto Comisión Nacional</Text>
                  )}
                  {dni === '33391112' && (
                    <Text style={styles.secretarioText}>Secretario Administrativo Comisión Nacional</Text>
                  )}
                   {dni === '28853119' && (
                    <Text style={styles.secretarioText}>Vocal Suplente Comisión Nacional</Text>
                  )}
                  {dni === '31439909' && (
                    <Text style={styles.secretarioText}>Prosecretario Gremial Comisión Nacional</Text>
                  )}
                   {dni === '5266364' && (
                    <Text style={styles.secretarioText}>Secretario Gremial Comisión Nacional</Text>
                  )}
                   {dni === '23089746' && (
                    <Text style={styles.secretarioText}>Secretario acción Social Comisión Nacional</Text>
                  )}
                  {dni === '18520701' && (
                    <Text style={styles.secretarioText}>Pro secretaria de Acción Social Comisión Nacional</Text>
                  )}
                  {dni === '11998420' && (
                    <Text style={styles.secretarioText}>Secretaria de Actas Comisión Nacional</Text>
                  )}
                     {dni === '21183065' && (
                    <Text style={styles.secretarioText}>Vocal titular Comisión Nacional</Text>
                  )}
                     {dni === '21183065' && (
                    <Text style={styles.secretarioText}>Vocal titular Comisión Nacional</Text>
                  )}

                     {dni === '12738857' && (
                    <Text style={styles.secretarioText}>Pro Secretario de Hacienda Comisión Nacional</Text>
                  )}
                     {dni === '22463553' && (
                    <Text style={styles.secretarioText}>Pro secretario de Prensa y CulturaComisión Nacional</Text>
                  )}

                  {dni === '24414882' && (
                    <Text style={styles.secretarioText}>Delegada</Text>
                  )}
                </View>
              </View>
              <View style={styles.qrContainer}>
                {dni ? (
                  <QRCode value={generateQRValue()} />
                ) : (
                  <Text>Ingrese DNI para generar código QR</Text>
                )}
                {uniqueNumber && (
                  <Text style={styles.uniqueNumberText}>N° {uniqueNumber} </Text>
                )}
              </View>
            </View>
            {dni && (
              <Text style={styles.dateText}>{generationDate}</Text>
            )}
            <View style={styles.unionTextContainer}>
              <Text style={styles.unionText}>¡Valido por 24hs!</Text>
            </View>
            {cardGenerated && (
              <IconButton
                icon={() => <MaterialCommunityIcons name="download" size={26} color="#105b91" />}
                
                style={[styles.button, { alignSelf: 'flex-end', marginTop: -30 }]}
              />
            )}
          </ImageBackground>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  unionTextContainer: {
    marginTop: 55,
    textAlign: 'right',
  },
  secretarioText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffd43e', // Cambia el color que desees
    marginTop: 7, // Ajusta el espacio entre "Seccional" y "Secretario General Adjunto"
  },
  unionText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 6,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 25, // Aumenta el tamaño del texto
    fontWeight: 'bold',
    marginBottom: 16, // Aumenta el espacio inferior
    textAlign: 'center',
    color: '#105b91', // Cambia el color del texto
    textShadowColor: 'rgba(0, 0, 0, 0.45)', // Agrega sombra al texto
    textShadowOffset: { width: 1.6, height: 2 }, // Configura la sombra
    textShadowRadius: 5, // Ajusta la intensidad de la sombra
  },
  
  input: {
    borderBottomWidth: 1.5,
    marginBottom: -6,
    fontSize: 16,
  },
  card: {
    marginTop: 32,
    padding: 15,
    borderWidth: 2.7,
    borderColor: '#ffbe08',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 8,
      shadowOpacity: 0,
      shadowRadius: 10,
      elevation: 8,
    },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 0,
    textAlign: 'center',
  },
  logo: {
    width: 95,
    height: 95,
    marginTop: -10,
  },
  boldUnderlined: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  singleLineText: {
    overflow: 'hidden',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  qrContainer: {
    position: 'relative',
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 4,
    top: -7,
  },
  uniqueNumberText: {
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 110,
    right: 30,
    fontSize: 8,
  },
  dateText: {
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    right: -18,
    top: 55,
    transform: [{ rotate: '90deg' }],
  },
  button: {
    marginTop: 20,
    color: '',
  },
});

export default DataEntryScreen;
