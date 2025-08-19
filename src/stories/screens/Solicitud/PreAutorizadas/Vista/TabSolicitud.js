import React, { Component } from 'react';
import { Spinner, Button, Text, View, Content, Icon, Item, Input } from "native-base";
import { Image, Alert, Modal, TouchableHighlight } from 'react-native';
import ModalCambioSolicitud from './ModalCambioSolicitud';
import { fotos } from "../../../../../utils/fotos";
import { URL_BASE } from "../../../../../utils/variables";
import Progressbar from '../../../../../utils/progress_bar';
import styles from './styles';


class TabSolicitud extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false, modalGarantiaVisible: false, garantia: {}, tipo_garantia: 10};
    this.verificar = this.verificar.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setModalGarantiaVisible = this.setModalGarantiaVisible.bind(this);
    this.cambioMonto = this.cambioMonto.bind(this);
    this.setGarantia = this.setGarantia.bind(this);
  }
  verificar (tipo, id) {
    Alert.alert(
      `${tipo ? "Aceptar" : "Rechazar"} garantía`,
      `Está seguro de ${tipo ? "aceptar" : "rechazar"} esta garantía`,
      [
        {text: 'Aceptar', onPress: () => this.props.validarGarantia(tipo, id)},
        {text: 'Cancelar'}
      ],
    );
  }
  setGarantia(datos) {
    this.props.crearGarantia(datos);
  }
  cambioMonto(nuevo_monto, motivo) {
    this.props.cambiarMonto(nuevo_monto, motivo);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModalGarantiaVisible(visible, garantia = {}, tipo_garantia = 10) {
    this.setState({tipo_garantia});
    this.setState({garantia});
    this.setState({modalGarantiaVisible: visible});
  }
  render () {
    const { solicitud, loader, productos, planes, cuota } = this.props;
    if (loader) {
      return (
        <Content style={{backgroundColor:"white"}}>
          <View>
            <Spinner color="#35A4FF" size={40} style={{padding:10}} />
          </View>
        </Content>
      );
    }
    return (
      <Content style={{backgroundColor:"white"}}>
        <View style={{...styles.bottomPerfil, marginBottom: 75}}>
          {
            solicitud.tipo_producto && solicitud.tipo_producto.tipo != 30  && solicitud.probabilidad_exito != null && (
              <View style={{...styles.bottomDatos, marginTop: 0}}>
            <Image style={styles.barras} source={fotos.barra}/>
            <View style={{...styles.bottomDatosProbabilidad,  paddingLeft: 20}}>
              <View style={{...styles.bottomDatos, marginTop: 0}}>
                <View style={styles.bottomSeccionProbabilidad}>
                  <Text style={styles.bottomEncabezado}>Probabilidad de éxito</Text>
                </View>
                <View style={{...styles.bottomSeccionProbabilidad}}>
                  {
                    solicitud.probabilidad_exito > 0 && solicitud.probabilidad_exito <=50 ?
                    <Text style={{...styles.bottomTitulo, color:"red"}}>{solicitud.probabilidad_exito + "%"}</Text>
                    :
                    solicitud.probabilidad_exito > 50 && solicitud.probabilidad_exito <=75 ?
                    <Text style={{...styles.bottomTitulo, color:"orange"}}>{solicitud.probabilidad_exito + "%"}</Text>
                    :
                    <Text style={{...styles.bottomTitulo, color:"green"}}>{solicitud.probabilidad_exito + "%"}</Text>
                  }
                </View>
              </View>
                {
                    solicitud.probabilidad_exito > 0 && solicitud.probabilidad_exito <=50 ?
                    <Progressbar bgcolor="red" progress={solicitud.probabilidad_exito}  height={15}/>
                    :
                    solicitud.probabilidad_exito > 50 && solicitud.probabilidad_exito <=75 ?
                    <Progressbar bgcolor="orange" progress={solicitud.probabilidad_exito}  height={15}/>
                    :
                    <Progressbar bgcolor="green" progress={solicitud.probabilidad_exito}  height={15}/>
                  }
            
            </View>
          </View>
            )
          }         
          <Text style={styles.bottomEncabezado}>Información de la solicitud</Text>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Monto solicitado:</Text>
              <Text style={styles.bottomInfo}>{solicitud.monto}</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Plan:</Text>
              <Text style={styles.bottomInfo}>{solicitud.plan.nombre}</Text>
            </View>
          </View>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Tipo producto:</Text>
              <Text style={styles.bottomInfo}>
                {solicitud.tipo_producto?.nombre || "No disponible"}
              </Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Categoria:</Text>
              <Text style={styles.bottomInfo}>
                {solicitud.categoria_producto?.nombre || "No disponible"}
              </Text>
            </View>
          </View>

          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Total de cuotas:</Text>
              <Text style={styles.bottomInfo}>{solicitud.plan.cuotas}</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Total a pagar:</Text>
              <Text style={styles.bottomInfo}>Q. {Math.ceil(solicitud.plan.cuotas * cuota).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Observaciones:</Text>
              <Text style={styles.bottomInfo}>{solicitud.observaciones}</Text>
            </View>
          </View>
          <Button style={styles.boton_editar} block onPress={() => this.setModalVisible(true)}>
            <Text>Editar monto</Text>
          </Button>
          {/* GARANTIAS*/}
          <Text style={{...styles.bottomEncabezado, marginTop: 20}}>Garantías</Text>
          {(solicitud.garantias.map((garantia) => {
            return (
              <View key={garantia.id} style={styles.bottomDatos}>
                <View style={styles.bottomSeccionGarantia}>
                  <Text style={styles.bottomTitulo}>Img</Text>
                  <Image source={ garantia.foto_cropped ? {uri: `${garantia.foto_cropped && garantia.foto_cropped.includes("https://") ? "" : URL_BASE}${garantia.foto_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.foto_pendiente} style={styles.foto_garantia} />
                </View>
                <View style={styles.bottomSeccionGarantia}>
                  <Text style={styles.bottomTitulo}>{(garantia.articulo !== "") ? "Artículo" : "Vehículo"}</Text>
                  <Text style={styles.bottomInfoGarantia}>{garantia.articulo !== "" ? garantia.articulo : garantia.tipo_vehiculo}</Text>
                </View>
                <View style={styles.bottomSeccionGarantia}>
                  <Text style={styles.bottomTitulo}>Valor</Text>
                  <Text style={styles.bottomInfoGarantia}>{garantia.valor_mercado}</Text>
                </View>
                <View style={{...styles.bottomSeccionGarantia, flex: 2}}>
                  <Text style={styles.bottomTitulo}>Verificar</Text>
                  {(garantia.aceptada) && (
                      <View style={styles.bottomDatos}><Image style={styles.acciones} source={fotos.up_s}/></View>
                    )}
                  {(!garantia.aceptada) && (
                      <View style={styles.bottomDatos}><Image style={styles.acciones} source={fotos.down_s}/></View>
                    )}
                </View>
              </View>
            );
          }))}
        </View>
        <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalVisible}>
          <ModalCambioSolicitud {...solicitud} productos={productos} planes={planes} navigation={this.props.navigation} cerrar={(nuevo_monto, motivo) => {
            this.setModalVisible(!this.state.modalVisible);
            if (nuevo_monto, motivo) {
              this.cambioMonto(nuevo_monto, motivo);
            }
          }}/>
        </Modal>
      </Content>
    );
  }
}

export default TabSolicitud;
