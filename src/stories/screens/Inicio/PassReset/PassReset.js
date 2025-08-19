import React, { Component } from 'react';
import {Dimensions, Image} from 'react-native';
import styles from "./styles";
import { Container, Content, Spinner, Button, Text, View, Icon, Item, Input } from "native-base";
import {colores} from "../../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;

const background = require("../../../../../images/lock-background.png");
const logo = require("../../../../../images/lock.png");

class PassReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cambiar: false,
      currentPassword:"",
      passwod: "",
      confirmPassword:""
    };
  }
  componentWillMount(){
    this.setState({
      cambiar: false,
      currentPassword:"",
      passwod: "",
      confirmPassword:""
    });
  }
  render() {
    const {navigation,  autenticado, submitError, loader } = this.props;
    return (
      <Container>
        <Content style={{backgroundColor: "white"}}>
          {!this.state.cambiar && (
              <View style={{height: deviceHeight}}>
              <Image source={background} style={styles.shadow} />
              <Image source={logo} style={styles.logo} />
              <View style={{display:'flex', alignItems:'center'}}>
                <Text style={styles.texto}>Es necesario que cambies tu contraseña</Text>
                <Button style={styles.btn} block onPress={() => this.setState({cambiar:true})}>
                  <Text>Cambiar contraseña</Text>
                </Button>
              </View>
            </View>
          )}
          {(this.state.cambiar && !autenticado)  && (
            <View style={{height: deviceHeight}}>
              <Image source={background} style={styles.shadow} />
              <Image source={logo} style={styles.logo} />
              <View style={styles.form}>
                <View style={styles.input}>
                  <Item>
                    <Icon style={colores.gris} name="lock" />
                    <Input placeholder="Contraseña actual" secureTextEntry onChangeText={currentPassword => this.setState({currentPassword})}/>
                  </Item>
                </View>
                <View style={styles.input}>
                  <Item>
                    <Icon style={colores.gris} name="unlock" />
                    <Input placeholder="Nueva contraseña" secureTextEntry onChangeText={password => this.setState({password})}/>
                  </Item>
                </View>
                <View style={styles.input}>
                  <Item>
                    <Icon style={colores.gris} name="unlock" />
                    <Input placeholder="Confirmar contraseña" secureTextEntry onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                  </Item>
                </View>
              </View>
              {(submitError) && (
                <Text style={styles.error}>Datos incorrectos, verifique y vuelva a intentar</Text>
              )}
              <View padder>
                <Button style={styles.btn_azul} block onPress={() =>
                  this.props.onSubmit({
                    currentPassword: this.state.currentPassword,
                    password: this.state.password,
                    confirm: this.state.confirmPassword,
                  })}>
                  {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                  <Text>Actualizar contraseña</Text>
                </Button>
              </View>
            </View>
          )}
          {(this.state.cambiar && autenticado) && (
            <View style={{height: deviceHeight}}>
              <Image source={background} style={styles.shadow} />
              <Image source={logo} style={styles.logo} />
              <View padder>
                <Text style={styles.texto}>Información actualizada, por favor vuelve a ingresar</Text>
                <Button style={styles.btn_azul} block onPress={() =>navigation.navigate("Inicio")}>
                  <Text>Ir a login</Text>
                </Button>
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

export default  PassReset;
