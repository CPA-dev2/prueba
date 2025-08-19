import React, { Component } from 'react';
import { Container, Content, Button, Text, View, Input, Item } from "native-base";
import { Keyboard } from 'react-native';
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import { estilos } from "../../../../utils/estilos";
import { validations } from "../../../../utils/validation";

class ModalJustificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {justificacion: ""};
  }
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Navbar titulo={'Rechazo de Referencia'} navigation={navigation} regresar={this.props.cerrar}/>
        <Text style={{...styles.bottomTitulo, fontWeight:"bold", padding:15, fontSize: 20}}>Por favor indica cúal ha sido la mala referencia</Text>
        <Content style={{padding:15}}>
          <Item style={styles.input}>
            <Input value={this.state.justificacion} onSubmitEditiong={() => {
              Keyboard.dismiss();
              this.props.cerrar(this.state.justificacion);
            }} onChangeText={justificacion => this.setState({justificacion})}/>
            <Text style={estilos.inputError}>{validations.required(this.state.justificacion)}</Text>
          </Item>
          <View padder style={{flexDirection:"row", justifyContent:"center"}}>
            <Button style={styles.boton_cancelar} block onPress={() => this.props.cerrar()}>
              <Text>Cancelar</Text>
            </Button>
            <Button style={styles.boton} block onPress={() => this.props.cerrar(this.state.justificacion)}>
              <Text>Aceptar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ModalJustificacion;
