import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content, Button, Text, View, Input, Item, Textarea } from "native-base";
import { Keyboard, Alert } from 'react-native';
import Navbar from "../../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import { estilos } from "../../../../../utils/estilos";
import { validations } from "../../../../../utils/validation";

class ModalCambioSolicitud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motivo_reduccion: "",
      nuevo_monto: ""
    };
    this.cerrar = this.cerrar.bind(this);
  }
  cerrar() {
    if ((this.state.motivo_reduccion) && (validations.monto(this.state.nuevo_monto) === undefined) &&
      (this.props.monto > parseInt(this.state.nuevo_monto))) {
      this.props.cerrar(this.state.nuevo_monto, this.state.motivo_reduccion);
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Navbar titulo={'Reducción de monto'} navigation={navigation} regresar={this.props.cerrar}/>
        <Content style={{padding:15}}>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Monto actual</Text>
          <Item style={styles.input}>
            <Input value={this.props.monto.toString()} disabled/>
          </Item>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Monto reducido</Text>
          <Item style={styles.input}>
            <Input value={this.state.nuevo_monto.toString()} keyboardType={"numeric"} onSubmitEditiong={() => {
              Keyboard.dismiss();
            }} onChangeText={nuevo_monto => this.setState({nuevo_monto})}/>
            <Text style={estilos.inputError}>{validations.required(this.state.nuevo_monto)}</Text>
            <Text style={estilos.inputError}>{validations.monto(this.state.nuevo_monto)}</Text>
          </Item>
          {(parseInt(this.state.nuevo_monto) > this.props.monto) && (<Text style={estilos.inputError}>EL NUEVO MONTO NO PUEDE SER MAYOR AL ACTUAL</Text>)}
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Motivo del cambio</Text>
          <Textarea style={{flex: 1}} value={this.state.motivo_reduccion.toString()} multiline={true} rowSpan={4}
                    onChangeText={motivo => this.setState({motivo_reduccion: motivo})}/>
          <Text style={estilos.inputError}>{validations.required(this.state.motivo_reduccion)}</Text>
          <View padder style={{flexDirection:"row", justifyContent:"center"}}>
            <Button style={styles.boton_cancelar} block onPress={() => this.props.cerrar()}>
              <Text>Cancelar</Text>
            </Button>
            <Button style={styles.boton} block onPress={() => this.cerrar()}>
              <Text>Guardar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ModalCambioSolicitud;
