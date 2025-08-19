import React, { Component } from 'react';
import { Container, Content, Button, Text, View } from "native-base";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import {colors} from "../../../../utils/colors";
import moment from "moment";


function formatoHora(cell) {
  const fecha = new Date(cell);
  return (
    `${fecha.toLocaleTimeString()}`
  );
}
function formatoFecha(cell) {
  const fecha = new Date(cell);
  return (
    ` ${moment(fecha).format('DD/MM/YYYY')}`
  );
}

class PagosRegistrados extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation, pagos } = this.props;
    return (
      <Container>
        <Navbar titulo={'Listado de Pagos'} navigation={navigation} regresar={this.props.cerrar}/>
        <View style={{flexDirection: "row", ...styles.borde, paddingTop: 7, paddingBottom: 7, paddingRight: 20, paddingLeft: 20 }}>
          <View style={{flex: 2}}>
            <Text style={{fontWeight: "bold"}}>Fecha</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontWeight: "bold"}}>Pago</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontWeight: "bold"}}>Mora</Text>
          </View>
        </View>
        <Content style={{backgroundColor: 'white'}}>
          {pagos.map((pago) => {
            return (
              <View style={{flexDirection: "row", ...styles.borde, paddingTop: 7, paddingBottom: 7, paddingRight: 20, paddingLeft: 20 }} key={pago.id}>
                <View style={{flex: 2, flexDirection: "row"}}>
                  <Text>{formatoFecha(pago.fecha)} {formatoHora(pago.fecha)}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                  <Text>{`Q${(pago.capital + pago.interes).toFixed(2)}`}</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                  <Text>{`Q${pago.mora.toFixed(2)}`}</Text>
                </View>
              </View>
            );
          })}
          <View style={{marginTop: 10}}>
            <Button transparent style={{...styles.btn_blanco_azul, marginLeft: 5, marginRight: 5, alignSelf: "center"}} onPress={() => {
              this.props.cerrar();
            }}>
              <Text style={{color:colors.Azul}}>Regresar</Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

export default PagosRegistrados;
