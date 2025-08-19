import React, { Component } from 'react';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { Container, Content, Spinner, Button, Text, View, Icon, Item, Input } from "native-base";
import { Keyboard, TouchableHighlight } from "react-native";
import styles from "./styles";
import { estilos } from "../../utils/estilos";
import { colors } from "../../utils/colors";
import Navbar from "../screens/Navbar/Navbar";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], opcion: ''};
    this.filtrar = this.filtrar.bind(this);
    this.hacerSeleccion = this.hacerSeleccion.bind(this);
  }
  componentWillMount() {
    this.setState({data: this.props.data});
  }
  filtrar(nombre) {
    if (nombre !== ''){
      const options = {keys: ['nombre']};
      const fuse = new Fuse(this.props.data, options);
      const data = fuse.search(nombre);
      this.setState({data});
    } else {
      const data = this.props.data;
      this.setState({data});
    }
  }
  seleccionar(opcion) {
    this.props.cerrar(opcion);
  }
  hacerSeleccion(nombre) {
    if (nombre.trim() !== ''){
      const opcion = _.find(this.props.data, {nombre});
      if (opcion){
        this.seleccionar(opcion);
      } else {
        this.seleccionar({ nombre, id: 0 });
      }
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={this.props.titulo} navigation={navigation} regresar={this.props.cerrar}/>
        <View style={styles.content}>
          <Item style={styles.busqueda_container}>
            <Input style={styles.busqueda}
                   placeholder={this.props.placeholder ? this.props.placeholder : this.props.titulo}
                   onSubmitEditing={() => Keyboard.dismiss()} onChangeText={opcion => {
                     this.filtrar(opcion);
                     this.setState({opcion});
                   }}/>
            <TouchableHighlight underlayColor={"#fff"} onPress={() => {
              this.hacerSeleccion(this.state.opcion);
            }}>
              <IconMaterial color={colors.Azul} size={30} name="add"/>
            </TouchableHighlight>
          </Item>
        </View>
        <Content>
          <View>
            {this.state.data.map((opcion) => {
              return <TouchableHighlight
                underlayColor={"#fff"}
                style={styles.opcion}
                key={opcion.id}
                onPress={() => {
                  this.seleccionar(opcion);
                }}>
                <View style={styles.grupo}>
                  <Text style={styles.texto}>{opcion.nombre}</Text>
                </View>
              </TouchableHighlight>;
            })}
          </View>
        </Content>
      </Container>
    );
  }
}

export default Select;
