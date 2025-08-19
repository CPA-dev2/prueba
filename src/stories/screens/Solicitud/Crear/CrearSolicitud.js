import React, { Component } from 'react';
import {Alert, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import { Container,Content, Spinner, Button, Text, View, Textarea, Item, Input, Picker, Toast } from "native-base";
import { validations } from "../../../../utils/validation";
import {estilos} from "../../../../utils/estilos";
import { fotos } from "../../../../utils/fotos";


class CrearSolicitud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevaGarantia:false};
  }
  componentDidMount() {
    if (this.props.resetear){
      this.props.loadCliente();
      this.props.listarCategorias(null, this.props.solicitud.tipo_producto);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.solicitud.tipo_producto !== prevProps.solicitud.tipo_producto) {
      this.props.listarCategorias(null, this.props.solicitud.tipo_producto);
    }
  }
  verirficarData(){
    const {solicitud, navigation} = this.props;
    if (solicitud.plan && solicitud.tipo_producto && solicitud.monto){
      this.props.crearSolicitud(navigation);
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
  render() {
    const { navigation, loader, planes, categorias, productos, solicitud, montoTotal, plan: planElegido} = this.props;
    let { cliente } = solicitud;
    cliente = cliente !== undefined ? cliente : {};
    return (
      <Container>
        <Navbar titulo={"Nueva Solicitud"} navigation={navigation} />
        <Content style={{backgroundColor: 'white'}}>
          
          <View style={styles.container}>
            <View style={styles.row} >
              <View style={styles.col_12} >
                <Text style={styles.encabezado}>Formulario para prestamos</Text>
              </View>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.tittle}>Nombre del cliente</Text>
              <Text style={styles.tittle}>DPI</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.texto}>{cliente.nombres}</Text>
              <Text style={styles.texto}>{cliente.dpi}</Text>
            </View>
            <View style={styles.row} >
              <Text style={styles.tittle}>Monto solicitado</Text>
              <Text style={styles.tittle}>Tipo de producto</Text>
            </View>
            <View/>
            <View style={styles.row}>
              <Item style={{...styles.input, flex:1, marginRight:10}}>
                <Input keyboardType={"numeric"} placeholder="Q." value={solicitud.monto} onChangeText={monto => this.props.editarValor('monto',monto)}/>
                <Text style={estilos.inputError}>{validations.required(solicitud.monto)}</Text>
                {/*<Text style={estilos.inputError}>{validations.monto(solicitud.monto)}</Text>*/}
              </Item>
              <View style={{...styles.input, flex:1, marginLeft:10}}>
                <Picker
                  style={styles.picker}
                  selectedValue={solicitud.tipo_producto.toString()}
                  onValueChange={(itemValue, itemIndex, itemLabel) => 
                  {this.props.editarTipoProducto('tipo_producto',itemValue); this.props.listarCategorias(null, itemValue)}}>
                  {productos.map((producto)=>{
                    return (
                      <Picker.Item key={producto.id} label={producto.nombre} value={producto.id.toString()} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <Text style={estilos.inputError}>{validations.monto(solicitud.monto)}</Text>
            <View style={styles.row} >
              <Text style={styles.tittle}>Plan (cuotas)</Text>
            </View>
            <View style={styles.row}>
              <View style={{...styles.input, height: 50, flex:1, marginLeft:10}}>
                <Picker
                  style={styles.picker}
                  selectedValue={solicitud.plan}
                  onValueChange={(itemValue, itemIndex, itemLabel) => this.props.editarValor('plan',itemValue)}>
                  {planes.map((plan)=>{
                    return (
                      <Picker.Item key={plan.id} label={plan.nombre} value={plan.id} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{flexDirection: "row", marginBottom: 20}}>
              <View style={{flex: 1, flexDirection: "column"}}>
                <View><Text  style={styles.tittle}>Número de cuotas</Text></View>
                <View><Text  style={styles.texto}>{planElegido.cuotas}</Text></View>
              </View>
              <View style={{flex: 1, flexDirection: "column"}}>
                <View><Text  style={styles.tittle}>Total a pagar</Text></View>
                <View><Text  style={styles.texto}>Q. {montoTotal}</Text></View>
                {/* Agregar selección de categoría de producto */}
                <View style={styles.row}>
                  <Text style={styles.tittle}>Categoría de Producto</Text>
                </View>
                <View style={styles.row}>
                  <View style={{...styles.input, height: 50, flex:1, marginLeft:10}}>
                    <Picker
                      style={styles.picker}
                      selectedValue={solicitud.categoria_producto} // Campo de categoría
                      onValueChange={(itemValue, itemIndex, itemLabel) => this.props.editarValor('categoria_producto', itemValue)}
                    >
                      {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.nombre} value={categoria.id} />
                      ))}
                    </Picker>
                  </View>
                </View>
                
              </View>
            </View>
            <View style={styles.row} >
              <View style={styles.col_6} >
                <Text style={styles.tittle}>Garantías</Text>
              </View>
            </View>

            {solicitud.garantias.map((garantia, index)=>{
              return (
                <View key={index}>
                  <View style={styles.line} />
                  <View style={styles.row} >
                    <View style={{flex:1}} >
                      <Text style={{...styles.text_center}}>Img</Text>
                    </View>
                    <View style={{flex:1}} >
                      <Text style={styles.text_center}>{garantia.articulo !== '' ? 'Artículo' : 'Vehículo'}</Text>
                    </View>
                    <View style={{flex:1}} >
                      <Text style={styles.text_center}>Valor</Text>
                    </View>
                    <View style={{flex:1}} >
                      <Text style={styles.text_center}>Acciones</Text>
                    </View>
                  </View>
                  <View style={{...styles.row, alignItems: 'center'}}>
                    <View style={{flex:1, alignItems:'center'}} >
                      <Image source={ garantia.temp_foto !== '' ? garantia.temp_foto.source : fotos.add_foto_icon} style={styles.avatar} />
                    </View>
                    <View style={{flex:1}} >
                      <Text style={styles.text_gray}>{garantia.articulo !== '' ? garantia.articulo : garantia.tipo_vehiculo}</Text>
                    </View>
                    <View style={{flex:1}} >
                      <Text style={styles.text_gray}>Q.{garantia.valor_mercado}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:'row', justifyContent: "center"}} >
                      <TouchableHighlight underlayColor={"#fff"} onPress={() => this.props.loadGarantia(garantia.key, navigation)}>
                        <Image source={fotos.editar} style={{...styles.icono_sm, marginRight:25}}/>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={"#fff"} onPress={() => this.props.eliminarGarantia(garantia.key)}>
                        <Image source={fotos.eliminar} style={styles.icono_sm}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              );
            })}

            <View style={styles.row} >
              <View style={styles.col_6} >
                <Text style={styles.tittle}>Agregar Garantías</Text>
              </View>
            </View>
            <View>
              <View style={styles.row}>
                <TouchableHighlight underlayColor={"#fff"} style={styles.btn} onPress={() => this.props.editarValor('tipo_garantia',1, navigation)}>
                  <Image source={fotos.electro_icon} style={styles.icono}/>
                </TouchableHighlight>
                {/* <TouchableHighlight underlayColor={"#fff"} style={styles.btn} onPress={() => this.props.editarValor('tipo_garantia',2, navigation)}>
                  <Image source={fotos.vehiculo_icon} style={[styles.icono, { opacity: 0 }]}  />
                </TouchableHighlight> */}
              </View>
              <View style={styles.row} >
                <View style={{flex:1}} >
                  <Text style={styles.text_center}>Miselaneos</Text>
                </View>
                {/* <View style={{flex:1}} >
                  <Text style={styles.text_center}></Text>
                </View> */}
              </View>
            </View>

            <View style={styles.formulario}>
              <Text style={styles.tittle}>Observaciones</Text>
              <Item style={styles.textArea}>
                <Textarea style={{flex: 1}} value={solicitud.observaciones} multiline={true} rowSpan={4} onChangeText={dpi => this.props.editarValor("observaciones", dpi)} />
              </Item>
            </View>
            <View style={{...styles.row, paddingHorizontal:'10%' }}>
              <Button style={{flex:1, marginRight:15, marginBottom:50, ...styles.btn_gris}} block onPress={() => navigation.goBack()}>
                <Text>Cancelar</Text>
              </Button>
              <Button style={{flex:1, marginLeft:10, marginBottom:50, ...styles.btn_azul}} block onPress={() => this.verirficarData() }>
                {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                <Text>Guardar</Text>
              </Button>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}

export default  CrearSolicitud;
