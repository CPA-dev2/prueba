import React, { Component } from 'react';
import { Image, Alert, Modal } from 'react-native';
import { Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import styles from './styles';
import { fotos } from "../../../../../utils/fotos";

class Referencias extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible:false,id:0};
  }
  render () {
    const { info, navigation } = this.props;
    return (
      <View>
        <Text style={styles.bottomEncabezado}>Referencias</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Nombre</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Estado</Text>
          </View>
        </View>
        {(info.map((referencia) => {
          return (
            <View key={referencia.id} style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomInfo}>{referencia.nombre}</Text>
              </View>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomInfo}>{referencia.telefono}</Text>
              </View>
              <View style={styles.bottomSeccion}>
                {(referencia.valida) && (
                    <View style={styles.bottomDatos}>
                      <Image style={styles.acciones} source={fotos.up_s}/>
                    </View>
                  )}
                {(!referencia.valida) && (
                    <View style={styles.bottomDatos}>
                      <Image style={styles.acciones} source={fotos.down_s}/>
                    </View>
                  )}
              </View>
            </View>
          );
        }))}
      </View>
    );
  }
}

export default Referencias;
