import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content, Button, Text, View, Input, Item, Picker } from "native-base";
import { Keyboard, Alert } from 'react-native';
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import { estilos } from "../../../../utils/estilos";
import { validations } from "../../../../utils/validation";

class ModalCambioSolicitud extends Component {
  constructor(props) {
    super(props);
    const planes = _.filter(props.planes, {tipo_producto: Number(props.tipo_producto.id)});
    this.state = {
      justificacion: "",
      monto: props.monto,
      planes,
      productos: props.productos,
      tipo_producto: props.tipo_producto.id,
      plan: props.plan.id,
    };
    this.cerrar = this.cerrar.bind(this);
    this.cambioTipoProducto = this.cambioTipoProducto.bind(this);
  }
  cerrar() {
    if (validations.required(this.state.monto) === null &&
      validations.monto(this.state.monto) === null) {
    } else {
      if (this.state.justificacion) {
        this.props.cerrar(this.state);
      }
    }
  }
  cambioTipoProducto(id) {
    const planes = this.props.planes;
    const plan = _.filter(planes, {tipo_producto: Number(id)});
    this.setState({tipo_producto: id, plan: plan.id, planes:plan});
  }
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Navbar titulo={'Modificación de solicitud'} navigation={navigation} regresar={this.props.cerrar}/>
        <Content style={{padding:15}}>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Monto</Text>
          <Item style={styles.input}>
            <Input value={this.state.monto.toString()} keyboardType={"numeric"} onSubmitEditiong={() => {
              Keyboard.dismiss();
            }} onChangeText={monto => this.setState({monto})}/>
            <Text style={estilos.inputError}>{validations.required(this.state.monto)}</Text>
            <Text style={estilos.inputError}>{validations.monto(this.state.monto)}</Text>
          </Item>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Tipo de producto</Text>
          <Picker
            style={styles.picker}
            selectedValue={this.state.tipo_producto.toString()}
            onValueChange={(itemValue, itemIndex, itemLabel) => this.cambioTipoProducto(itemValue)}>
            {this.state.productos.map((producto) => {
              return (
                <Picker.Item key={producto.id} label={producto.nombre} value={producto.id.toString()} />
              );
            })}
          </Picker>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Plan (cuotas)</Text>
          <Picker
            style={styles.picker}
            selectedValue={this.state.plan}
            onValueChange={(itemValue, itemIndex, itemLabel) => this.setState({ plan: itemValue })}>
            {this.state.planes.map((plan)=>{
              return (
                <Picker.Item key={plan.id} label={plan.nombre} value={plan.id} />
              );
            })}
          </Picker>
          <Text style={{...styles.bottomTitulo, fontWeight:"bold", fontSize: 20}}>Observaciones</Text>
          <Item style={styles.input}>
            <Input value={this.state.justificacion} onSubmitEditiong={() => {
              Keyboard.dismiss();
              this.props.cerrar(this.state.justificacion);
            }} onChangeText={justificacion => this.setState({justificacion})}/>
          </Item>
          <View padder style={{flexDirection:"row", justifyContent:"center"}}>
            <Button style={styles.boton_cancelar} block onPress={() => this.props.cerrar()}>
              <Text>Cancelar</Text>
            </Button>
            <Button style={styles.boton} block onPress={() => this.cerrar()}>
              <Text>Aceptar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ModalCambioSolicitud;
