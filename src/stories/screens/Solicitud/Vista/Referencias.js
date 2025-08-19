import React, { Component } from 'react';
import { Image, Alert, Modal } from 'react-native';
import { Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import styles from './styles';
import { fotos } from "../../../../utils/fotos";
import ModalJustificacion from './ModalJustificacion';


class Referencias extends Component {
  constructor(props) {
    super(props);
    this.verificar = this.verificar.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.rechazar = this.rechazar.bind(this);
    this.state = {modalVisible:false,id:0};
  }
  verificar (tipo, id) {
    Alert.alert(
      `Marcar como ${tipo ? "buena" : "mala"} referencia`,
      `Está seguro de marcar como ${tipo ? "buena" : "mala"} esta referencia`,
      [
        {text: 'Aceptar', onPress: () => this.props.validarReferencia(tipo, id)},
        {text: 'Cancelar'}
      ],
    );
  }
  rechazar(id) {
    this.setState({id});
    this.setModalVisible(true);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render () {
    const { info, navigation } = this.props;
    return (
      <View>
        <Text style={styles.bottomEncabezado}>Referencias</Text>
        <View style={styles.bottomDatos}>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Nombre</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Teléfono</Text>
          </View>
          <View style={styles.bottomSeccion}>
            <Text style={styles.bottomTitulo}>Estado</Text>
          </View>
        </View>
        {(info.map((referencia) => {
          return (
            <View key={referencia.id} style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomInfo}>{referencia.nombre}</Text>
              </View>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomInfo}>{referencia.telefono}</Text>
              </View>
              <View style={styles.bottomSeccion}>
                {(referencia.valida) && (
                    <View style={styles.bottomDatos}>
                      <Image style={styles.acciones} source={fotos.up_s}/>
                    </View>
                  )}
                {(referencia.valida === false) && (
                    <View style={styles.bottomDatos}>
                      <Image style={styles.acciones} source={fotos.down_s}/>
                    </View>
                  )}
                {(referencia.valida === null) && (
                    <View style={styles.bottomDatos}>
                      <Image style={styles.acciones} source={fotos.llamada}/>
                    </View>
                  )}
              </View>
            </View>
          );
        }))}
        <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalVisible}>
          <ModalJustificacion navigation={this.props.navigation} cerrar={(opcion) => {
            this.setModalVisible(!this.state.modalVisible);
            if (opcion) {
              this.props.validarReferencia(false, this.state.id, opcion, navigation);
            }
          }}/>
        </Modal>
      </View>
    );
  }
}

export default Referencias;
