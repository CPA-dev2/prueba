import React, { Component } from 'react';
import _ from "lodash";
import { Container, Content, Spinner, Button, Text, View, ScrollView, Item, Icon, Input, Picker, Toast } from "native-base";
import {RefreshControl, Image, TouchableHighlight, Alert, Modal, Keyboard} from "react-native";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import PagosRegistrados from "./PagosRegistrados";
import styles from "./styles";
import {fotos} from "../../../../utils/fotos";
import { colors } from "../../../../utils/colors";


class Referencias extends Component {
  constructor(props){
    super(props);
    // this.props.listarCarteras(1);
    this.state = {modalVisible: false};
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  _onRefresh() {
    this.props.listarCarteras(1);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  get_pendiente(pago_actual){
    if (pago_actual !== undefined){
      return (this.props.cartera_seleccionada.monto_pendiente - ((pago_actual.capital + pago_actual.interes) - pago_actual.pago)).toFixed(2);
    } else {
      return this.props.cartera_seleccionada.monto_pendiente !== null ? this.props.cartera_seleccionada.monto_pendiente.toFixed(2) : 0;
    }
  }

  se_pagara = monto => monto <= 0

  render() {
    const { navigation, cartera_seleccionada, loader , pago_actual, datos_pago} = this.props;
    return (
      <Container>
        <Navbar regresar={() => {navigation.navigate("Carteras");}} titulo={"Cartera de cliente"} navigation={navigation}/>
        <Content style={{backgroundColor: 'white'}}>
            <View style={{...styles.container}}>
              <View style={styles.row} >
                <View style={styles.col_12} >
                  <Text style={styles.encabezado}>Cliente</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.text_gray}>{`${cartera_seleccionada.cliente.nombres}, ${cartera_seleccionada.cliente.apellidos}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.encabezado}>Saldo pendiente</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ flex:1, ...styles.text_gray }}>Q. {cartera_seleccionada.saldo_pendiente ? cartera_seleccionada.saldo_pendiente.toFixed(2) : 0}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.encabezado}>Detalle del día</Text>
              </View>
              <View style={styles.row}>
                <Text style={{...styles.texto, flex:1 }}>Moras atrasadas</Text>
                <Text style={{...styles.texto, flex:1 }}>Cuotas atrasadas</Text>
                <Text style={{...styles.texto, flex:1 }}>Cuota del dia</Text>
              </View>
              <View style={{...styles.row, marginBottom:40}}>
                <Text style={{...styles.text_gray, flex:1 }}>Q. {cartera_seleccionada.monto_mora_pendiente !== null ?
                  cartera_seleccionada.monto_mora_pendiente.toFixed(2) : 0}</Text>
                <Text style={{...styles.text_gray, flex:1 }}>Q. {this.get_pendiente(pago_actual)}</Text>
                <Text style={{...styles.text_gray, flex:1 }}>Q. {pago_actual !== undefined ?
                  ((pago_actual.capital + pago_actual.interes) - pago_actual.pago).toFixed(2) : 0}</Text>
              </View>
              {(cartera_seleccionada.monto_mora_pendiente !== null) && (
                <View>
                  <View style={styles.row}>
                    <Text style={styles.text_gray}>Abono a moras</Text>
                  </View>
                  <View style={{...styles.row, marginBottom:10, width:250}}>
                    <Item style={{...styles.input, flex:1, marginBottom:30}}>
                      <Input
                        keyboardType={"numeric"}
                        disabled={
                          cartera_seleccionada.monto_mora_pendiente == null ||
                          !!this.se_pagara(cartera_seleccionada.monto_mora_pendiente)}
                        placeholder="Q."
                        min="0"
                        value={datos_pago.mora.toString()}
                        onChangeText={monto => 
                          monto <= cartera_seleccionada.monto_mora_pendiente ?
                            this.props.editarValor('mora', monto)
                            :
                            null
                          }/>
                    </Item>
                  </View>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.text_gray}>Abono a cuota</Text>
              </View>
              <View style={{...styles.row, marginBottom:10, width:250}}>
                <Item style={{...styles.input, flex:1, marginBottom:30}}>
                  <Input
                    keyboardType={"numeric"}
                    placeholder="Q."
                    min="0"
                    value={datos_pago.cuota.toString()}
                    onChangeText={monto => 
                      monto <= cartera_seleccionada.saldo_pendiente ?
                        this.props.editarValor('cuota',monto)
                        :
                        null
                      }
                    disabled={
                      cartera_seleccionada.monto_mora_pendiente == null ||
                      !!this.se_pagara(cartera_seleccionada.saldo_pendiente)}
                    />
                </Item>
              </View>
              <View style={{...styles.row, justifyContent: "space-between" }}>
                <Button transparent style={{...styles.btn_blanco_azul, marginLeft: 5, marginRight: 5}} block onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                  <Text style={{color:colors.Azul}}>Ver Pagos</Text>
                </Button>
                <Button transparent style={{...styles.btn_blanco_azul, marginLeft: 5, marginRight: 5}} block onPress={() => {
                  if (!loader){
                    Alert.alert(
                      "Registrar pago",
                      "¿Está seguro de registrar este pago?",
                      [
                        {text: 'Aceptar', onPress: () => {
                            Keyboard.dismiss()
                            this.props.registrarPago(this.props.cartera_seleccionada.id, this.props.navigation)
                          }
                        },
                        {text: 'Cancelar'}
                      ],
                    );
                  }
                }}>
                  {(loader) && (<Spinner color="#1F86Da" size={20} style={{padding:10}} />)}
                  <Image source={fotos.pagos} style={styles.icono}/>
                  <Text style={{color:colors.Azul}}>Pagar</Text>
                </Button>
              </View>
            </View>
          <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalVisible}>
            <PagosRegistrados pagos={_.filter(cartera_seleccionada.pagos, {activo:true})} cerrar={() => this.setModalVisible(!this.state.modalVisible)} />
          </Modal>
        </Content>
      </Container>
    );
  }
}

export default Referencias;
