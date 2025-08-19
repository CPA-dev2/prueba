import { Icon, View } from "native-base";
import React, { Component } from "react";
import {
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
    const {
      modalVisible,
      toggleModal,
      cartera_seleccionada,
      navigation,
    } = this.props;
    const cliente = `${cartera_seleccionada.cliente?.nombres} ${cartera_seleccionada.cliente?.apellidos}`.replace(/\s+/g, ' ').trim().toUpperCase()
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
                  paddingTop: 10,
                }}
              >
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.props.irPorDPI(
                      cartera_seleccionada.cliente.dpi,
                      navigation
                    );
                    toggleModal();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.title}>
                      <Icon style={styles.title} name="person" />
                      {" "}{cliente}
                    </Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    Linking.openURL(
                      `tel:${cartera_seleccionada.cliente.telefono}`
                    );
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
                    Tel. {cartera_seleccionada.cliente?.telefono}
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={styles.row_option}>
                <TouchableHighlight underlayColor={"#fff"} onPress={() => {}}>
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    this.props.cobroIrDPI(
                      cartera_seleccionada.cliente.dpi,
                      navigation
                    );
                    toggleModal();
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>Ver Perfil</Text>
                  </View>
                </TouchableHighlight>
              </View>

              <View style={styles.row_option}>
                <TouchableHighlight underlayColor={"#fff"} onPress={() => {}}>
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  onPress={() => {
                    navigation.navigate("RegistrarPagos");
                    toggleModal();
                  }}
                >
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText }}>Registrar Pago</Text>
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
    width: 125,
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
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  optionText: {
    textAlign: "right",
  },
});

export default Menu;
