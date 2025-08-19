import React, { Component } from 'react';
import { Container, Content, Button, Text, View, Item, Picker } from "native-base";
import Navbar from "../../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";

class ModalRechazo extends Component {
  constructor(props) {
    super(props);
    this.state = {opcion: 1};
  }
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Navbar titulo={'Rechazo de Solicitud'} navigation={navigation} regresar={this.props.cerrar}/>
        <Text style={{...styles.bottomTitulo, fontWeight:"bold", padding:15, fontSize: 20}}>Por favor indica el motivo por el cual se está rechazando la solicitud</Text>
        <Content style={{padding:15}}>
          <View style={styles.input}>
            <Picker style={{...styles.picker, marginRight:15, marginLeft:15}} selectedValue={this.state.opcion} onValueChange={(opcion) => this.setState({opcion})}>
              <Picker.Item label="Domicilio inexistente" value="1" />
              <Picker.Item label="Cliente sin capacidad de pago" value="2" />
              <Picker.Item label="Mala referencia de vecinos" value="3" />
              <Picker.Item label="Garantías no cubren" value="4" />
              <Picker.Item label="Clientes sin actividad económica definida" value="5" />
              <Picker.Item label="Desistimiento por parte del cliente" value="6" />
              <Picker.Item label="Cliente no puede identificarse" value="7" />
              <Picker.Item label="Cliente prestanombre o sujeto de fraude" value="8" />
              <Picker.Item label="Sin comprobante de domicilio" value="9" />
            </Picker>
          </View>
          <View padder style={{flexDirection:"row", justifyContent:"center"}}>
            <Button style={styles.boton_cancelar} block onPress={() => this.props.cerrar()}>
              <Text>Cancelar</Text>
            </Button>
            <Button style={styles.boton} block onPress={() => this.props.cerrar(this.state.opcion)}>
              <Text>Aceptar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ModalRechazo;
