import React, { Component } from 'react';
import { Alert } from 'react-native'; 

// importar CustomDropdown
import CustomDropdown from './CustomDropdown';
import styles from "./styles";
import Navbar from "../../../../../container/NavbarContainer/NavbarContainer";
import { Container, Content, Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker, Toast } from "native-base";
import { TouchableHighlight, Image } from 'react-native'; // Añadir Image aquí
import { validations } from "../../../../../utils/validation";
import { OTRAS_CATEGORIAS, CONDICION_PRODUCTO_CHOICES } from '../../../../../utils/constants';
import { estilos } from "../../../../../utils/estilos";
import { fotos } from "../../../../../utils/fotos";
import ModalImagen from './ModalImagen';


console.log(OTRAS_CATEGORIAS);
console.log(CONDICION_PRODUCTO_CHOICES);
class CrearGarantia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articulo:'',
      serie:'',
      tipo_vehiculo:'',
      precio_avaluo:'',
      familia:  OTRAS_CATEGORIAS[0].value,
      personas:'',
      marca:'',
      uso:'',
      placa:'',
      chasis:'',
      vin:'',
      centimetros_cubicos:'',
      cilindros:'',
      color:'',
      modelo:'',
      valor_mercado:'',
      motivo_ingreso:'', 
      link_referencia:'', 
      descripcion:'',
      estado: CONDICION_PRODUCTO_CHOICES[0].value,
      temp_foto:'',
      linea:'',
      modalFoto: false,
      modalHerammienta:false,
      precio_sugerido_venta: 0, // Añadir este campo
    };
  
  

    console.log(OTRAS_CATEGORIAS);
    console.log(CONDICION_PRODUCTO_CHOICES);
    console.log(this.props.solicitud);

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


  verificarData(){
    console.log(OTRAS_CATEGORIAS);
    console.log(CONDICION_PRODUCTO_CHOICES);
    const {articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
      centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, precio_avaluo, familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta} = this.state;
    if (this.props.solicitud.tipo_garantia === 1){
      //Garantia tipo 10: Electrodomestico o herramienta
      if (articulo && modelo && marca && serie && valor_mercado && precio_avaluo && familia && motivo_ingreso && link_referencia && descripcion && estado !== null && estado !== undefined){
        this.props.addGarantia({articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
          centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, precio_avaluo, familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta}, this.props.navigation);
      } else {
        //Si no a llenado los campos requeridos muestra un mensaje
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
        this.props.addGarantia({articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
          centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto}, this.props.navigation);
      } else {
        //Si no a llenado los campos requeridos muestra un mensaje
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
    console.log("render otras categorias",OTRAS_CATEGORIAS);
    console.log(CONDICION_PRODUCTO_CHOICES);
    console.log(this.props.solicitud);
    console.log(this.props.familia);
    console.log(this.state.familia);

    const { navigation, loaderGarantia: loader, planes, solicitud} = this.props;
    const {articulo, serie,tipo_vehiculo, personas, marca, uso, placa, chasis, vin, linea,
      centimetros_cubicos, cilindros, color, modelo, valor_mercado, temp_foto, precio_avaluo, familia, motivo_ingreso, link_referencia, descripcion, estado, precio_sugerido_venta} = this.state;

      console.log("Despues",this.props.familia);
      console.log("Despues state",this.state.familia);
    return (
      <Container>
        <Navbar titulo={"Nueva Garantía"} navigation={navigation} />
        { (solicitud.tipo_garantia === 1) ? (
          <Content style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
              <View style={styles.row} >
                <Text style={styles.encabezado}>Formulario para garantía de Electrodomésticos o herramientas</Text>
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
                <Input placeholder="Nombre articulo" onChangeText={articulo => this.setState({articulo})}/>
                <Text style={estilos.inputError}>{validations.required(articulo)}</Text>
              </Item>
              <Text style={styles.tittle}>Marca</Text>
              <Item style={styles.input}>
                <Input placeholder="marca" onChangeText={marca =>  this.setState({marca})}/>
                <Text style={estilos.inputError}>{validations.required(marca)}</Text>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input placeholder="Modelo" onChangeText={modelo =>  this.setState({modelo})}/>
                <Text style={estilos.inputError}>{validations.required(modelo)}</Text>
              </Item>
              <Text style={styles.tittle}>Serie</Text>
              <Item style={styles.input}>
                <Input placeholder="Serie" onChangeText={serie =>  this.setState({serie})}/>
                <Text style={estilos.inputError}>{validations.required(serie)}</Text>
              </Item>
              <Text style={styles.tittle}>Monto otorgado por la garantia</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Q.00" onChangeText={precio_avaluo => this.setState({precio_avaluo})}/>
                <Text style={estilos.inputError}>{validations.required(precio_avaluo)}</Text>
              </Item>
              <Text style={styles.tittle}>Valor en el mercado</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Q.00" onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
                <Text style={estilos.inputError}>{validations.required(valor_mercado)}</Text>
                <Text style={estilos.inputError}>{validations.moneda(valor_mercado)}</Text>
              </Item>
              <Text style={styles.tittle}>Motivo de ingreso</Text>
              <Item style={styles.input}>
                <Input placeholder="Motivo de ingreso" onChangeText={motivo_ingreso =>  this.setState({motivo_ingreso})}/>
                <Text style={estilos.inputError}>{validations.required(motivo_ingreso)}</Text>
              </Item>
              <Text style={styles.tittle}>Link de Referencia</Text>
              <Item style={styles.input}>
                <Input placeholder="Link de referancia" onChangeText={link_referencia =>  this.setState({link_referencia})}/>
                <Text style={estilos.inputError}>{validations.required(link_referencia)}</Text>
              </Item>
              <Text style={styles.tittle}>Descripcion corta</Text>
              <Item style={styles.input}>
                <Input placeholder="Descripcion corta" onChangeText={descripcion =>  this.setState({descripcion})}/>
                <Text style={estilos.inputError}>{validations.required(descripcion)}</Text>
              </Item>
              <Text style={styles.tittle}>Estado físico del producto</Text>
              <CustomDropdown
                data={CONDICION_PRODUCTO_CHOICES}
                selectedValue={this.state.estado}
                onValueChange={(value) => this.setState({ estado: value })}
                placeholder="Selecciona una condición"
              />
              <Text style={estilos.inputError}>{validations.required(estado)}</Text>
              <Text style={styles.tittle}>Precio valuado por el sistema</Text>
              <Text style={styles.input}>{`Q. ${precio_sugerido_venta.toFixed(2)}`}</Text>
              <Text style={estilos.inputError}>{validations.required(precio_sugerido_venta)}</Text>
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
                <Button style={{flex:1, marginRight:10, ...styles.btn_gris}} block onPress={() => navigation.goBack()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() => this.verificarData()}>
                  {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                  <Text>Agregar</Text>
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
                <Input placeholder="Tipo de vehículo" onChangeText={tipo_vehiculo =>  this.setState({tipo_vehiculo})}/>
                <Text style={estilos.inputError}>{validations.required(tipo_vehiculo)}</Text>
              </Item>
              <Text style={styles.tittle}>Pasajeros</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="0" onChangeText={personas =>  this.setState({personas})}/>
                <Text style={estilos.inputError}>{validations.required(personas)}</Text>
                <Text style={estilos.inputError}>{validations.integer(personas)}</Text>
              </Item>
              <Text style={styles.tittle}>Marca</Text>
              <Item style={styles.input}>
                <Input placeholder="marca" onChangeText={marca =>  this.setState({marca})}/>
                <Text style={estilos.inputError}>{validations.required(marca)}</Text>
              </Item>
              <Text style={styles.tittle}>Linea</Text>
              <Item style={styles.input}>
                <Input placeholder="linea" onChangeText={linea =>  this.setState({linea})}/>
                <Text style={estilos.inputError}>{validations.required(linea)}</Text>
              </Item>
              <Text style={styles.tittle}>Modelo</Text>
              <Item style={styles.input}>
                <Input placeholder="modelo" onChangeText={modelo =>  this.setState({modelo})}/>
                <Text style={estilos.inputError}>{validations.required(modelo)}</Text>
                <Text style={estilos.inputError}>{validations.integer(modelo)}</Text>
              </Item>
              <Text style={styles.tittle}>Uso</Text>
              <Item style={styles.input}>
                <Input placeholder="uso" onChangeText={uso =>  this.setState({uso})}/>
                <Text style={estilos.inputError}>{validations.required(uso)}</Text>
              </Item>
              <Text style={styles.tittle}>Placa</Text>
              <Item style={styles.input}>
                <Input placeholder="No. Placa" onChangeText={placa =>  this.setState({placa})}/>
                <Text style={estilos.inputError}>{validations.required(placa)}</Text>
              </Item>
              <Text style={styles.tittle}>Chasis</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="No. Chasis" onChangeText={chasis =>  this.setState({chasis})}/>
                <Text style={estilos.inputError}>{validations.required(chasis)}</Text>
              </Item>
              <Text style={styles.tittle}>VIN</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="VIN" onChangeText={vin =>  this.setState({vin})}/>
                <Text style={estilos.inputError}>{validations.required(vin)}</Text>
              </Item>
              <Text style={styles.tittle}>Centimetros cúbicos</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Centrimetros Cúbicos" onChangeText={centimetros_cubicos =>  this.setState({centimetros_cubicos})}/>
                <Text style={estilos.inputError}>{validations.required(centimetros_cubicos)}</Text>
              </Item>
              <Text style={styles.tittle}>Cilindros</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Cilindros" onChangeText={cilindros =>  this.setState({cilindros})}/>
                <Text style={estilos.inputError}>{validations.required(cilindros)}</Text>
                <Text style={estilos.inputError}>{validations.integer(cilindros)}</Text>
              </Item>
              <Text style={styles.tittle}>Color</Text>
              <Item style={styles.input}>
                <Input placeholder="Color" onChangeText={color =>  this.setState({color})}/>
                <Text style={estilos.inputError}>{validations.required(color)}</Text>
              </Item>
              <Text style={styles.tittle}>Valor en el mercado</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} placeholder="Valor" onChangeText={valor =>  this.setState({valor_mercado:valor})}/>
                <Text style={estilos.inputError}>{validations.required(valor_mercado)}</Text>
                <Text style={estilos.inputError}>{validations.moneda(valor_mercado)}</Text>
              </Item>

              <View style={styles.lineaAvatar}>
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


              <View style={{...styles.row, paddingHorizontal:'10%' }}>
                <Button style={{flex:1, marginRight:10, marginBottom:50, ...styles.btn_gris}} block onPress={() => navigation.goBack()}>
                  <Text>Cancelar</Text>
                </Button>
                <Button style={{flex:1, marginLeft:10, ...styles.btn_azul}} block onPress={() => this.verificarData()}>
                  {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                  <Text>Agregar</Text>
                </Button>
              </View>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}


export default  CrearGarantia;
