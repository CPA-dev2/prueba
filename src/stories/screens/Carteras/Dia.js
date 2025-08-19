import React, { Component } from "react";
import {
  Content,
  Text,
  View,
} from "native-base";
import { RefreshControl, TouchableHighlight } from "react-native";
import styles from "./styles";
import _ from "lodash";
import moment from "moment";
import Tooltip from "rn-tooltip";
import Menu from "./Menu";

function formatoEstado(cuota, fechas_pago) {
  const hoy = moment().format("YYYY-MM-DD");
  const last = _.findLast(fechas_pago);
  if (hoy > last.fecha) {
    return "#C03618";
  }
  if (cuota) {
    return "#E58F31";
  } else {
    return "#67BA73";
  }
}
function formatoEstadoTooltip(cuota, fechas_pago) {
  const hoy = moment().format("YYYY-MM-DD");
  const last = _.findLast(fechas_pago);
  if (hoy > last.fecha) {
    return <Text style={{ color: "#fff" }}>Vencido</Text>;
  }
  if (cuota) {
    return <Text style={{ color: "#fff" }}>Atrasado</Text>;
  } else {
    return <Text style={{ color: "#fff" }}>Al dia</Text>;
  }
}
function formatoPlan(plan) {
  if (plan) {
    const periodo = plan.periodo;
    if (periodo === "Diario") {
      return <Text style={{ color: "#DEAD29", fontSize: 12 }}>Diario</Text>;
    }
    if (periodo === "Semanal") {
      return <Text style={{ color: "#9268E6", fontSize: 12 }}>Semanal</Text>;
    }
    if (periodo === "Quincenal") {
      return <Text style={{ color: "#B86CB0", fontSize: 12 }}>Quincenal</Text>;
    }
    if (periodo === "Mensual") {
      return <Text style={{ color: "#FE5F93", fontSize: 12 }}>Mensual</Text>;
    }
  }
}

class Dia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  _onRefresh() {
    this.props.listarCarteras(this.props.no_movil);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    const { navigation, data, loader, dia, cartera_seleccionada } = this.props;
    return (
      <Content
        style={{ backgroundColor: "white" }}
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {loader ? (
          <View>
            <Text style={styles.text_center}>Cargando información...</Text>
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...styles.text_center }}>Cartera de clientes</Text>
            </View>
            {data.results !== undefined &&
              data.results.map((solicitud, key) => {
                const color = formatoEstado(
                  solicitud.monto_mora_pendiente,
                  solicitud.fechas_pago
                );
                const periodo = formatoPlan(solicitud.plan);
                const fechas = solicitud.fechas_pago[1];
                const pactado = fechas.capital + fechas.interes;
                return (
                  <View
                    key={key}
                    style={{ flexDirection: "column", ...styles.borde }}
                  >
                    <View
                      style={{
                        ...styles.titulo_nombre,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip
                        popover={formatoEstadoTooltip(
                          solicitud.monto_mora_pendiente,
                          solicitud.fechas_pago
                        )}
                        backgroundColor={color}
                      >
                        <View
                          style={{
                            ...styles.circle,
                            backgroundColor: color,
                            alignSelf: "center",
                          }}
                        />
                      </Tooltip>
                      <TouchableHighlight
                        underlayColor={"#fff"}
                        onPress={() => {
                          this.props.setCarteraSeleccionada(solicitud);
                          this.toggleModal()
                        }}
                      >
                        <View
                          style={{
                            ...styles.titulo_nombre,
                            flexDirection: "column",
                          }}
                        >
                          <Text style={{ ...styles.appellidos, color }}>
                            {solicitud.cliente.apellidos},{" "}
                            {solicitud.cliente.nombres}{" "}
                          </Text>
                          <View>{periodo}</View>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <TouchableHighlight
                      underlayColor={"#fff"}
                      onPress={() => {
                        this.props.setCarteraSeleccionada(solicitud);
                        this.toggleModal()
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 10,
                          paddingLeft: 3,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          {this.props.no_movil ? (
                            <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                              <Text style={{ ...styles.text_gray }}>
                                Pendiente:
                              </Text>
                              <Text style={{ ...styles.text_gray }}>
                                Q.{" "}
                                {solicitud.saldo_pendiente !== null
                                  ? solicitud.saldo_pendiente.toFixed(2)
                                  : "0.00"}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                              <Text style={{ ...styles.text_gray }}>
                                Monto:
                              </Text>
                              <Text style={{ ...styles.text_gray }}>
                                Q.{" "}
                                {solicitud.monto_pendiente !== null
                                  ? solicitud.monto_pendiente.toFixed(2)
                                  : "0.00"}
                              </Text>
                            </View>
                          )}
                          <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                            <Text style={{ ...styles.text_gray }}>Mora:</Text>
                            <Text style={{ ...styles.text_gray }}>
                              Q.{" "}
                              {solicitud.monto_mora_pendiente !== null
                                ? solicitud.monto_mora_pendiente.toFixed(2)
                                : "0.00"}
                            </Text>
                          </View>
                          <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                            <Text style={{ ...styles.text_gray }}>
                              Pactado:
                            </Text>
                            <Text style={{ ...styles.text_gray }}>
                              Q. {pactado.toFixed(2)}
                            </Text>
                          </View>
                          <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                            <Text style={{ ...styles.text_gray }}>
                              Del día:
                            </Text>
                            <Text style={{ ...styles.text_gray }}>
                              Q. {solicitud.pendiente[dia].toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                );
              })}
            <View style={{ backgroundColor: "white", height: 100 }} />
          </View>
        )}
        <Menu
          modalVisible = {this.state.modalVisible}
          toggleModal = {this.toggleModal}
          cartera_seleccionada={cartera_seleccionada}
          navigation = {navigation}
          {...this.props}
        />
      </Content>
    );
  }
}

export default Dia;
