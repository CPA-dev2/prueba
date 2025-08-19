import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Item, Input, Right, List, ListItem, Icon, Toast } from "native-base";
import { Image, TouchableHighlight } from 'react-native';
import { estilos } from "../../../utils/estilos";
import styles from "./styles";
import {colors} from "../../../utils/colors";

class Buscador extends Component {
  constructor(props){
    super(props);
    this.state = {texto: ''};
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(texto){
    this.setState({texto});
    this.props.inputChange(texto);
  }

  render() {
    const { placeholder, salir, submitEditing } = this.props;
    return (
      <Header style={estilos.navbar}>
        <Button style={{...styles.boton_cerrar}} transparent onPress={() => salir()}>
          <Image style={styles.cerrar} source={ require('../../../../images/icons/cerrar.png') } />
        </Button>
        <Item style={{flex:4, alignSelf: "center"}}>
          <Input style={{color: colors.Negro}} returnKeyLabel="search" returnKeyLabel="search" placeholderTextColor={"white"} placeholder={placeholder} value={this.state.texto} onChangeText={texto => this.inputChange(texto)} onSubmitEditing={(e) => {
            if(submitEditing) {
              submitEditing()
            }
          }}/>
        </Item>
        <Button style={styles.boton} transparent onPress={() => {
          if(submitEditing) {
            submitEditing()
          }
        }}>
          <Image style={styles.extra} source={require("../../../../images/icons/lupa.png")}/>
        </Button>
      </Header>
    );
  }
}

export default Buscador;
