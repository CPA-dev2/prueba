import React, { Component } from 'react';
import { Container, Spinner, Button } from "native-base";
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {StyleSheet, Dimensions, Image, Alert, Modal, PermissionsAndroid} from 'react-native';
import estilos from "./styles";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import TabCliente from "../../../../container/SolicitudContainer/Vista/TabClienteContainer";
import TabSolicitud from "../../../../container/SolicitudContainer/Vista/TabSolicitudContainer";
import ModalRechazo from './ModalRechazo';
import { fotos } from "../../../../utils/fotos";


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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  aceptacion() {
    Alert.alert(
      "Pre-autorizar solicitud",
      "¿Está seguro de pre-autorizar la solicitud de crédito?",
      [
        {text: 'Aceptar', onPress: () => this.props.preautorizarSolicitud(this.props.navigation)},
        {text: 'Cancelar'}
      ],
    );
  }
  rechazo(opcion) {
    this.props.rechazarSolicitud(opcion, this.props.navigation);
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{backgroundColor:"#1E78C2"}} indicatorStyle={{backgroundColor:"#C53819"}} />;

  render () {
    const { navigation, loader, irImagen } = this.props;
    const PrimerRuta = () => <TabCliente style={[ styles.container ]} navigation={navigation} irImagen={irImagen} />;
    const SegundaRuta = () => <TabSolicitud style={[ styles.container ]} navigation={navigation} irImagen={irImagen} />;
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
        <Button style={{...estilos.flotante, ...estilos.aceptacion}} onPress={() => {
          Alert.alert(
            "Pre-autorizar solicitud",
            "¿Está seguro de pre-autorizar la solicitud de crédito?",
            [
              {
                text: 'Aceptar',
                onPress: () => this.props.preautorizarSolicitud(this.props.navigation)
              },
              {text: 'Cancelar'}
            ],
          );
        }}>
          {(!loader) && (<Image style={estilos.imagenes_flotantes} source={fotos.aceptar} />)}
          {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
        </Button>
        <Button style={{...estilos.flotante, ...estilos.rechazo}} onPress={() => this.setModalVisible(true)}>
          <Image style={estilos.imagenes_flotantes} source={fotos.rechazar} />
        </Button>
        <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalVisible}>
          <ModalRechazo navigation={this.props.navigation} cerrar={(opcion) => {
            this.setModalVisible(!this.state.modalVisible);
            if (opcion) {
              this.rechazo(opcion);
            }
          }}/>
        </Modal>
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
