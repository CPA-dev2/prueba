import { Container, Content, Text, View } from "native-base";
import React, { Component } from "react";
import Buscador from "../Navbar/Buscador";
import Navbar from "../Navbar/Navbar";
import { fotos } from "../../../utils/fotos";
import styles from "./styles";
import moment from "moment";

import { ActivityIndicator, TouchableHighlight } from "react-native";
import Menu from "./Menu";
import { ACCIONES_COBRANZA_DIFICIL_READ } from "../../../utils/constants";
import { colors } from "../../../utils/colors";

export class Ruta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: true,
      modalVisible: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.loadData();
  }

  componentWillUnmount() {
    this.props.resetConvenio();
    this.props.setSearch("")
  }

  toggleNavbar() {
    this.props.setSearch("");
    this.setState({ search: !this.state.search });
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }



  render() {
    const { navigation, data, loader, solicitud, setSearch } = this.props;
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        {this.state.search ? (
          <Navbar
            regresar={() => {
              navigation.navigate('Home');
            }}
            titulo={"Ruta de Cobranza Difícil"}
            navigation={navigation}
            imagen={fotos.lupa}
            cerrar={() => {
              this.toggleNavbar();
            }}
            conteo={0}
          />
        ) : (
          <Buscador
            placeholder={"Buscar por No. de DPI"}
            salir={this.toggleNavbar}
            inputChange={setSearch}
            submitEditing={this.props.loadData}
          />
        )}

        
        <Content style={{
            backgroundColor: "white",
            padding: 10,
            borderTopColor: colors.Gris,
            borderTopWidth: 0.5,
          }} >

            {loader && 
            <View style={{alignSelf: "center"}}>
              <Text style={{...styles.text_center}}>Cargando información...</Text>
              <ActivityIndicator color={colors.Naranja} size={30} style={{ padding: 10 }} />
            </View>}
            
            {!loader && data.length === 0 && (
                <Text>No tiene ningun crédito de cobranza difícil asignado.</Text>
            )}
          {!loader &&
            data &&
            data.map((solicitud) => {
              let ultima_gestion =
                solicitud.gestiones_cobranza_dificil[
                  solicitud.gestiones_cobranza_dificil.length - 1
                ];
              let cliente = `${solicitud.cliente?.nombres} ${solicitud.cliente?.apellidos}`.replace(/\s+/g, ' ').trim().toUpperCase()
              return (
                <View
                  key={solicitud.id}
                  style={{ flexDirection: "column", ...styles.borde }}
                >
                  <TouchableHighlight
                    underlayColor={"#fff"}
                    onPress={() => {
                      this.toggleModal();
                      this.props.setSolicitud(solicitud);
                    }}
                  >
                    <View>
                      <View style={{ ...styles.row_data }}>
                        <View style={{ ...styles.col_data }}>
                          <Text style={{ ...styles.cliente }}>
                            {cliente}
                          </Text>
                        </View>
                        <View style={{ ...styles.col_data }}>
                          <Text style={{ ...styles.text_info }}>
                            Total Pendiente: Q{solicitud.total_pendiente_pagar.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                      <View style={{ ...styles.row_data }}>
                        <View style={{ ...styles.col_data }}>
                          <Text style={{ ...styles.text_info }}>
                            Fecha última gestión:{" "}
                            {ultima_gestion
                              ? moment(ultima_gestion.creado).format(
                                  "YYYY-MM-DD"
                                )
                              : "--"}
                          </Text>
                        </View>
                        <View style={{ ...styles.col_data }}>
                          <Text style={{ ...styles.text_info }}>
                            Última gestión:{" "}
                            {ultima_gestion
                              ? ACCIONES_COBRANZA_DIFICIL_READ.find(
                                  (e) => e.value.toString() === ultima_gestion.tipo_gestion.toString()
                                )?.label
                              : "--"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              );
            })}

          <View style={{ backgroundColor: "white", height: 60 }} />
          <Menu
            modalVisible={this.state.modalVisible}
            toggleModal={this.toggleModal}
            solicitud={solicitud}
            navigation={navigation}
            irPorDPI={this.props.irPorDPI}
          />
        </Content>
      </Container>
    );
  }
}

export default Ruta;
