import React, { Component } from 'react';
import { Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import styles from './styles';


class Micronegocio extends Component {
  render () {
    const { info } = this.props;
    return (
      <View>
        <Text style={styles.bottomEncabezado}>Datos del Negocio</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Nombre:</Text>
            <Text style={styles.bottomInfo}>{info.nombre_negocio}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Direccion:</Text>
            <Text style={styles.bottomInfo}>{info.direccion_negocio}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono:</Text>
            <Text style={styles.bottomInfo}>{info.telefono_negocio}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Antigüedad de negocio:</Text>
            <Text style={styles.bottomInfo}>{info.tiempo_laborar}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Observaciones:</Text>
            <Text style={styles.bottomInfo}>{info.observaciones}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Micronegocio;
