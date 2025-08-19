import React, { Component } from 'react';
import moment from 'moment';
import { Image } from 'react-native';
import { Spinner, Button, Text, View, Content, Icon, Item, Input, Picker } from "native-base";
import Empresa from "./Empresa";
import Micronegocio from "./Micronegocio";
import Referencias from "./Referencias";
import OtroSocioeconomico from "./OtroSocioeconomico";
import { URL_BASE } from "../../../../../utils/variables";
import styles from './styles';
import { fotos } from "../../../../../utils/fotos";


class TabCliente extends Component {
  render () {
    const { cliente, navigation, loader } = this.props;
    const { socioeconomico } = cliente;
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
        <View style={styles.topPerfil}>
          <View style={styles.image_shadow}>
            <Image style={styles.image_perfil} source={ (typeof cliente.foto_cropped === "string" && cliente.foto_cropped !== "") ? {uri: `${cliente.foto_cropped && cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholder } />
          </View>
          <View style={styles.topDatos}>
            <View style={styles.topSeccion}>
              <Text style={styles.topTitulo}>Nombre:</Text>
              <Text style={styles.topInfo}>{cliente.nombres} {cliente.apellidos}</Text>
            </View>
            <View style={styles.topSeccion}>
              <Text style={styles.topTitulo}>Fecha registro:</Text>
              <Text style={styles.topInfo}>{moment(cliente.creado).format('DD/MM/YYYY')}</Text>
            </View>
          </View>
          <View style={styles.topDatos}>
            <View style={styles.topSeccion}>
              <Text style={styles.topTitulo}>Dirección:</Text>
              <Text style={styles.topInfo}>{cliente.direccion}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomPerfil}>
          {/* DATOS PERSONALES*/}
          <Text style={styles.bottomEncabezado}>Datos Personales</Text>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>DPI:</Text>
              <Text style={styles.bottomInfo}>{cliente.dpi}</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Actividad económica:</Text>
              <Text style={styles.bottomInfo}>{cliente.read_tipo_cliente}</Text>
            </View>
          </View>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Edad:</Text>
              <Text style={styles.bottomInfo}>{cliente.edad} años</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Género:</Text>
              <Text style={styles.bottomInfo}>{cliente.read_genero}</Text>
            </View>
          </View>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Departamento:</Text>
              <Text style={styles.bottomInfo}>{cliente.read_departamento}</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Municipio:</Text>
              <Text style={styles.bottomInfo}>{cliente.read_municipio}</Text>
            </View>
          </View>
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Text style={styles.bottomTitulo}>Aldea:</Text>
              <Text style={styles.bottomInfo}>{cliente.aldea.nombre}</Text>
            </View>
          </View>
          {/* FOTOS */}
          <View style={styles.bottomDatos}>
            <View style={styles.bottomSeccion}>
              <Image style={styles.thumb} source={ (typeof cliente.foto_dpi_cropped === "string" && cliente.foto_dpi_cropped !== "") ? {uri: `${cliente.foto_dpi_cropped && cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholderDPI }/>
              <Text style={{...styles.bottomTitulo, alignSelf:"center"}}>DPI</Text>
            </View>
            <View style={styles.bottomSeccion}>
              <Image style={styles.thumb} source={ (typeof cliente.foto_recibo_cropped === "string" && cliente.foto_recibo_cropped !== "") ? {uri: `${cliente.foto_recibo_cropped && cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`} : fotos.placeholderRecibo }/>
              <Text style={{...styles.bottomTitulo, alignSelf:"center"}}>Recibo de luz</Text>
            </View>
          </View>
          {/* SOCIOECONOMICO */}

          {(cliente.tipo_cliente === 20) && (<Empresa info={socioeconomico} />)}
          {(cliente.tipo_cliente === 10) && (<Micronegocio info={socioeconomico}/>)}
          {(cliente.tipo_cliente === 30) && (<OtroSocioeconomico info={socioeconomico}/>)}
          {/* REFERENCIAS */}
          <Referencias info={cliente.referencias} validarReferencia={this.props.validarReferencia} navigation={navigation} />
          <Button style={styles.boton_editar} block onPress={() => this.props.setCliente(cliente, navigation)}>
            <Text>Editar Cliente</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default TabCliente;
