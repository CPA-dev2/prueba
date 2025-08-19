import React, { Component } from 'react';
import { Container, Spinner, Button, Text, View, Icon, Item, Input,Toast } from "native-base";
import { Keyboard } from "react-native";
import styles from "./styles";
import { estilos } from "../../../utils/estilos";
import { validations } from "../../../utils/validation";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";

class BusquedaCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {paso: 1, dpi: ''};
    this.validarDpi = this.validarDpi.bind(this);
  }
  UNSAFE_componentWillMount(){
    this.setState({dpi: ''});
  }

  validarDpi(){
    if(this.state.dpi===""){
      Toast.show({
        text: "Ingrese un DPI valido",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
      return;
    }
    this.props.verificarDPI(this.state.dpi, this.props.navigation);
    console.log(this.state.dpi);
  }

  render() {
    const { loader, navigation } = this.props;
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={"Nuevo cliente"} navigation={navigation} regresar={() => navigation.popToTop()}/>
        <View style={styles.content}>
          <Text style={styles.buscar}>Buscar por medio de DPI</Text>
          <Item style={styles.busqueda_container}>
            <Input keyboardType={"numeric"} style={styles.busqueda} placeholder=""
                   onSubmitEditing={() => {
                     Keyboard.dismiss();
                     this.props.verificarDPI(this.state.dpi, navigation);
                   }} onChangeText={dpi => this.setState({dpi})}/>
            <Text style={estilos.inputError}>{validations.dpi(this.state.dpi)}</Text>
            <Icon style={styles.busqueda} name="search"/>
          </Item>
        </View>
        <View padder>
          <Button style={styles.boton} block 
            onPress={() => {
              this.validarDpi();
              Keyboard.dismiss()
              // this.props.verificarDPI(this.state.dpi, navigation);
            }}
          >
            {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
            <Text>Siguiente</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default BusquedaCliente;
