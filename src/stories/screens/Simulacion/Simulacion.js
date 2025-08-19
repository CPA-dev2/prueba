import React, { Component } from 'react';
import styles from "./styles";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { Container, Content, Spinner, Button, Text, View, Item, Input, Picker } from "native-base";

class Simulacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevaGarantia:false};
  }

  componentDidMount() {
    const { productos, cobranza_dificil } = this.props;
    if (!cobranza_dificil) {
      this.props.editarTipoProducto('tipo_producto', productos[0].id);
    }
  }
  render() {
    const { navigation, loader, planes, productos, datos, cobranza_dificil } = this.props;

    return (
      <Container>
        <Navbar regresar={() => {navigation.popToTop();}} titulo={"Simulacion de crédito"} navigation={navigation} />
        <Content style={{backgroundColor: 'white'}}>
          <View style={styles.container}>
            <View style={styles.row} >
              <View style={styles.col_12} >
                <Text style={styles.encabezado}>Formulario para prestamos</Text>
              </View>
            </View>
            <View style={styles.row} >
              <Text style={styles.tittle}>Monto solicitado</Text>
              {!cobranza_dificil && <Text style={styles.tittle}>Tipo de producto</Text>}
            </View>
            <View/>
            <View style={styles.row}>
              <Item style={{...styles.input, flex:1, marginRight:10, marginLeft: 10 }}>
                <Input keyboardType={"numeric"} placeholder="Q." value={datos.monto.toString()} onChangeText={monto => this.props.editarValor('monto',monto)}/>
                {/*<Text style={estilos.inputError}>{validations.monto(solicitud.monto)}</Text>*/}
              </Item>
              {!cobranza_dificil &&
              <View style={{...styles.input, flex:1, marginLeft:10}}>
                <Picker
                  style={styles.picker}
                  selectedValue={datos.tipo_producto}
                  onValueChange={(itemValue) => this.props.editarTipoProducto('tipo_producto', parseInt(itemValue))}>
                  {productos.map((producto)=>{
                    return (
                      <Picker.Item key={producto.id} label={producto.nombre} value={producto.id} />
                    );
                  })}
                </Picker>
              </View>}
            </View>
            <View style={styles.row} >
              <Text style={styles.tittle}>Plan (cuotas)</Text>
            </View>
            <View style={styles.row}>
              <View style={{...styles.input, height: 50, flex:1, marginLeft:10}}>
                <Picker
                  style={styles.picker}
                  selectedValue={datos.plan}
                  onValueChange={(itemValue, itemIndex, itemLabel) => this.props.editarValor('plan', parseInt(itemValue))}>
                  {planes.map((plan)=>{
                    return (
                      <Picker.Item key={plan.id} label={plan.nombre} value={plan.id} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{...styles.row, paddingHorizontal:'10%' }}>
              <Button style={{flex:1, marginLeft:10, marginBottom:50, ...styles.btn_azul}} block onPress={() => this.props.getFechas(navigation) }>
                {(loader) && (<Spinner color="#fff" size={20} style={{padding:10}} />)}
                <Text>Simular crédito</Text>
              </Button>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}

export default  Simulacion;
