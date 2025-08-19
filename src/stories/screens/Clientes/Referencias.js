import React, { Component } from 'react';
import { Container, Button, Text, View, Item, Input, Content, Toast } from "native-base";
import {Alert, Keyboard} from "react-native";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { estilos } from "../../../utils/estilos";
import styles from "./styles";
import { validations } from "../../../utils/validation";


class Referencias extends Component {
  constructor(props){
    super(props);
    this.state = {
      nombre: props.referencia ? props.referencia.nombre : "",
      parentesco: props.referencia ? props.referencia.parentesco : "",
      direccion: props.referencia ? props.referencia.direccion : "",
      telefono: props.referencia ? props.referencia.telefono : "",
    };
    this.cerrar = this.cerrar.bind(this);
  }

  componentWillMount(){
    const {referencia} = this.props;
    if (referencia){
      if (referencia.cliente){
        this.setState({
          activo: referencia.activo,
          cliente: referencia.cliente,
          id: referencia.id,
          valida: referencia.valida,
        });
      }
    }
  }
  cerrar() {
    if (
      this.state.nombre
      && this.state.direccion
      && this.state.parentesco
      && this.state.telefono
    ) {
      this.props.cerrar(this.state, this.props.referencia);
    } else {
      Alert.alert(
        'Información faltante',
        'Por favor llene la información obligatoria',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={"Referencia cliente"} navigation={navigation} regresar={this.props.cerrar}/>
        <Content>
          <View style={styles.content}>
            <Text style={styles.titulo}>Datos de la referencia</Text>
          </View>
          <View style={styles.formulario}>
            <Text style={styles.nombre}>Nombre</Text>
            <Item style={styles.input}>
              <Input onSubmitEditing={() => Keyboard.dismiss()} value={this.state.nombre} onChangeText={nombre => this.setState({nombre})} />
              <Text style={estilos.inputError}>{validations.required(this.state.nombre)}</Text>
            </Item>
            <Text style={styles.nombre}>Parentesco</Text>
            <Item style={styles.input}>
              <Input onSubmitEditing={() => Keyboard.dismiss()} value={this.state.parentesco} onChangeText={parentesco => this.setState({parentesco})} />
              <Text style={estilos.inputError}>{validations.required(this.state.parentesco)}</Text>
            </Item>
            <Text style={styles.nombre}>Dirección</Text>
            <Item style={styles.input}>
              <Input onSubmitEditing={() => Keyboard.dismiss()} value={this.state.direccion} onChangeText={direccion => this.setState({direccion})} />
              <Text style={estilos.inputError}>{validations.required(this.state.direccion)}</Text>
            </Item>
            <Text style={styles.nombre}>Teléfono</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} onSubmitEditing={() => Keyboard.dismiss()} value={this.state.telefono} onChangeText={telefono => this.setState({telefono})} />
              <Text style={estilos.inputError}>{validations.phone(this.state.telefono)}</Text>
              <Text style={estilos.inputError}>{validations.required(this.state.telefono)}</Text>
            </Item>
          </View>
          <View padder>
            <Button style={styles.boton} block onPress={() => this.cerrar()}>
              <Text>Aceptar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Referencias;
