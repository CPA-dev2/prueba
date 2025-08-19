import React, { Component } from 'react';
import { Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import Navbar from "../../../Navbar/Navbar";
import { Container, Content, Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker } from "native-base";
import { OTRAS_CATEGORIAS, CONDICION_PRODUCTO_CHOICES } from '../../../../../utils/constants';
import { fotos } from "../../../../../utils/fotos";

const RNFS = require('react-native-fs');
const ImagePicker = require('react-native-image-picker');
import CustomDropdown from './CustomDropdown';
import ModalImagen from './ModalImagen.js'


class CrearGarantia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articulo:'', serie:'', tipo_vehiculo:'', personas:'', marca:'', uso:'', placa:'', chasis:'', vin:'', linea:'',
      centimetros_cubicos:'', cilindros:'', color:'', modelo:'', valor_mercado:'', temp_foto:'', key:'', tipo:'', tipo_garantia: 1,
      precio_avaluo: '', familia: '',  motivo_ingreso:'', link_referencia:'', descripcion:'', estado: '',
      precio_sugerido_venta: 0,
    };
  }
  componentWillMount(){
    const {garantia} = this.props;
    this.setState({
      articulo: garantia.articulo,
      precio_avaluo: garantia.precio_avaluo,
      serie: garantia.serie,
      tipo_vehiculo: garantia.tipo_vehiculo,
      personas: garantia.personas,
      marca: garantia.marca,
      uso: garantia.uso,
      placa: garantia.placa,
      chasis: garantia.chasis,
      vin: garantia.vin,
      centimetros_cubicos: garantia.centimetros_cubicos,
      cilindros: garantia.cilindros,
      color: garantia.color,
      modelo: garantia.modelo,
      valor_mercado: garantia.valor_mercado,
      temp_foto: garantia.temp_foto,
      key: garantia.key,
      linea: garantia.linea,
      tipo: garantia.tipo,
      tipo_garantia: garantia.tipo_garantia,
      modalFoto: false,
      modalHerammienta:false,
      familia: garantia.familia,
      motivo_ingreso: garantia.motivo_ingreso,
      link_referencia: garantia.link_referencia,
      descripcion: garantia.descripcion,
      estado: garantia.estado,
      precio_sugerido_venta: garantia.precio_sugerido_venta,
    });

    this.abrirModalFoto = this.abrirModalFoto.bind(this);
    this.cerrarModalFoto = this.cerrarModalFoto.bind(this);
    this.fotoTemporal = this.fotoTemporal.bind(this);
    this.abrirModalHeramienta = this.abrirModalHeramienta.bind(this);
    this.cerrarModalHerramienta = this.cerrarModalHerramienta.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.estado !== this.state.estado || prevState.valor_mercado !== this.state.valor_mercado) {
      this.calcularPrecioSugeridoVenta();
    }
  }

  calcularPrecioSugeridoVenta = () => {
    const { estado, valor_mercado } = this.state;
    let factor = 0;
    if (estado === 10) {
      factor = 0.5;
    } else if (estado === 5) {
      factor = 0.4;
    } else if (estado === 0) {
      factor = 0.25;
    }
    const precio_sugerido_venta = valor_mercado * factor;
    this.setState({ precio_sugerido_venta });
  };

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

  render() {
    const { navigation, solicitud, garantia } = this.props;
    const {articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
      centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, key, tipo, tipo_garantia, precio_avaluo, 
      familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta} = this.state;
    if (tipo_garantia === 1){
      return (
        <Container>
           <Navbar titulo={"Editar Garantia"} navigation={navigation} />
          <Content style={styles.container}>
            <View style={styles.container}>
              <View style={styles.row} >
                <Text style={styles.encabezado}>Formulario para garantia de Electrodomesticos o herramientas</Text>
              </View>
              <Text style={styles.tittle}>Familia</Text>
              <CustomDropdown
                data={OTRAS_CATEGORIAS}
                selectedValue={this.state.familia}
                onValueChange={(value) => this.setState({ familia: value })}
                placeholder="Selecciona una categoría"
              />
              <Text style={styles.tittle}>Descripcion</Text>
              <Item style={styles.input}>
                <Input placeholder="Nombre articulo" value={articulo} onChangeText={articulo => this.setState({articulo})}/>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input placeholder="Modelo" value={modelo} onChangeText={modelo =>  this.setState({modelo})}/>
              </Item>
              <Text style={styles.tittle}>Serie</Text>
              <Item style={styles.input}>
                <Input placeholder="Serie" value={serie} onChangeText={serie =>  this.setState({serie})}/>
              </Item>
              <Text style={styles.tittle}>Monto otorgado por la garantia</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Q.00" value={precio_avaluo} onChangeText={precio_avaluo=> this.setState({precio_avaluo})}/>
              </Item>
              <Text style={styles.tittle}>Valor en el mercado</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Q.00" value={valor_mercado} onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
              </Item>
              <Text style={styles.tittle}>Motivo de ingreso</Text>
              <Item style={styles.input}>
                <Input placeholder="Motivo de ingreso" value={motivo_ingreso} onChangeText={motivo_ingreso =>  this.setState({motivo_ingreso})}/>
              </Item>
              <Text style={styles.tittle}>Link de referencia</Text>
              <Item style={styles.input}>
                <Input placeholder="Link de referencia" value={link_referencia} onChangeText={link_referencia =>  this.setState({link_referencia})}/>
              </Item>
              <Text style={styles.tittle}>Descripcion corta</Text>
              <Item style={styles.input}>
                <Input placeholder="Descripcion" value={descripcion} onChangeText={descripcion =>  this.setState({descripcion})}/>
              </Item>
              <Text style={styles.tittle}>Estado físico del producto</Text>
              <CustomDropdown
                data={CONDICION_PRODUCTO_CHOICES}
                selectedValue={this.state.estado}
                onValueChange={(value) => this.setState({ estado: value })}
                placeholder="Selecciona una condición"
              />
              <Text style={styles.tittle}>Precio valuado por el sistema</Text>
              <Text style={styles.input}>{`Q. ${precio_sugerido_venta.toFixed(2)}`}</Text>
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
              <View style={styles.row}>
                <Button style={{flex:1, marginRight:10, ...styles.btn_gris}} block onPress={() => navigation.goBack()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() =>
                  this.props.editarGarantia({articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin,
                    centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, key, tipo, tipo_garantia, precio_avaluo, 
                    familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta}, garantia.key, navigation)}>
                  <Text>Finalizar</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
    if (tipo === 20){
      return (
        <Container>
          <Navbar titulo={"Editar Garantia"} navigation={navigation} />
          <Content>
            <View style={styles.container}>
              <View style={styles.row} >
                <Text style={styles.encabezado}>Formulario para garantia de automóvil</Text>
              </View>
              <Text style={styles.tittle}>Tipo de vehículo</Text>
              <Item style={styles.input}>
                <Input placeholder="Tipo de vehículo" value={tipo_vehiculo} onChangeText={tipo_vehiculo =>  this.setState({tipo_vehiculo})}/>
              </Item>
              <Text style={styles.tittle}>Pasajeros</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="0" value={personas} onChangeText={personas =>  this.setState({personas})}/>
              </Item>
              <Text style={styles.tittle}>Marca</Text>
              <Item style={styles.input}>
                <Input placeholder="marca" value={marca} onChangeText={marca =>  this.setState({marca})}/>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="modelo" value={modelo} onChangeText={modelo =>  this.setState({modelo})}/>
              </Item>
              <Text style={styles.tittle}>Linea</Text>
              <Item style={styles.input}>
                <Input placeholder="linea" value={linea} onChangeText={linea =>  this.setState({linea})}/>
              </Item>
              <Text style={styles.tittle}>Uso</Text>
              <Item style={styles.input}>
                <Input placeholder="uso" value={uso} onChangeText={uso =>  this.setState({uso})}/>
              </Item>
              <Text style={styles.tittle}>Placa</Text>
              <Item style={styles.input}>
                <Input placeholder="No. Placa" value={placa} onChangeText={placa =>  this.setState({placa})}/>
              </Item>
              <Text style={styles.tittle}>Chasis</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="No. Chasis" value={chasis} onChangeText={chasis =>  this.setState({chasis})}/>
              </Item>
              <Text style={styles.tittle}>VIN</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="VIN" value={vin} onChangeText={vin =>  this.setState({vin})}/>
              </Item>
              <Text style={styles.tittle}>Centimetros cúbicos</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Centrimetros Cúbicos" value={centimetros_cubicos} onChangeText={centimetros_cubicos =>  this.setState({centimetros_cubicos})}/>
              </Item>
              <Text style={styles.tittle}>Cilindros</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Cilindros" value={cilindros} onChangeText={cilindros =>  this.setState({cilindros})}/>
              </Item>
              <Text style={styles.tittle}>Color</Text>
              <Item style={styles.input}>
                <Input placeholder="Color" value={color} onChangeText={color =>  this.setState({color})}/>
              </Item>
              <Text style={styles.tittle}>Valor en el mercado</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Valor" value={valor_mercado} onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
              </Item>
              <View style={styles.lineaAvatar}>
                {/* <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.abrirPeticion("temp_foto");
                  }}>
                  <View style={{...styles.grupoAvatar, justifyContent:'center'}}>

                    <Image source={temp_foto !== '' ? temp_foto.source : fotos.add_foto_icon} style={styles.avatar} />
                    <Text style={styles.textoAvatar}>Foto de garantia</Text>
                  </View>
                </TouchableHighlight> */}

                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={
                    this.abrirModalFoto
                  }>
                  <View style={{...styles.grupoAvatar, justifyContent:'center'}}>
                    <ModalImagen 
                      modalImage = {this.state.modalFoto}
                      cerrarModal = {this.cerrarModalFoto}
                      peticion = {"temp_foto"}
                      fotoTemporal = {this.fotoTemporal}
                    />

                    <Image source={temp_foto !== '' ? temp_foto.source : fotos.add_foto_icon} style={styles.avatar} />
                    <Text style={styles.textoAvatar}>Foto de garantía</Text>
                  </View>
                </TouchableHighlight>

                


              </View>
              <View style={styles.row}>
                <Button style={{flex:1, marginRight:10, marginBottom:50, ...styles.btn_gris}} block onPress={() => navigation.goBack()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() =>
                  this.props.editarGarantia({articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin,
                    centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, key, tipo, tipo_garantia, precio_avaluo, 
                    familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta}, garantia.key, navigation)}>
                  <Text>Finalizar</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

export default  CrearGarantia;
