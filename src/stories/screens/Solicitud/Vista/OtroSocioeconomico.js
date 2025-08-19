import React, { Component } from 'react';
import { Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import styles from './styles';
import {Keyboard} from "react-native";
import {colors} from "../../../../utils/colors";


class OtroSocioeconomico extends Component {
  render () {
    const { info } = this.props;
    return (
      <View>
        <Text style={styles.bottomEncabezado}>Datos de actividad económica</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Ocupación actual</Text>
            <View style={{ borderBottomColor: colors.Negro, borderBottomWidth: .75}}>
              <Picker style={styles.picker} selectedValue={info.ocupacion !== null ? info.ocupacion.toString() : ""} enabled={false}>
                <Picker.Item label="Estudiante" value="1" />
                <Picker.Item label="Ama de casa" value="2" />
                <Picker.Item label="Agricultor" value="3" />
                <Picker.Item label="Jubilado" value="4" />
                <Picker.Item label="Profesional" value="5" />
              </Picker>
            </View>
          </View>
          <View style={styles.bottomSeccion}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Dirección donde ejerce</Text>
              <Text style={styles.bottomInfo}>{info.direccion_negocio}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={{...styles.bottomTitulo, marginBottom:25}}>Ingreso promedio</Text>
            <Text style={styles.bottomInfo}>{info.ingreso_promedio}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Periocidad de ingresos</Text>
            <View>
              <View style={{ borderBottomColor: colors.Negro, borderBottomWidth: .75}}>
                <Picker style={styles.picker}
                        selectedValue={info.periocidad_ingresos !== null ? info.periocidad_ingresos.toString() : ""} enabled={false}>
                  <Picker.Item label="Diario" value="DIARIO" />
                  <Picker.Item label="Semanal" value="SEMANAL" />
                  <Picker.Item label="Quincenal" value="QUINCENAL" />
                  <Picker.Item label="Mensual" value="MENSUAL" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default OtroSocioeconomico;
