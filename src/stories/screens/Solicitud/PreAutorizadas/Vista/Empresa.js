import React, { Component } from 'react';
import { Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import styles from './styles';


class Empresa extends Component {
  render () {
    const { info } = this.props;
    return (
      <View>
        <Text style={styles.bottomEncabezado}>Datos del Empleado</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Nombre o razón social:</Text>
            <Text style={styles.bottomInfo}>{info.razon_empresa}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Tipo de empresa:</Text>
            <Text style={styles.bottomInfo}>{info.read_tipo_empresa}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Giro de la empresa:</Text>
            <Text style={styles.bottomInfo}>{info.actividad_empresa}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Dirección:</Text>
            <Text style={styles.bottomInfo}>{info.direccion_empresa}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono de la empresa:</Text>
            <Text style={styles.bottomInfo}>{info.telefono_empresa}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Nombre de quien gira constancias laborales:</Text>
            <Text style={styles.bottomInfo}>{info.nombre_constancias}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono de quien gira constancias:</Text>
            <Text style={styles.bottomInfo}>{info.telefono_constancias}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Tiempo que lleva funcionando la empresa:</Text>
            <Text style={styles.bottomInfo}>{info.tiempo_funcionamiento_empresa}</Text>
          </View>
        </View>
        {/* DATOS DEL TRABAJADOR*/}
        <Text style={styles.bottomEncabezado}>Datos del Trabajador</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Puesto de trabajo:</Text>
            <Text style={styles.bottomInfo}>{info.puesto_trabajo}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Tiempo de laborar:</Text>
            <Text style={styles.bottomInfo}>{info.tiempo_trabajar}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Departamento o sucursal donde labora:</Text>
            <Text style={styles.bottomInfo}>{info.departamento_laboral}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Salario nominal:</Text>
            <Text style={styles.bottomInfo}>{info.salario_nominal}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Otros ingresos:</Text>
            <Text style={styles.bottomInfo}>{info.otros_ingresos}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Descuentos:</Text>
            <Text style={styles.bottomInfo}>{info.descuentos}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Salario líquido:</Text>
            <Text style={styles.bottomInfo}>{info.salario_liquido}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Paga IGSS:</Text>
            <Text style={styles.bottomInfo}>{info.paga_igss}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Jefe inmediato:</Text>
            <Text style={styles.bottomInfo}>{info.nombre_jefe}</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono del jefe inmediato:</Text>
            <Text style={styles.bottomInfo}>{info.telefono_jefe}</Text>
          </View>
        </View>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>No. Cuenta Nómina:</Text>
            <Text style={styles.bottomInfo}>{info.cuenta_nomina}</Text>
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

export default Empresa;
