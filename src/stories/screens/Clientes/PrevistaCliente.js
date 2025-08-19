import React, { Component } from 'react';
import { Container, Spinner, Button, Text, View, Icon, Item, Input } from "native-base";
import { Image, AppRegistry, TouchableHighlight } from 'react-native';
import styles from "./styles";
import { estilos } from "../../../utils/estilos";
import { URL_BASE } from "../../../utils/variables";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { fotos } from "../../../utils/fotos";


class PrevistaCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {paso: 1, dpi: ''};
  }
  render() {
    const { loader, navigation, nuevo_cliente } = this.props;
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={"Cliente"} navigation={navigation} />
        <View style={styles.content}>
          <Text style={styles.existente}>Cliente existente</Text>
        </View>
        {(nuevo_cliente.dpi) && (<View style={styles.cliente}>
          <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 75}} transparent onPress={() => {
            if (nuevo_cliente.foto) {
              this.props.irImagen(`${nuevo_cliente.foto}`, navigation);
            }
          }}>
            <Image style={styles.imagen} source={ (typeof nuevo_cliente.foto_cropped === "string" && nuevo_cliente.foto_cropped !== "") ? {uri: `${nuevo_cliente.foto_cropped && nuevo_cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${nuevo_cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } />
          </TouchableHighlight>
          <Text style={styles.nombre}>{nuevo_cliente.nombres} {nuevo_cliente.apellidos}</Text>
          <Text style={styles.direccion}>{nuevo_cliente.direccion}</Text>
          <View padder>
            <Button style={styles.boton} block onPress={() => navigation.navigate("PerfilCliente")}>
              {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
              <Text>Ver perfil</Text>
            </Button>
            <Button style={styles.boton_blanco} block onPress={() => navigation.navigate('BuscarClientes')}>
              <Text style={styles.azul}>Regresar</Text>
            </Button>
          </View>
        </View>)}
      </Container>
    );
  }
}
AppRegistry.registerComponent('DisplayAnImage', () => PrevistaCliente);

export default PrevistaCliente;
