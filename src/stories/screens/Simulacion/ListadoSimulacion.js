import React, { Component } from 'react';
import { RefreshControl, Image } from "react-native";
import { Container, Content, Spinner, Button, Text, View, ScrollView, Icon, Item, Input, Picker, Toast } from "native-base";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles-listado";

class ListadoSimulacion extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { demo, loader, navigation } = this.props;
    return (
      <Container>
        <Navbar regresar={() => {navigation.navigate("Simulacion");}} titulo={"Simulacion de crédito"} navigation={navigation}/>
        <Content style={{backgroundColor: 'white'}}>
          {(loader) ? (
            <View><Text style={styles.text_center}>Cargando información...</Text></View>
          ) : (
            <View>
            <View style={{ flexDirection: "row", alignItems:"center" }}>
              <Text style={{ flex: 1, ...styles.text_center}}>Número</Text>
              <Text style={{ flex: 2, ...styles.text_center}}>Fecha</Text>
              <Text style={{ flex: 1, ...styles.text_center}}>Cuota</Text>
              <Text style={{ flex: 1, ...styles.text_center}}>Saldo</Text>
            </View>
            {(demo.map((item) => {
              return (<View key={item.numero} style={{ flexDirection: "row", alignItems:"center" }}>
                <Text style={{ ...styles.text_gray, flex: 0.5}}>{item.numero}</Text>
                <Text style={{ ...styles.text_gray, flex: 1.5}}>{item.fecha}</Text>
                <Text style={{ ...styles.text_gray, flex: 1}}>Q.{item.cuota.toFixed(2)}</Text>
                <Text style={{ ...styles.text_gray, flex: 1}}>Q.{item.saldo.toFixed(2)}</Text>
              </View>);
            }))}
          </View>
          )}
        </Content>
      </Container>
    );
  }
}

export default  ListadoSimulacion;
