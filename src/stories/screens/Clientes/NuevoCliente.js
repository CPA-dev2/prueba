import React, { Component } from 'react';
import { Textarea, Container, Spinner, Button, Text, View, Icon, Item, Input, Picker, Content, Radio, Toast} from "native-base";
import { Keyboard, Image, TouchableHighlight, Modal, Alert, NetInfo } from "react-native";
import DatePicker from 'react-native-datepicker';
import { api } from "../../../utils/api";
import { estilos } from "../../../utils/estilos";
import styles from "./styles";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { DEPARTAMENTOS } from "../../../utils/departamentos_municipios";
import Select from "../../select/Select";
import Referencias from "./Referencias";
import { validations } from "../../../utils/validation";
import { fotos as galeria } from "../../../utils/fotos";

import ModalImagen from './ModalImagen.js'

const hoy = new Date();
hoy.setFullYear(hoy.getFullYear() - 18);


class NuevoCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paso: 1,
      cliente: {},
      date: `${hoy.getFullYear()}/${hoy.getMonth() + 1}/${hoy.getDate()}`,
      modalVisible: false,
      modalRef: false,
      modalPerfil: false,
      modalDPI: false,
      modalRecibo:false,
      modalIngreso:false

    };
    this.setSexoM = this.setSexoM.bind(this);
    this.setSexoF = this.setSexoF.bind(this);
    this.setViviendaC = this.setViviendaC.bind(this);
    this.setViviendaA = this.setViviendaA.bind(this);
    this.setRadioValue = this.setRadioValue.bind(this);
    this.crearCliente = this.crearCliente.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.abrirModalPerfil = this.abrirModalPerfil.bind(this);
    this.abrirModalDPI = this.abrirModalDPI.bind(this);
    this.abrirModalRecibo = this.abrirModalRecibo.bind(this);
    this.abrirModalIngreso = this.abrirModalIngreso.bind(this);
    this.cerrarModalPerfil = this.cerrarModalPerfil.bind(this);
    this.cerrarModalDPI = this.cerrarModalDPI.bind(this);
    this.cerrarModalRecibo = this.cerrarModalRecibo.bind(this);
    this.cerrarModalIngreso = this.cerrarModalIngreso.bind(this);

  }
  componentWillMount(){
    this.setState({cliente: {}});
  }


  setRadioValue(key, value) {
    return () => {
      this.props.editarValor(key, value);
    };
  }
  setSexoF(){
    this.props.editarValor("genero", 20);
  }
  setSexoM(){
    this.props.editarValor("genero", 10);
  }
  setViviendaA(){
    this.props.editarValor("genero", 20);
  }
  setViviendaC(){
    this.props.editarValor("genero", 10);
  }
 
  crearCliente() {
    const cliente = this.props.nuevo_cliente;
    if (!this.props.loader) {
      let path;
      let metodo;
      if (cliente.id !== undefined) {
        path = `clientes/${cliente.id}`;
        metodo = "PUT";
      } else {
        path = "clientes";
        metodo = "POST";
      }
      if (
        cliente.nombres
        && cliente.apellidos
        && cliente.nacimiento
        && cliente.estado_civil
        && cliente.aldea.departamento
        && cliente.aldea.municipio
        && cliente.aldea.nombre
        && cliente.telefono
        && cliente.profesion
        && cliente.direccion
      ) {
        this.props.setLoader(true);
        if (metodo === "POST") {
          api.post(path, {data: JSON.stringify(cliente)}, {}, this.props.token).catch((err) => {
            // console.log(err);
            Alert.alert(
              'Error',
              'Ha ocurrido un error, verifica y vuelve a intentar',
              [
                {text: 'Aceptar'},
              ],
              {cancelable: false}
            );
            this.props.setLoader(false);
          }).then((resp) => {
            if (resp) {
              this.props.crearUris(resp.id);
              Alert.alert(
                'Exito',
                'Datos almacenados exitosamente',
                [
                  {text: 'Aceptar'},
                ],
                {cancelable: false}
              );
              this.props.navigation.popToTop();
            }
            this.props.setLoader(false);
          });
        } else {
          api.put(path, {data: JSON.stringify(cliente)}, {}, this.props.token).catch((err) => {
            console.log(err);
            Alert.alert(
              'Error',
              'Ha ocurrido un error, verifica y vuelve a intentar',
              [
                {text: 'Aceptar'},
              ],
              {cancelable: false}
            );
            this.props.setLoader(false);
          }).then((resp) => {
            if (resp) {
              this.props.crearUris(resp.id);
              Alert.alert(
                'Exito',
                'Datos almacenados exitosamente',
                [
                  {text: 'Aceptar'},
                ],
                {cancelable: false}
              );
              this.props.navigation.popToTop();
            }
              this.props.setLoader(false);
          });
        }
      } else {
        Alert.alert(
          'Información faltante',
          'Por favor llene la información obligatoria',
          [
            {text: 'Aceptar'},
          ],
          { cancelable: false }
        );
        this.props.setLoader(false);
      }
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  abrirModalPerfil = () => {
    this.setState({modalPerfil: true});

  };

  cerrarModalPerfil = () => {
    this.setState({modalPerfil: false});
  };

  abrirModalDPI = () => {
    this.setState({modalDPI: true});

  }; 

  cerrarModalDPI = () => {
    this.setState({modalDPI: false});
  };

  abrirModalRecibo = () => {
    this.setState({modalRecibo: true});
  }; 

  cerrarModalRecibo = () => {
    this.setState({modalRecibo: false});
  };

  abrirModalIngreso = () => {
    this.setState({modalIngreso: true});

  }; 

  cerrarModalIngreso = () => {
    this.setState({modalIngreso: false});
  };


  render() {
    const { loader, navigation, editarValor, nuevo_cliente, municipios, fotos } = this.props;

    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={(nuevo_cliente.id !== undefined) ? "Datos Cliente" : "Nuevo Cliente"} navigation={navigation} />
        <Content>
          <View style={styles.content}>
            <Text style={styles.titulo}>Formulario para nuevo expediente</Text>
          </View>
          <Text style={styles.subtitulo}>Datos del cliente</Text>
          <View style={styles.formulario}>
            <Text style={styles.nombre}>Nombres*</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.nombres} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("nombres", dpi)} />
              <Text style={estilos.inputError}>{validations.required(nuevo_cliente.nombres)}</Text>
            </Item>
            <Text style={styles.nombre}>Apellidos*</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.apellidos} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("apellidos", dpi)} />
              <Text style={estilos.inputError}>{validations.required(nuevo_cliente.apellidos)}</Text>
            </Item>
            {/*SELECCION DE IMAGENES*/}
             
            <View style={styles.lineaAvatar}>
              <TouchableHighlight
                underlayColor={"#fff"}
                onPress={
                  this.abrirModalPerfil
                }>
                <View style={styles.grupoAvatar}>

                <ModalImagen 
                  modalImage = {this.state.modalPerfil}
                  cerrarModal = {this.cerrarModalPerfil}
                  editarFotos = {this.props.editarFotos}
                  peticion = {"foto"}
                />
                
                <Image source={fotos.foto ? fotos.foto : require("../../../../images/upload-cliente.png")} style={styles.avatar} />
                  <Text style={styles.textoAvatar}>Foto de perfil</Text>
                </View>

              </TouchableHighlight>
            </View>

            <View style={styles.lineaAvatar}>
              <TouchableHighlight
                underlayColor={"#fff"}
                onPress={
                  this.abrirModalDPI
                }>
                <View style={styles.grupoAvatar}>
                  <ModalImagen 
                    modalImage = {this.state.modalDPI}
                    cerrarModal = {this.cerrarModalDPI}
                    editarFotos = {this.props.editarFotos}
                    peticion = {"foto_dpi"}
                  />

                  <Image source={fotos.foto_dpi ? fotos.foto_dpi : require("../../../../images/upload-dpi.png")} style={styles.avatar} />
                  <Text style={styles.textoAvatar}>Foto de DPI</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.lineaAvatar}>
              <TouchableHighlight
                underlayColor={"#fff"}
                onPress={
                  this.abrirModalRecibo
                }>
                <View style={styles.grupoAvatar}>
                  <ModalImagen 
                      modalImage = {this.state.modalRecibo}
                      cerrarModal = {this.cerrarModalRecibo}
                      editarFotos = {this.props.editarFotos}
                      peticion = {"foto_recibo"}
                  />
                  <Image source={fotos.foto_recibo ? fotos.foto_recibo : require("../../../../images/upload-recibo.png")} style={styles.avatar} />
                  <Text style={styles.textoAvatar}>Foto de recibo de luz</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.lineaAvatar}>
              <TouchableHighlight
                underlayColor={"#fff"}
                onPress={
                  this.abrirModalIngreso
                }>
                <View style={styles.grupoAvatar}>
                  <ModalImagen 
                      modalImage = {this.state.modalIngreso}
                      cerrarModal = {this.cerrarModalIngreso}
                      editarFotos = {this.props.editarFotos}
                      peticion = {"foto_casa"}
                  />

                  <Image source={fotos.foto_casa ? fotos.foto_casa : require("../../../../images/upload-casa.png")} style={styles.avatar} />
                  <Text style={styles.textoAvatar}>Foto de Fuente de Ingreso</Text>
                </View>
              </TouchableHighlight>
            </View>
            {/*FIN IMAGENES*/}


            <Text style={styles.nombre}>Género</Text>
            <View style={styles.input}>
              <Item style={{borderBottomWidth:0, marginTop:5, height:35}}>
                <View style={{flex:1, flexDirection:'row', marginLeft:20}}>
                  <Text style={styles.textradio}>Masculino  </Text>
                  <Radio selected={nuevo_cliente.genero === 10} onPress={this.setRadioValue("genero", 10)}/>
                </View>
                <View style={{flex:1, flexDirection:'row', marginRight:20,}}>
                  <Text style={styles.textradio}>Femenino  </Text>
                  <Radio selected={nuevo_cliente.genero === 20} onPress={this.setRadioValue("genero", 20)}/>
                </View>
              </Item>
            </View> 
            <Text style={styles.nombre}>Estado Civil</Text>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.estado_civil ? nuevo_cliente.estado_civil.toString() : "10"} onValueChange={(itemValue, itemIndex) => editarValor("estado_civil", itemValue)}>
                <Picker.Item label="Soltero" value="10" />
                <Picker.Item label="Casado" value="20" />
                <Picker.Item label="Divorciado" value="30" />
                <Picker.Item label="Viudo" value="40" />
              </Picker>
            </View>
            <Text style={styles.nombre}>Profesión u oficio*</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.profesion} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("profesion", dpi)} />
              <Text style={estilos.inputError}>{validations.required(nuevo_cliente.profesion)}</Text>
            </Item>
            <Text style={styles.nombre}>Fecha de nacimiento*</Text>
            <View style={{...styles.input, alignItems: 'center', flexDirection: "row"}}>
              <DatePicker
                androidMode="spinner"
                style={{flex: 1 }}
                date={nuevo_cliente.nacimiento}
                mode="date"
                placeholder="Seleccione la Fecha"
                format="YYYY-MM-DD"
                confirmBtnText="Aceptar"
                cancelBtnText="Cancelar"
                maxDate={`${hoy.getFullYear()}/${hoy.getMonth() + 1}/${hoy.getDate()}`}
                customStyles={{
                  dateTouchBody: {
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  },
                  dateInput: {
                    borderWidth:0,
                  },
                  dateText: {
                    color: '#515151',
                    alignItems: 'flex-start',
                    marginLeft:20,
                  },
                  placeholderText: {
                    color: '#515151',
                    alignItems: 'flex-start',
                    marginLeft:20,
                  },
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  }
                }}
                onDateChange={(date) => {this.setState({date: date}); editarValor("nacimiento", date);}}
              />
            </View>
            <Text style={styles.nombre}>Departamento</Text>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.aldea.departamento} onValueChange={(itemValue, itemIndex) => {editarValor("departamento", itemValue);}}>
                {(DEPARTAMENTOS).map((depto) => {
                  return <Picker.Item key={depto.id} label={depto.nombre} value={depto.id} />;
                })}
              </Picker>
            </View>
            <Text style={styles.nombre}>Municipio</Text>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.aldea.municipio} onValueChange={(itemValue, itemIndex) => editarValor("municipio", itemValue)}>
                {(municipios).map((muni) => {
                  return <Picker.Item key={muni.id} label={muni.nombre} value={muni.id} />;
                })}
              </Picker>
            </View>
            <Text style={styles.nombre}>Barrio, aldea, colonia, etc.*</Text>
            <Modal animationType="slide"
                   transparent={false}
                   onRequestClose={() => {}}
                   visible={this.state.modalVisible}>
              <Select navigation={this.props.navigation} titulo="Seleccion Aldea" placeholder={"Escriba para buscar o crear una opción"} data={this.props.aldeas} cerrar={(opcion) => {
                this.setModalVisible(!this.state.modalVisible);
                if (opcion) {
                  editarValor("nombre", opcion);
                }
              }}/>
            </Modal>
            <Item style={{...styles.input, flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", backgroundColor:'#ffffff'}}>
              <TouchableHighlight underlayColor={"#fff"} style={{alignSelf: "stretch", height: 33, flex: 3, backgroundColor:'#ffffff' }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text>{nuevo_cliente.aldea.nombre}</Text>
              </TouchableHighlight>
              <Text style={{...estilos.inputError, flex: 1.3, textAlign: "right" }}>{validations.required(nuevo_cliente.aldea.nombre)}</Text>
            </Item>
            <Text style={styles.nombre}>Dirección</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.direccion} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("direccion", dpi)} />
              <Text style={estilos.inputError}>{validations.required(nuevo_cliente.direccion)}</Text>
            </Item>
            <Text style={styles.nombre}>Vive en</Text>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.tipo_vivienda ? nuevo_cliente.tipo_vivienda.toString() : "10"} onValueChange={(itemValue) => editarValor("tipo_vivienda", itemValue)}>
                <Picker.Item label="Casa propia" value="10" />
                <Picker.Item label="Alquiler" value="20" />
                <Picker.Item label="Familiar" value="30" />
              </Picker>
            </View>
            <Text style={styles.nombre}>Nis</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.nis} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("nis", dpi)} />
            </Item>
            <Text style={styles.nombre}>Teléfono*</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} value={nuevo_cliente.telefono} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={telefono => editarValor("telefono", telefono)} />
              <Text style={estilos.inputError}>{validations.required(nuevo_cliente.telefono)}</Text>
            </Item>
            <Text style={styles.nombre}>Es Whatsapp</Text>
            <View style={styles.input}>
              <Item style={{borderBottomWidth:0, marginTop:5, height:35}}>
                <View style={{flex:1, flexDirection:'row', marginLeft:20}}>
                  <Text style={styles.textradio}>Si</Text>
                  <Radio selected={nuevo_cliente.es_whatsapp} onPress={this.setRadioValue("es_whatsapp", true)}/>
                </View>
                <View style={{flex:1, flexDirection:'row', marginRight:20}}>
                  <Text style={styles.textradio}>No </Text>
                  <Radio selected={!nuevo_cliente.es_whatsapp} onPress={this.setRadioValue("es_whatsapp", false)}/>
                </View>
              </Item>
            </View>
              <Text style={styles.nombre}>Número de NIT</Text>
              <Item style={styles.input}>
                  <Input keyboardType={"numeric"} value={nuevo_cliente.nit} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={nit => editarValor("nit", nit)}/>
              </Item>
          </View>
          <Text style={styles.subtitulo}>Actividad económica</Text>
          <View style={styles.formulario}>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.tipo_cliente.toString()} onValueChange={(itemValue) => editarValor("tipo_cliente", parseInt(itemValue))}>
                <Picker.Item label="Microempresario" value="10" />
                <Picker.Item label="Empleado" value="20" />
                <Picker.Item label="Otro" value="30" />
              </Picker>
            </View>
          </View>
          <Text style={styles.subtitulo}>{nuevo_cliente.tipo_cliente === 10 && "Datos del negocio"}</Text>
          <Text style={styles.subtitulo}>{nuevo_cliente.tipo_cliente === 20 && "Datos del empleado"}</Text>
          <Text style={styles.subtitulo}>{nuevo_cliente.tipo_cliente === 30 && "Datos de la actividad económica"}</Text>
          {/* MICROEMPRESARIO */}
          {(nuevo_cliente.tipo_cliente === 10) && (<View style={styles.formulario}>
            <Text style={styles.nombre}>Nombre del negocio</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.nombre_negocio} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("nombre_negocio", dpi)} />
            </Item>
            <Text style={styles.nombre}>Dirección</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.direccion_negocio} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("direccion_negocio", dpi)} />
            </Item>
            <Text style={styles.nombre}>Teléfono</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.telefono_negocio} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("telefono_negocio", dpi)} />
              <Text style={estilos.inputError}>{validations.phone(nuevo_cliente.socioeconomico.telefono_negocio)}</Text>
            </Item>
            <Text style={styles.nombre}>Antigüedad de negocio</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.tiempo_laborar} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("tiempo_laborar", dpi)} />
            </Item>
          </View>)}
          {/* EMPLEADO */}
          {(nuevo_cliente.tipo_cliente === 20) && (<View style={styles.formulario}>
            <Text style={styles.nombre}>Nombre o razón social</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.razon_empresa} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("razon_empresa", dpi)} />
            </Item>
            <Text style={styles.nombre}>Tipo de empresa</Text>
            <View style={styles.input}>
              <Picker style={styles.picker} selectedValue={nuevo_cliente.socioeconomico.tipo_empresa ? nuevo_cliente.socioeconomico.tipo_empresa.toString() : "10"} onValueChange={(itemValue, itemIndex) => editarValor("tipo_empresa", itemValue)}>
                <Picker.Item label="Individual" value="10" />
                <Picker.Item label="Jurídica" value="20" />
              </Picker>
            </View>
            <Text style={styles.nombre}>Giro de la empresa</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.actividad_empresa} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("actividad_empresa", dpi)} />
            </Item>
            <Text style={styles.nombre}>Dirección</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.direccion_empresa} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("direccion_empresa", dpi)} />
            </Item>
            <Text style={styles.nombre}>Teléfono de la empresa</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.telefono_empresa} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("telefono_empresa", dpi)} />
              <Text style={estilos.inputError}>{validations.phone(nuevo_cliente.socioeconomico.telefono_empresa)}</Text>
            </Item>
            <Text style={styles.nombre}>Nombre de quien gira constancias laborales</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.nombre_constancias} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("nombre_constancias", dpi)} />
            </Item>
            <Text style={styles.nombre}>Teléfono de quien gira constancias</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.telefono_constancias} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("telefono_constancias", dpi)} />
              <Text style={estilos.inputError}>{validations.phone(nuevo_cliente.socioeconomico.telefono_constancias)}</Text>
            </Item>
            <Text style={styles.nombre}>Tiempo que lleva funcionando la empresa</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.tiempo_funcionamiento_empresa} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("tiempo_funcionamiento_empresa", dpi)} />
            </Item>
          </View>)}
          {/*DATOS DEL TRABAJADOR*/}
          {(nuevo_cliente.tipo_cliente === 20) && (
            <Text style={styles.subtitulo}>Datos del trabajador</Text>
          )}
          {(nuevo_cliente.tipo_cliente === 20) && (
            <View style={styles.formulario}>
              <Text style={styles.nombre}>Puesto de trabajo</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.puesto_trabajo} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("puesto_trabajo", dpi)} />
              </Item>
              <Text style={styles.nombre}>Tiempo de laborar</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.tiempo_trabajar} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("tiempo_trabajar", dpi)} />
              </Item>
              <Text style={styles.nombre}>Departamento o sucursal donde labora</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.departamento_laboral} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("departamento_laboral", dpi)} />
              </Item>
              <Text style={styles.nombre}>Salario nominal</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.salario_nominal} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("salario_nominal", dpi)} />
                <Text style={estilos.inputError}>{validations.moneda(nuevo_cliente.socioeconomico.salario_nominal)}</Text>
              </Item>
              <Text style={styles.nombre}>Otros ingresos</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.otros_ingresos} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("otros_ingresos", dpi)} />
                <Text style={estilos.inputError}>{validations.moneda(nuevo_cliente.socioeconomico.otros_ingresos)}</Text>
              </Item>
              <Text style={styles.nombre}>Descuentos</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.descuentos} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("descuentos", dpi)} />
                <Text style={estilos.inputError}>{validations.moneda(nuevo_cliente.socioeconomico.descuentos)}</Text>
              </Item>
              <Text style={styles.nombre}>Salario líquido</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.salario_liquido} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("salario_liquido", dpi)} />
                <Text style={estilos.inputError}>{validations.moneda(nuevo_cliente.socioeconomico.salario_liquido)}</Text>
              </Item>
              <Text style={styles.nombre}>Paga IGSS</Text>
              <View style={styles.input}>
                <Item style={{borderBottomWidth:0, marginTop:5, height:35}}>
                  <View style={{flex:1, flexDirection:'row', marginLeft:20}}>
                    <Text style={styles.textradio}>Sí  </Text>
                    <Radio selected={nuevo_cliente.socioeconomico.paga_igss === 10} onPress={this.setRadioValue("paga_igss", 10)}/>
                  </View>
                  <View style={{flex:1, flexDirection:'row', marginRight:20,}}>
                    <Text style={styles.textradio}>No  </Text>
                    <Radio selected={nuevo_cliente.socioeconomico.paga_igss === 20} onPress={this.setRadioValue("paga_igss", 20)}/>
                  </View>
                </Item>
              </View>
              <Text style={styles.nombre}>Jefe inmediato</Text>
              <Item style={styles.input}>
                <Input value={nuevo_cliente.socioeconomico.nombre_jefe} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("nombre_jefe", dpi)} />
              </Item>
              <Text style={styles.nombre}>Teléfono del jefe inmediato</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.telefono_jefe} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("telefono_jefe", dpi)} />
                <Text style={estilos.inputError}>{validations.phone(nuevo_cliente.socioeconomico.telefono_jefe)}</Text>
              </Item>
              <Text style={styles.nombre}>No. Cuenta nómina</Text>
              <Item style={styles.input}>
                <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.cuenta_nomina} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={cuentanomina => editarValor("cuenta_nomina", cuentanomina)} />
                <Text style={estilos.inputError}>{validations.integer(nuevo_cliente.socioeconomico.cuenta_nomina)}</Text>
              </Item>
            </View>)}
          {/* Otra actividad económica */}
          {(nuevo_cliente.tipo_cliente === 30) && (<View style={styles.formulario}>
            <Text style={styles.nombre}>Ocupación actual</Text>
            <View style={styles.input}>
              <Picker
                  style={styles.picker}
                  selectedValue={nuevo_cliente.socioeconomico.ocupacion !== null ? nuevo_cliente.socioeconomico.ocupacion.toString() : "1"}
                  onValueChange={(itemValue) => editarValor("ocupacion", itemValue)}>
                <Picker.Item label="Estudiante" value="1" />
                <Picker.Item label="Ama de casa" value="2" />
                <Picker.Item label="Agricultor" value="3" />
                <Picker.Item label="Jubilado" value="4" />
                <Picker.Item label="Profesional" value="5" />
              </Picker>
            </View>
            <Text style={styles.nombre}>Dirección donde ejerce</Text>
            <Item style={styles.input}>
              <Input value={nuevo_cliente.socioeconomico.direccion_negocio} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dir => editarValor("direccion_negocio", dir)} />
            </Item>
            <Text style={styles.nombre}>Ingreso promedio</Text>
            <Item style={styles.input}>
              <Input keyboardType={"numeric"} value={nuevo_cliente.socioeconomico.ingreso_promedio.toString()} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={ingreso_promedio => editarValor("ingreso_promedio", ingreso_promedio)} />
            </Item>
            <Text style={styles.nombre}>Periocidad de ingresos</Text>
            <View style={styles.input}>
              <Picker
                  style={styles.picker}
                  selectedValue={nuevo_cliente.socioeconomico.periocidad_ingresos !== null ? nuevo_cliente.socioeconomico.periocidad_ingresos.toString() : "DIARIO"}
                  onValueChange={(itemValue) => editarValor("periocidad_ingresos", itemValue)}>
                <Picker.Item label="Diario" value="DIARIO" />
                <Picker.Item label="Semanal" value="SEMANAL" />
                <Picker.Item label="Quincenal" value="QUINCENAL" />
                <Picker.Item label="Mensual" value="MENSUAL" />
              </Picker>
            </View>
          </View>)}
          <View style={styles.formulario}>
            <Text style={styles.nombre}>Observaciones</Text>
            <Item style={styles.textArea}>
              <Textarea style={{ flex: 1 }} value={nuevo_cliente.observaciones} multiline={true} rowSpan={4} onSubmitEditing={() => Keyboard.dismiss()} onChangeText={dpi => editarValor("observaciones", dpi)} />
            </Item>
          </View>
          {/* REFERENCIAS */}
          <Text style={styles.subtitulo}>Referencias</Text>
          <View style={styles.formulario}>
            <View style={{flexDirection: "row", justifyContent: "center", flex: 1}}>
              <View style={{flex:2}}><Text style={{...styles.nombre, fontWeight: "bold"}}>Nombre</Text></View>
              <View style={{flex:1}}><Text style={{...styles.nombre, fontWeight: "bold"}}>Teléfono</Text></View>
              <View style={{flex:1}}><Text style={{...styles.nombre, fontWeight: "bold"}}>Acciones</Text></View>
            </View>
            {nuevo_cliente.referencias.map((referencia, index) => {
              referencia.key = referencia.key ? referencia.key : index;
              return (
                <View key={referencia.key} style={{flexDirection: "row", justifyContent: "center", flex: 1}}>
                  <View style={{ marginTop: 5, flex:2}}><Text style={styles.nombre}>{referencia.nombre}</Text></View>
                  <View style={{ marginTop: 5, flex:1}}><Text style={styles.nombre}>{referencia.telefono}</Text></View>
                  <View style={{ marginTop: 5, flex:1, flexDirection:'row', justifyContent: "center"}}>
                    <TouchableHighlight underlayColor={"#fff"} onPress={() => {
                      this.setState({referencia});
                      this.setState({modalRef: !this.state.modalRef});
                    }}>
                      <Image source={galeria.editar} style={{...styles.icono_sm, marginRight:15}}/>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"#fff"}  onPress={() => this.props.eliminarReferencia(referencia.key)}>
                      <Image source={galeria.eliminar} style={styles.icono_sm}/>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            })}
            <Modal animationType="slide"
                   transparent={false}
                   onRequestClose={() => {}}
                   visible={this.state.modalRef}>
              <Referencias referencia={this.state.referencia} navigation={this.props.navigation} cerrar={(referencia, anterior) => {
                this.setState({modalRef: !this.state.modalRef});
                if (referencia) {
                  if (!anterior) {
                    this.props.agregarReferencia(referencia);
                  } else {
                    referencia.key = anterior.key;
                    this.props.editarReferencia(referencia);
                  }
                }
              }}/>
            </Modal>
            <View padder style={styles.referencia}>
              <Button style={{...styles.boton, alignSelf: 'flex-end'}} block onPress={() => {
                this.setState({referencia: null});
                this.setState({modalRef: !this.state.modalRef});
              }}>
                {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                <Text>Agregar Referencia</Text>
              </Button>
            </View>
          </View>
          {/* FIN REFERENCIAS */}
          <View padder>
            <Button style={styles.boton} block onPress={() => this.crearCliente(navigation)}>
              {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
              <Text>Finalizar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default NuevoCliente;
