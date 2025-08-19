import {
  Container,
  Content,
  Input,
  Item,
  Spinner,
  Text,
  View,
  Button,
} from "native-base";
import React, { Component } from "react";
import styles from "./styles";
import Navbar from "../../Navbar/Navbar";
import { colors } from "../../../../utils/colors";
import { Alert, Keyboard, Modal } from "react-native";
import PagosRegistrados from "../../Carteras/Pagos/PagosRegistrados";


export class RegistrarPago extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { navigation, solicitud, loader, datos_pago } = this.props;
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        <Navbar
          titulo={"Registrar Pago"}
          conteo={0}
          navigation={navigation}
          regresar={() => navigation.goBack()}
        />
        <Content
          style={{
            ...styles.content,
          }}
        >
          <View style={{ ...styles.principal_view }}>
            <Text style={styles.label}>Cliente</Text>
            <Item style={styles.input}>
              <Input
                value={
                  solicitud.cliente.nombres + " " + solicitud.cliente.apellidos
                }
                disabled={true}
              />
            </Item>
            { solicitud && solicitud.plan_cobranza_dificil ? (
              <React.Fragment>
                <Text style={styles.label}>Total pendiente a pagar</Text>
                <Item style={styles.input}>
                  <Input
                    value={"Q" + solicitud.total_pendiente_pagar?.toFixed(2)}
                    disabled={true}
                  />
                </Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Text style={styles.label}>Saldo Pendiente</Text>
                <Item style={styles.input}>
                  <Input
                    value={"Q" + solicitud.saldo_pendiente?.toFixed(2)}
                    disabled={true}
                  />
                </Item>
                <Text style={styles.label}>Atrasado</Text>
                <Item style={styles.input}>
                  <Input
                    value={"Q" + solicitud.monto_pendiente?.toFixed(2)}
                    disabled={true}
                  />
                </Item>
                <Text style={styles.label}>Mora Pendiente</Text>
                <Item style={styles.input}>
                  <Input
                    value={"Q" + solicitud.monto_mora_pendiente?.toFixed(2)}
                    disabled={true}
                  />
                </Item>
                <Text style={styles.label}>Total pendiente a pagar</Text>
                <Item style={styles.input}>
                  <Input
                    value={"Q" + solicitud.total_pendiente_pagar?.toFixed(2)}
                    disabled={true}
                  />
                </Item>
              </React.Fragment>
            )}
            <Text style={{ ...styles.label, marginBottom: 10 }}>
              Detalle de pago
            </Text>
            <View
              style={{
                ...styles.row,
              }}
            >
              <View style={{ flexDirection: "column", marginRight: 10 }}>
                <Text style={styles.label}> Cuota no. </Text>
                <Item style={styles.input}>
                  <Input value={solicitud.cuota_a_pagar ? solicitud.cuota_a_pagar.toString() : ""} disabled={true} />
                </Item>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "40%",
                  marginRight: 10,
                }}
              >
                <Text style={styles.label}> Monto a abonar: </Text>
                <Item style={styles.input}>
                  <Input
                    keyboardType={"numeric"}
                    placeholder="Q."
                    min="0"
                    value={datos_pago.cuota.toString()}
                    onChangeText={(monto) =>
                      this.props.editarDatosPago("cuota", monto)
                    }
                  />
                </Item>
              </View>
              {solicitud && !solicitud.plan_cobranza_dificil && (
                <View style={{ flexDirection: "column", width: "40%" }}>
                  <Text style={styles.label}> Mora: </Text>
                  <Item style={styles.input}>
                    <Input
                      keyboardType={"numeric"}
                      placeholder="Q."
                      min="0"
                      value={datos_pago.mora.toString()}
                      onChangeText={(mora) =>
                        this.props.editarDatosPago("mora", mora)
                      }
                    />
                  </Item>
                </View>
              )}
            </View>

            <View
              style={{
                ...styles.row,
                justifyContent: "space-between",
                marginTop: 25,
              }}
            >
              <Button
                transparent
                style={{
                  ...styles.btn_payments,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                block
                disabled={loader}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={{ color: colors.Azul }}>Ver Pagos</Text>
              </Button>
              <Button
                transparent
                style={{
                  ...styles.btn_payments_2,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                block
                disabled={loader}
                onPress={() => {
                  Keyboard.dismiss()
                  Alert.alert(
                    "Registrar pago",
                    "¿Está seguro de registrar este pago?",
                    [
                      {
                        text: "Aceptar",
                        onPress: () =>{
                          Keyboard.dismiss();
                          this.props.registrarPago(solicitud.id, navigation);
                        },
                      },
                      { text: "Cancelar" },
                    ]
                  );
                }}
              >
                {loader && (
                  <Spinner
                    color={colors.Blanco}
                    size={20}
                    style={{ padding: 10 }}
                  />
                )}
                <Text style={{ color: colors.Blanco }}>Pagar</Text>
              </Button>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {}}
            visible={this.state.modalVisible}
          >
            <PagosRegistrados
              pagos={solicitud.pagos.filter(
                (pago) => pago.cobranza_dificil === true && pago.activo === true
              )}
              cerrar={() => this.setModalVisible(!this.state.modalVisible)}
            />
          </Modal>
        </Content>
      </Container>
    );
  }
}

export default RegistrarPago;
