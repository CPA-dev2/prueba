import React, { Component } from 'react';
import { Spinner, Button, Text, View, Content, Icon, Item, Input } from "native-base";
import { Image, Alert, Modal, TouchableHighlight } from 'react-native';
import ModalCambioSolicitud from './ModalCambioSolicitud';
import ModalGarantia from './ModalGarantia';
import { fotos } from "../../../../utils/fotos";
import { URL_BASE } from "../../../../utils/variables";
import styles from './styles';


class TabSolicitud extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false, modalGarantiaVisible: false, garantia: {}, tipo_garantia: 10};
    this.verificar = this.verificar.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setModalGarantiaVisible = this.setModalGarantiaVisible.bind(this);
    this.cambio = this.cambio.bind(this);
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
  cambio(datos) {
    this.props.editarMonto(datos);
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
    const { solicitud, loader, productos, planes, cuota, navigation } = this.props;
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
            <Text>Editar Solicitud</Text>
          </Button>
          {/* GARANTIAS*/}
          <Text style={{...styles.bottomEncabezado, marginTop: 20}}>Garantías</Text>
          {(solicitud.garantias.map((garantia) => {
            return (
              <View key={garantia.id} style={styles.bottomDatos}>
                <View style={styles.bottomSeccionGarantia}>
                  <Text style={styles.bottomTitulo}>Img</Text>
                  <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 50}} transparent onPress={() => {
                    if (garantia.foto) {
                      this.props.irImagen(`${garantia.foto && garantia.foto.includes("https://") ? "" : URL_BASE}${garantia.foto}?random=${Math.random().toString(36).substring(7)}`, navigation);
                    }
                  }}>
                    <Image source={ garantia.foto_cropped ? {uri: `${garantia.foto_cropped && garantia.foto_cropped.includes("https://") ? "" : URL_BASE}${garantia.foto_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.foto_pendiente} style={styles.foto_garantia} />
                  </TouchableHighlight>
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
                  {(garantia.aceptada === null) ? (
                    <View style={styles.bottomDatos}>
                      <Button onPress={() => this.verificar(true, garantia.id)} transparent><Image style={styles.acciones} source={fotos.up}/></Button>
                      <Button onPress={() => this.verificar(false, garantia.id)} transparent><Image style={styles.acciones} source={fotos.down}/></Button>
                      <Button onPress={() => this.setModalGarantiaVisible(true, garantia, garantia.articulo ? 10 : 20)} transparent><Image style={styles.acciones} source={fotos.editar}/></Button>
                    </View>
                  ) : (
                    (garantia.aceptada) ? (
                      <View style={styles.bottomDatos}><Image style={styles.acciones} source={fotos.up_s}/></View>
                    ) : (
                      <View style={styles.bottomDatos}><Image style={styles.acciones} source={fotos.down_s}/></View>
                    )
                  )}
                </View>
              </View>
            );
          }))}
          <Text style={{...styles.bottomEncabezado, marginTop: 20}}>Agregar Garantía</Text>
          <View>
            <View style={{flexDirection:"row"}}>
              <TouchableHighlight underlayColor={'transparent'} style={styles.btn} onPress={() => this.setModalGarantiaVisible(true, {}, 10)}>
                <View style={{flexDirection: 'column', backgroundColor: "white", flex: 1}}>
                  <Image source={fotos.electro_icon} style={styles.icono}/>
                  <Text style={styles.text_center}>Electrodomésticos o herramientas</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'transparent'} style={styles.btn} onPress={() => this.setModalGarantiaVisible(true, {}, 20)}>
                <View style={{flexDirection: 'column', backgroundColor: "white"}}>
                  <Image source={fotos.vehiculo_icon} style={styles.icono} />
                  <Text style={styles.text_center}>Vehículo</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalVisible}>
          <ModalCambioSolicitud {...solicitud} productos={productos} planes={planes} navigation={this.props.navigation} cerrar={(opcion) => {
            this.setModalVisible(!this.state.modalVisible);
            if (opcion) {
              this.cambio(opcion);
            }
          }}/>
        </Modal>
        <Modal animationType="slide"
               transparent={false}
               onRequestClose={() => {}}
               visible={this.state.modalGarantiaVisible}>

          <ModalGarantia tipo_garantia={this.state.tipo_garantia} garantia={this.state.garantia} navigation={this.props.navigation} cerrar={(opcion) => {
            this.setModalGarantiaVisible(!this.state.modalGarantiaVisible);
            if (opcion) {
              this.setGarantia(opcion);
            }
          }}/>
        </Modal>
      </Content>
    );
  }
}

export default TabSolicitud;
