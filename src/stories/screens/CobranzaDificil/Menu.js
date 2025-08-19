import { Icon, View } from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { colors } from "../../../utils/colors";
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalVisible, toggleModal, solicitud, navigation } = this.props;
    const cliente = `${solicitud.cliente?.nombres} ${solicitud.cliente?.apellidos}`.replace(/\s+/g, ' ').trim().toUpperCase()
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.closeButton}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  <View>
                    <Text>
                      <Icon style={{ color: colors.Naranja }} name="close" />
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 15,
                }}
              >
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.props.irPorDPI(solicitud.cliente.dpi, navigation);
                    toggleModal();
                  }}
                >
                  <View>
                    <Text style={styles.title}>
                      <Icon style={styles.title} name="person" />
                      {" "}
                      {cliente}
                    </Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    Linking.openURL(`tel:${solicitud.cliente.telefono}`);
                    toggleModal();
                  }}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      marginTop: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Tel. {solicitud.cliente?.telefono}
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={styles.row_option}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    if (solicitud.plan_cobranza_dificil) {
                      this.props.navigation.navigate("RegistrarPago");
                      toggleModal();
                    } else {
                      Alert.alert(
                        "NO PERMITIDO",
                        "No es posible registrar un pago en un crédito que no tiene un convenio de cobranza difícil generado."
                      );
                    }
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>REGISTRAR PAGO</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.props.navigation.navigate("NuevaGestion");
                    toggleModal();
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>
                      REGISTRAR GESTIÓN
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.row_option}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    if (!solicitud.plan_cobranza_dificil) {
                      this.props.navigation.navigate("GenerarConvenio");
                      toggleModal();
                    } else {
                      Alert.alert(
                        "YA TIENE CONVENIO",
                        "Este crédito ya tiene un convenio de pago generado."
                      );
                    }
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>
                      GENERAR CONVENIO
                    </Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.props.navigation.navigate("GestionesPorCredito");
                    toggleModal();
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>
                      HISTORIAL DE GESTIONES
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row_option: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: 5,
    paddingLeft: 5,
  },
  option: {
    flexDirection: "column",
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    width: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    textAlign: "right",
    fontSize: 18,
    right: 0,
    top: 0,
    paddingTop: 3,
    paddingRight: 7,
  },
  title: {
    color: colors.Naranja,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 5,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  optionText: {
    textAlign: "left",
  },
});

export default Menu;
