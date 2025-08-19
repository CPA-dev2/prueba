import React, { Component } from 'react';
import { Container, Content, Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { StyleSheet, Dimensions, Image, Alert, Modal } from 'react-native';
import estilos from "./styles";
import Navbar from "../../../../../container/NavbarContainer/NavbarContainer";
import TabCliente from "../../../../../container/SolicitudContainer/PreAutorizadaVista/TabClientePreautorizadaContainer";
import TabSolicitud from "../../../../../container/SolicitudContainer/PreAutorizadaVista/TabPreautorizadaContainer";
import ModalRechazo from './ModalRechazo';
import { fotos } from "../../../../../utils/fotos";


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class VistaSolicitud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Perfil de Usuario' },
        { key: 'second', title: 'Solicitud de Crédito' },
      ],
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.aceptacion = this.aceptacion.bind(this);
    this.rechazo = this.rechazo.bind(this);
  }
  componentWillMount(){
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  aceptacion() {
    Alert.alert(
      "Autorizar solicitud",
      "¿Está seguro de Autorizar la solicitud de crédito?",
      [
        {text: 'Aceptar', onPress: () => this.props.autorizarSolicitud(this.props.solicitud_seleccionada.id,
            this.props.solicitud_seleccionada.monto , this.props.navigation)},
        {text: 'Cancelar'}
      ],
    );
  }
  rechazo() {
    Alert.alert(
      "Rechazar solicitud",
      "¿Está seguro de Rechazar la solicitud de crédito?",
      [
        {text: 'Aceptar', onPress: () => this.props.rechazarSolicitud(this.props.solicitud_seleccionada.id , this.props.navigation)},
        {text: 'Cancelar'}
      ],
    );
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{backgroundColor:"#1E78C2"}} indicatorStyle={{backgroundColor:"#C53819"}} />;

  render () {
    const { navigation } = this.props;
    const PrimerRuta = () => <TabCliente style={[ styles.container ]} navigation={navigation} />;
    const SegundaRuta = () => <TabSolicitud style={[ styles.container ]} navigation={navigation} />;
    return (
      <Container ref={ref => this.scrollView = ref}>
        <Navbar titulo={"Visualización"} navigation={navigation} />
        <TabViewAnimated
          navigationState={this.state}
          renderScene={SceneMap({
            first: PrimerRuta,
            second: SegundaRuta,
          })}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
        <Button style={{...estilos.flotante, ...estilos.aceptacion}} onPress={() => this.aceptacion()}>
          <Image style={estilos.imagenes_flotantes} source={fotos.aceptar} />
        </Button>
        <Button style={{...estilos.flotante, ...estilos.rechazo}} onPress={() => this.rechazo()}>
          <Image style={estilos.imagenes_flotantes} source={fotos.rechazar} />
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VistaSolicitud;
