import React, { Component } from 'react';
import moment from 'moment';
import { Container, Content, Text, View } from "native-base";
import {Image, AppRegistry, TouchableHighlight, Alert} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import styles from "./styles";
import { colors } from "../../../utils/colors";
import { estilos } from "../../../utils/estilos";
import { URL_BASE } from "../../../utils/variables";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { fotos } from "../../../utils/fotos";


class PefilCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {paso: 1, dpi: ''};
    this.redirigir = this.redirigir.bind(this);
  }


  redirigir(sitio) {
    if (sitio === "perfil"){
      this.props.navigation.navigate("NuevoCliente");
    } else if (sitio === "solicitud") {
      this.props.resetDatos(this.props.nuevo_cliente.id);
      this.props.navigation.navigate("CrearSolicitud");
    } else {
      Alert.alert(
        "Geo localizar",
        "¿Está seguro de geo localizar el domicilio?",
        [
          {
            text: 'Aceptar',
            onPress: () => this.props.geoLocalizar()
          },
          {text: 'Cancelar'}
        ],
      );
    }
  }

  render() {
    const { loader, navigation, nuevo_cliente, ultima_peticion } = this.props;
    const actions = [{
      text: 'Actualizar Info',
      icon: require('../../../../images/lapiz.png'),
      name: 'perfil',
      position: 1,
      color: colors.Naranja,
      textBackground: "transparent",
      textElevation: 0,
      textColor: colors.Blanco,
    }, {
      text: 'Nueva solicitud de crédito',
      icon: require('../../../../images/hoja.png'),
      name: 'solicitud',
      position: 2,
      color: colors.Naranja,
      textBackground: "transparent",
      textElevation: 0,
      textColor: colors.Blanco,
    }, {
      text: 'Geo localizar',
      icon: require('../../../../images/icons/home.png'),
      name: 'geo',
      position: 3,
      color: colors.Naranja,
      textBackground: "transparent",
      textElevation: 0,
      textColor: colors.Blanco,
    }];
    console.log("NUEVO CLIENTE ------- ", nuevo_cliente)
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={"Perfil"} navigation={navigation} />
        <Content>
          <View style={styles.topPerfil}>
            <View style={styles.image_shadow}>
              <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 75}} transparent onPress={() => {
                if (nuevo_cliente.foto) {
                  this.props.irImagen(`${nuevo_cliente.foto}`, navigation);
                }
              }}>
                <Image 
                  style={styles.image_perfil} 
                  source={ (typeof nuevo_cliente.foto_cropped === "string" && nuevo_cliente.foto_cropped !== "") ? 
                    {uri: `${nuevo_cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${nuevo_cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } 
                />
              </TouchableHighlight>
            </View>
            <View style={styles.topDatos}>
              <View style={styles.topSeccion}>
                <Text style={styles.topTitulo}>Nombre:</Text>
                <Text style={styles.topInfo}>{nuevo_cliente.nombres} {nuevo_cliente.apellidos}</Text>
              </View>
              <View style={styles.topSeccion}>
                <Text style={styles.topTitulo}>Fecha registro:</Text>
                <Text style={styles.topInfo}>{moment(nuevo_cliente.creado).format('DD/MM/YYYY')}</Text>
              </View>
            </View>
            <View style={styles.topDatos}>
              <View style={styles.topSeccion}>
                <Text style={styles.topTitulo}>Dirección:</Text>
                <Text style={styles.topInfo}>{nuevo_cliente.direccion}</Text>
              </View>
              <View style={styles.topSeccion}>
                <Text style={styles.topTitulo}>Teléfono:</Text>
                <Text style={styles.topInfo}>{nuevo_cliente.telefono}</Text>
              </View>
            </View>
          </View>
          <View style={styles.midPerfil}>
            {nuevo_cliente.permite_recompra && (
              <Text style={{color: colors.Azul}}>El cliente aplica para recompra {(ultima_peticion.id !== undefined) && (`en la oficina ${ultima_peticion.sucursal.nombre} con un monto de Q ${ultima_peticion.monto}`)}</Text>
            )}
            {/*<View style={styles.midDatos}>
              <View style={styles.midSeccion}>
                <Text style={styles.midTitulo}>Deuda inicial</Text>
                <Text style={styles.midInfo}>Sin Registro</Text>
              </View>
              <View style={styles.midSeccion}>
                <Text style={styles.midTitulo}>Total de mora</Text>
                <Text style={styles.midInfo}>Sin Registro</Text>
              </View>
            </View>
            <View style={styles.midDatos}>
              <View style={styles.midSeccion}>
                <Text style={styles.midTitulo}>Saldo total</Text>
                <Text style={styles.midInfo}>Sin Registro</Text>
              </View>
            </View>*/}
          </View>
          <View style={styles.bottomPerfil}>
            <Text style={styles.bottomEncabezado}>Datos Personales</Text>
            <View style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>DPI:</Text>
                <Text style={styles.bottomInfo}>{nuevo_cliente.dpi}</Text>
              </View>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>Actividad económica:</Text>
                <Text style={styles.bottomInfo}>{nuevo_cliente.read_tipo_cliente}</Text>
              </View>
            </View>
            <View style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>Edad:</Text>
                <Text style={styles.bottomInfo}>{nuevo_cliente.edad} años</Text>
              </View>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>Género:</Text>
                <Text style={styles.bottomInfo}>{nuevo_cliente.read_genero}</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomPerfil}>
            <View style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>DPI:</Text>
                <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 75}} transparent onPress={() => {
                  if (nuevo_cliente.foto_dpi) {
                    this.props.irImagen(`${nuevo_cliente.foto_dpi}`, navigation);
                  }
                }}>
                  <Image style={styles.image_perfil} source={ (typeof nuevo_cliente.foto_dpi_cropped === "string" && nuevo_cliente.foto_dpi_cropped !== "") ? {uri: `${nuevo_cliente.foto_dpi_cropped && nuevo_cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${nuevo_cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } />
                </TouchableHighlight>
              </View>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>Recibo luz:</Text>
                <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 75}} transparent onPress={() => {
                  if (nuevo_cliente.foto_recibo){
                    this.props.irImagen(`${nuevo_cliente.foto_recibo}`, navigation);
                  }
                }}>
                  <Image style={styles.image_perfil} source={ (typeof nuevo_cliente.foto_recibo_cropped === "string" && nuevo_cliente.foto_recibo_cropped !== "") ? {uri: `${nuevo_cliente.foto_recibo_cropped && nuevo_cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${nuevo_cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } />
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={styles.bottomPerfil}>
            <View style={styles.bottomDatos}>
              <View style={styles.bottomSeccion}>
                <Text style={styles.bottomTitulo}>Fuente de Ingreso:</Text>
                <TouchableHighlight underlayColor={"#fff"} style={{backgroundColor: "#fff", borderRadius: 75}} transparent onPress={() => {
                  if (nuevo_cliente.foto_casa){
                    this.props.irImagen(`${nuevo_cliente.foto_casa}`, navigation);
                  }
                }}>
                  <Image style={styles.image_perfil} source={ (typeof nuevo_cliente.foto_casa_cropped === "string" && nuevo_cliente.foto_casa_cropped !== "") ? {uri: `${nuevo_cliente.foto_casa_cropped && nuevo_cliente.foto_casa_cropped.includes("https://") ? "" : URL_BASE}${nuevo_cliente.foto_casa_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } />
                </TouchableHighlight>
              </View>
            </View>
          </View>

        </Content>
        <FloatingAction
          actions={actions}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          color={colors.Rojo}
          onPressItem={
            (name) => this.redirigir(name)
          }
          animated={false}
        />
      </Container>

    );
  }
}
AppRegistry.registerComponent('DisplayAnImage', () => PefilCliente);

export default PefilCliente;
