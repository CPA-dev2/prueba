import { Container, Content, Text, View } from "native-base";
import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./styles";
import { colors } from "../../../utils/colors";
import Gestion from "./Gestion";

export class ListadoGestiones extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { navigation, solicitud } = this.props;
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        <Navbar
          titulo={"Historial de Gestiones"}
          conteo={0}
          navigation={navigation}
          regresar={() => navigation.goBack()}
        />
        <Content
          style={{
            backgroundColor: "white",
            padding: 10,
            borderTopColor: colors.Gris,
            borderTopWidth: 0.5,
            
          }}
        >
          <Text
            style={{
              ...styles.cliente,
              fontSize: 18,
              marginBottom: 10,
              paddingLeft: 8,
            }}
          >
            {solicitud.cliente?.apellidos.toUpperCase()},{" "}
            {solicitud?.cliente.nombres.toUpperCase()}{" "}
          </Text>

          {solicitud.gestiones_cobranza_dificil.length === 0 && (
            <Text
              style={{
                ...styles.text_info,
                paddingLeft: 8,
              }}
            >
              No hay gestiones registradas.
            </Text>
          )}

          {solicitud.gestiones_cobranza_dificil.map((gestion, key) => {
            return (
              <View key={key}>
                <Gestion gestion={gestion} />
              </View>
            );
          })}
          <View style={{backgroundColor: 'white', height: 60 }}></View>
        </Content>
      </Container>
    );
  }
}

export default ListadoGestiones;
