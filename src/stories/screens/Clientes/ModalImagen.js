import React, { Component } from "react";
import {
  Text,
  View
} from "native-base";
import {
  TouchableHighlight,
  Modal,
} from "react-native";
import {launchCamera, launchImageLibrary, } from 'react-native-image-picker';

const RNFS = require('react-native-fs');

import {Alert, PermissionsAndroid} from "react-native";


export default function ModalImagen({modalImage, cerrarModal, editarFotos, peticion}) {
    async function abrirPeticion(key, opcion) {
        const options = {
          title: 'Seleccionar fotografía',
          takePhotoButtonTitle: 'Tomar foto',
          chooseFromLibraryButtonTitle: 'Elegir de galería',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          },
          includeBase64:true,
        };
        //Camera
        
        if (opcion === 1){
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  'title': 'Por favor habilite la camara',
                  'message': 'La aplicación necesita que habilite la camara'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED){

                launchCamera(options, response => {
    
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    }
                    else if (response.error) {
                      console.log('User tapped custom button: ', response.customButton);  
                    }
                    else{
                        console.log(response, "--response")
                        let source = {uri: response.assets[0].uri, nombre: response.assets[0].fileName };
                        const path = RNFS.PicturesDirectoryPath + "/" + source.nombre;
                      
                        RNFS.writeFile(path, response.assets[0].base64, 'base64')
                        .then((success) => {
                            console.log('FILE WRITTEN!');
                        })
                        .catch((err) => {
                            console.log("error", err.message)
                            console.log(err.message);
                        });

                        editarFotos(key, source);
              
                        console.log(source)
                        cerrarModal();
                    }
                })
            }
            else{
                Alert.alert("ACTIVAR PERMISO DE CAMARA", 
                    "La aplicación necesita que habilite la camara"
                );
            }
        }
        
        // Gallery
        if (opcion === 2){
            launchImageLibrary(options, response => {
                console.log('Response = ', response)
                if(response.didCancel){
      
                }
                else if (response.error){
                    console.log("Error", response.error)
                }
                else if (response.customButton){
                    console.log("customer", response.customButton)
                }
                else{
                    console.log(response)
                    let source = {uri: response.assets[0].uri, nombre: response.assets[0].fileName };
                    const path = RNFS.PicturesDirectoryPath + "/" + source.nombre;
                
                    RNFS.writeFile(path, response.assets[0].base64, 'base64')
                        .then((success) => {
                            console.log('FILE WRITTEN!');
                    })
                    .catch((err) => {
                        console.log("error", err.message)
                        console.log(err.message);
                    });
                    editarFotos(key, source);
                    cerrarModal();
                }
            })
        }
    }
    

    const modalContainer = {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    const modalContent = {
        backgroundColor: 'white',
        margin: 20,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffeset: {
          width:0,
          height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius:4,
        elevation:5,
        
    };

    const titleContent = {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }

    const optionContainer = {
        width:'100%',
        marginVertical:10,
    }
    const cerrarContent = {
        display: "flex",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
    }

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalImage}
        onRequestClose={cerrarModal}
        >
            
            <View style={modalContainer}>
                <View style={modalContent}>
                    <Text style={titleContent}>Seleccionar fotografía</Text>

                    <View style={optionContainer}>
                    <TouchableHighlight
                        underlayColor={"#fff"}
                        onPress={() => {
                            abrirPeticion(peticion,1);
                        }}
                    >
                        <Text>Tomar foto</Text>
                    </TouchableHighlight>
                    </View>
                    <View style={optionContainer}>
                    <TouchableHighlight
                        underlayColor={"#fff"}
                        onPress={() => {
                            abrirPeticion(peticion, 2);
                        }}
                    >
                        <Text>Elegir de galeria</Text>
                    </TouchableHighlight>
                    </View>

                    <View style={optionContainer}>
                    <TouchableHighlight onPress={cerrarModal} style={cerrarContent}>
                        <Text>Cancelar</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
