import React, { Component } from 'react';
import { RefreshControl, Image } from "react-native";
import { Container, Content, Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker, Toast } from "native-base";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import Buscador from "../../Navbar/Buscador";
import styles from "./styles";
import { fotos } from "../../../../utils/fotos";


class ListadoSolicitud extends Component {
  constructor(props){
    super(props);
    this.state = {search: true};
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  componentWillMount() {
    this.props.getListado();
  }
  toggleNavbar() {
    this.setState({search: !this.state.search});
  }
  _onRefresh() {
    this.props.getListado();
  }
  render() {
    const { solicitudes_filtro, loader, navigation, filtrarSolicitudes } = this.props;
    return (
      <Container>
        {(this.state.search) ? (
            <Navbar regresar={() => {navigation.popToTop();}} titulo={"Solicitudes pendientes"} navigation={navigation} imagen={fotos.lupa} cerrar={() => {this.toggleNavbar();}}/>)
          : (
            <Buscador placeholder={"Buscar por No. de DPI"} salir={this.toggleNavbar} inputChange={filtrarSolicitudes}/>
          )}
        <Content style={{backgroundColor: 'white'}} refreshControl={<RefreshControl refreshing={loader}
            onRefresh={this._onRefresh.bind(this)} />}>
          {(loader) ? (
            <View><Text style={styles.text_center}>Cargando información...</Text></View>
          ) : (
            <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 2, ...styles.text_center}}>Nombre</Text>
              <Text style={{ flex: 2, ...styles.text_center}}>DPI</Text>
              <Text style={{ flex: 1, ...styles.text_center}}>Acciones</Text>
            </View>
            {(solicitudes_filtro.map((solicitud) => {
              return (<View key={solicitud.id} style={{ flexDirection: "row", alignItems:"center" }}>
                <View style={{ ...styles.titulo_nombre, flex: 2, flexDirection: "column"}}>
                  <Text style={{...styles.appellidos}}>{solicitud.cliente.apellidos},</Text>
                  <Text style={{...styles.nombres}}>{solicitud.cliente.nombres}</Text>
                </View>
                <Text style={{ ...styles.text_gray, flex: 2}}>{solicitud.cliente.dpi}</Text>
                <Button transparent
                        style={{ ...styles.titulo_nombre, flex: 1, justifyContent:"center"}}
                        onPress={() => {
                          this.props.setSolicitudSeleccionada(solicitud);
                          navigation.navigate("VistaSolicitud");
                        }}>
                  <Image style={{ ...styles.ojo, backgroundColor: "#FFF"}} source={require("../../../../../images/icons/ver.png")}/>
                </Button>
              </View>);
            }))}
          </View>
          )}
        </Content>
      </Container>
    );
  }
}

export default  ListadoSolicitud;
