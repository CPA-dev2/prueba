import React, { Component } from 'react';
import { Container, Content, Button, Text, View, Input, Item } from "native-base";
import { TouchableHighlight, Image, Alert } from 'react-native';
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import styles from '../../Solicitud/Crear/Garantia/styles';
import { estilos } from "../../../../utils/estilos";
import { validations } from "../../../../utils/validation";
import { fotos } from "../../../../utils/fotos";
import { URL_BASE } from "../../../../utils/variables";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const RNFS = require('react-native-fs');
import ModalImagen from './ModalImagen';

class ModalGarantia extends Component {
  constructor(props) {
    super(props);
    const { garantia } = this.props;
    this.state = {
      id: garantia.id,
      articulo: garantia.articulo ? garantia.articulo : '',
      serie: garantia.serie ? garantia.serie : '',
      tipo_vehiculo: garantia.tipo_vehiculo ? garantia.tipo_vehiculo : '',
      personas: garantia.personas ? garantia.personas : '',
      marca: garantia.marca ? garantia.marca : '',
      uso: garantia.uso ? garantia.uso : '',
      placa: garantia.placa ? garantia.placa : '',
      chasis: garantia.chasis ? garantia.chasis : '',
      vin: garantia.vin ? garantia.vin : '',
      centimetros_cubicos: garantia.centimetros_cubicos ? garantia.centimetros_cubicos : '',
      cilindros: garantia.cilindros ? garantia.cilindros : '',
      color: garantia.color ? garantia.color : '',
      modelo: garantia.modelo ? garantia.modelo : '',
      valor_mercado: garantia.valor_mercado ? garantia.valor_mercado : '',
      temp_foto: garantia.foto_cropped ? {source: { uri: `${garantia.foto_cropped && garantia.foto_cropped.includes("https://") ? "" : URL_BASE}${garantia.foto_cropped}?random=${Math.random().toString(36).substring(7)}` }} : '',
      linea: garantia.linea ? garantia.linea : '',
      modalFoto: false,
      modalHerammienta:false,
    };

    this.abrirModalFoto = this.abrirModalFoto.bind(this);
    this.cerrarModalFoto = this.cerrarModalFoto.bind(this);
    this.fotoTemporal = this.fotoTemporal.bind(this);
    this.abrirModalHeramienta = this.abrirModalHeramienta.bind(this);
    this.cerrarModalHerramienta = this.cerrarModalHerramienta.bind(this);
  }

  abrirModalFoto = () => {
    this.setState({modalFoto: true});
  };

  cerrarModalFoto = () => {
    this.setState({modalFoto: false});
  };

  fotoTemporal = (source) => {
    this.setState({temp_foto:source});
  }

  abrirModalHeramienta = () => {
    this.setState({modalHerammienta: true});
  };

  cerrarModalHerramienta = () => {
    this.setState({modalHerammienta: false});
  };
  verificarData() {
    const {articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
      centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto} = this.state;
    if (this.props.tipo_garantia === 10) {
      //Garantia tipo 10: Electrodomestico o herramienta
      if (articulo && modelo && serie && valor_mercado){
        this.props.cerrar(this.state);
      } else {
        //Si no ha llenado los campos requeridos muestra un mensaje
        Alert.alert(
          'Información faltante',
          'Por favor llene la información obligatoria',
          [
            {text: 'Aceptar'},
          ],
          {cancelable: false}
        );
      }
    } else {
      //Garantia tipo 20: Vehiculo
      if (tipo_vehiculo && personas && marca && modelo && linea && uso && placa && chasis && vin && centimetros_cubicos && cilindros && color && valor_mercado){
        this.props.cerrar(this.state);
      } else {
        //Si no ha llenado los campos requeridos muestra un mensaje
        Alert.alert(
          'Información faltante',
          'Por favor llene la información obligatoria',
          [
            {text: 'Aceptar'},
          ],
          {cancelable: false}
        );
      }
    }
  }
  
  render() {
    const {navigation, tipo_garantia} = this.props;
    const {articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
      centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto} = this.state;
    return (
      <Container>
        <Navbar titulo={'Garantías'} navigation={navigation} regresar={this.props.cerrar}/>
        { (tipo_garantia === 10) ? (
          <Content style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
              <View style={styles.row} >
                <Text style={styles.encabezado}>Formulario para garantía de Electrodomésticos o herramientas</Text>
              </View>
              <Text style={styles.tittle}>Articulo</Text>
              <Item style={styles.input}>
                <Input value={this.state.articulo} placeholder="Nombre articulo" onChangeText={valor => this.setState({articulo:valor})}/>
                <Text style={estilos.inputError}>{validations.required(articulo)}</Text>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input value={this.state.modelo} placeholder="Modelo" onChangeText={valor =>  this.setState({modelo:valor})}/>
                <Text style={estilos.inputError}>{validations.required(modelo)}</Text>
              </Item>
              <Text style={styles.tittle}>Serie</Text>
              <Item style={styles.input}>
                <Input value={this.state.serie} placeholder="Serie" onChangeText={valor =>  this.setState({serie:valor})}/>
                <Text style={estilos.inputError}>{validations.required(serie)}</Text>
              </Item>
              <Text style={styles.tittle}>Valor</Text>
              <Item style={styles.input}>
                <Input value={this.state.valor_mercado} keyboardType={"numeric"} placeholder="Q.00" onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
                <Text style={estilos.inputError}>{validations.required(valor_mercado)}</Text>
                <Text style={estilos.inputError}>{validations.moneda(valor_mercado)}</Text>
              </Item>
              <View style={styles.lineaAvatar}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={
                    this.abrirModalHeramienta
                  }>

                  <View style={{...styles.grupoAvatar, justifyContent:'center'}}>
                    <ModalImagen 
                      modalImage = {this.state.modalHerammienta}
                      cerrarModal = {this.cerrarModalHerramienta}
                      peticion = {"temp_foto"}
                      fotoTemporal = {this.fotoTemporal}
                    />

                    <Image source={temp_foto !== '' ? temp_foto.source : fotos.add_foto_icon} style={styles.avatar} />
                    <Text style={styles.textoAvatar}>Foto de garantía</Text>
                  </View>
                </TouchableHighlight>


              </View>
              <View style={{...styles.row, paddingHorizontal:'10%' }}>
                <Button style={{flex:1, marginRight:10, ...styles.btn_gris}} block onPress={() => this.props.cerrar()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() => this.verificarData()}>
                  <Text>Aceptar</Text>
                </Button>
              </View>
            </View>
          </Content>) : (
          <Content style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
              <View style={styles.row} >
                <Text style={styles.encabezado}>Formulario para garantía de automóvil</Text>
              </View>
              <Text style={styles.tittle}>Tipo de vehículo</Text>
              <Item style={styles.input}>
                <Input value={this.state.tipo_vehiculo} placeholder="Tipo de vehículo" onChangeText={valor =>  this.setState({tipo_vehiculo:valor})}/>
                <Text style={estilos.inputError}>{validations.required(tipo_vehiculo)}</Text>
              </Item>
              <Text style={styles.tittle}>Pasajeros</Text>
              <Item style={styles.input}>
                <Input value={this.state.personas} keyboardType={"numeric"} placeholder="0" onChangeText={valor =>  this.setState({personas:valor})}/>
                <Text style={estilos.inputError}>{validations.required(personas)}</Text>
                <Text style={estilos.inputError}>{validations.integer(personas)}</Text>
              </Item>
              <Text style={styles.tittle}>Marca</Text>
              <Item style={styles.input}>
                <Input value={this.state.marca} placeholder="marca" onChangeText={valor =>  this.setState({marca:valor})}/>
                <Text style={estilos.inputError}>{validations.required(marca)}</Text>
              </Item>
              <Text style={styles.tittle}>Linea</Text>
              <Item style={styles.input}>
                <Input value={this.state.linea} placeholder="linea" onChangeText={valor =>  this.setState({linea:valor})}/>
                <Text style={estilos.inputError}>{validations.required(linea)}</Text>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input value={this.state.modelo} placeholder="modelo" onChangeText={valor =>  this.setState({modelo:valor})}/>
                <Text style={estilos.inputError}>{validations.required(modelo)}</Text>
                <Text style={estilos.inputError}>{validations.integer(modelo)}</Text>
              </Item>
              <Text style={styles.tittle}>Uso</Text>
              <Item style={styles.input}>
                <Input value={this.state.uso} placeholder="uso" onChangeText={valor =>  this.setState({uso:valor})}/>
                <Text style={estilos.inputError}>{validations.required(uso)}</Text>
              </Item>
              <Text style={styles.tittle}>Placa</Text>
              <Item style={styles.input}>
                <Input value={this.state.placa} placeholder="No. Placa" onChangeText={valor =>  this.setState({placa:valor})}/>
                <Text style={estilos.inputError}>{validations.required(placa)}</Text>
              </Item>
              <Text style={styles.tittle}>Chasis</Text>
              <Item style={styles.input}>
                <Input value={this.state.chasis} keyboardType={"numeric"} placeholder="No. Chasis" onChangeText={valor =>  this.setState({chasis:valor})}/>
                <Text style={estilos.inputError}>{validations.required(chasis)}</Text>
              </Item>
              <Text style={styles.tittle}>VIN</Text>
              <Item style={styles.input}>
                <Input value={this.state.vin} keyboardType={"numeric"} placeholder="VIN" onChangeText={valor =>  this.setState({vin:valor})}/>
                <Text style={estilos.inputError}>{validations.required(vin)}</Text>
              </Item>
              <Text style={styles.tittle}>Centimetros cúbicos</Text>
              <Item style={styles.input}>
                <Input value={this.state.centimetros_cubicos} keyboardType={"numeric"} placeholder="Centrimetros Cúbicos" onChangeText={valor =>  this.setState({centimetros_cubicos:valor})}/>
                <Text style={estilos.inputError}>{validations.required(centimetros_cubicos)}</Text>
              </Item>
              <Text style={styles.tittle}>Cilindros</Text>
              <Item style={styles.input}>
                <Input value={this.state.cilindros} keyboardType={"numeric"} placeholder="Cilindros" onChangeText={valor =>  this.setState({cilindros:valor})}/>
                <Text style={estilos.inputError}>{validations.required(cilindros)}</Text>
                <Text style={estilos.inputError}>{validations.integer(cilindros)}</Text>
              </Item>
              <Text style={styles.tittle}>Color</Text>
              <Item style={styles.input}>
                <Input value={this.state.color} placeholder="Color" onChangeText={valor =>  this.setState({color:valor})}/>
                <Text style={estilos.inputError}>{validations.required(color)}</Text>
              </Item>
              <Text style={styles.tittle}>Valor en el mercado</Text>
              <Item style={styles.input}>
                <Input value={this.state.valor_mercado} keyboardType={"numeric"} placeholder="Valor" onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
                <Text style={estilos.inputError}>{validations.required(valor_mercado)}</Text>
                <Text style={estilos.inputError}>{validations.moneda(valor_mercado)}</Text>
              </Item>
              <View style={styles.lineaAvatar}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={
                    this.abrirModalHeramienta
                  }>

                  <View style={{...styles.grupoAvatar, justifyContent:'center'}}>
                    <ModalImagen 
                      modalImage = {this.state.modalHerammienta}
                      cerrarModal = {this.cerrarModalHerramienta}
                      peticion = {"temp_foto"}
                      fotoTemporal = {this.fotoTemporal}
                    />

                    <Image source={temp_foto !== '' ? temp_foto.source : fotos.add_foto_icon} style={styles.avatar} />
                    <Text style={styles.textoAvatar}>Foto de garantía</Text>
                  </View>
                </TouchableHighlight>

              </View>
              <View style={{...styles.row, paddingHorizontal:'10%' }}>
                <Button style={{flex:1, marginRight:10, marginBottom:50, ...styles.btn_gris}} block onPress={() => this.props.cerrar()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() => this.verificarData()}>
                  <Text>Aceptar</Text>
                </Button>
              </View>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

export default ModalGarantia;
