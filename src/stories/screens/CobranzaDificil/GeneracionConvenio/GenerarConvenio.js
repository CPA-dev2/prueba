import {
  Button,
  Container,
  Content,
  Picker,
  Spinner,
  Switch,
  Text,
  View,
} from "native-base";
import React, { Component } from "react";
import Navbar from "../../Navbar/Navbar";
import styles from "./styles";
import { colors } from "../../../../utils/colors";
import { ActivityIndicator, Keyboard, Alert } from "react-native";
import { calcularFechas } from "../../../../utils/fechas";
import _ from "lodash";

export class GenerarConvenio extends Component {
  constructor(props) {
    super(props);
    this.setPlan = this.setPlan.bind(this);
  }

  componentDidMount() {
    this.props.getPlanes();
    let without_plan = this.props.navigation.getParam("without_solicitud");
    if (without_plan) {
      this.props.loadData(true);
    }
  }


  setPlan(id) {
    const plan = this.props.planes.find(
      (p) => p.id.toString() === id.toString()
    );
    this.props.setNuevoPlan(plan);
    if (plan.periodo !== "Mensual") {
      this.props.editarNuevoConvenio("fecha_inicio", null);
    } else {
      this.props.editarNuevoConvenio(
        "fecha_inicio",
        calcularFechas("Mensual")[0]
      );
    }
  }

  render() {
    const {
      navigation,
      solicitud,
      loader,
      planes,
      nuevo_convenio,
      nuevo_plan,
      data,
    } = this.props;
    let fechas = calcularFechas("Mensual");
    let without_solicitud = navigation.getParam("without_solicitud");
    const ocultar_datos = without_solicitud && data && data.length === 0;
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        <Navbar
          titulo={"Generar Convenio"}
          conteo={0}
          navigation={navigation}
          regresar={() =>{
            this.props.resetSolicitud();
            without_solicitud
              ? navigation.navigate("Home")
              : navigation.navigate("RutaCobranzaDificil");
          }}
        />
        <Content
          style={{
            ...styles.content,
          }}
        >
          <View style={{ ...styles.principal_view }}>
            {loader && (
              <View style={{ alignSelf: "center" }}>
                <Text style={{ ...styles.text_center }}>Cargando...</Text>
                <ActivityIndicator
                  color={colors.Naranja}
                  size={30}
                  style={{ padding: 10 }}
                />
              </View>
            )}
            {!loader && (
              <View>
                {ocultar_datos ? (
                  <View style={{margin:25}}>
                    <Text> No hay clientes pendientes de convenio asignados a tu cartera. </Text>
                  </View>
                ) : (
                  <View>
                    {without_solicitud && (
                      <View>
                        <Text style={styles.label}>Cliente</Text>
                        <View style={{ ...styles.input, marginBottom: 25 }}>
                          <Picker
                            style={styles.picker}
                            selectedValue={solicitud.id}
                            onValueChange={(itemValue, itemIndex) => {
                              let sol = data.find((s) => s.id === itemValue);
                              if (sol != undefined) {
                                this.props.setSolicitud(sol);
                                this.props.editarNuevoConvenio(
                                  "id_solicitud",
                                  sol.id
                                );
                              }
                            }}
                          >
                            {[undefined, ''].includes(solicitud.id) && (
                              <Picker.Item label="Seleccione cliente" />
                            )}
                            {data &&
                              data.length > 0 &&
                              data.map((element) => {
                                return (
                                  <Picker.Item
                                    key={element.id}
                                    label={
                                      element.cliente.nombres +
                                      " " +
                                      element.cliente.apellidos
                                    }
                                    value={element.id}
                                  />
                                );
                              })}
                          </Picker>
                        </View>
                      </View>
                    )}
                    {solicitud && solicitud.monto_mora_pendiente && (
                      <View style={{ marginBottom: 25 }}>
                        <Text style={styles.label}>Mora atrasada: </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          Q{solicitud.monto_mora_pendiente?.toFixed(2)}
                        </Text>
                      </View>
                    )}
                    {solicitud && solicitud.saldo_pendiente && (
                      <View style={{ marginBottom: 25 }}>
                        <Text style={styles.label}>Saldo Pendiente: </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          Q{solicitud.saldo_pendiente?.toFixed(2)}
                        </Text>
                      </View>
                    )}
                    {solicitud && solicitud.total_pendiente_pagar && (
                      <View style={{ marginBottom: 25 }}>
                        <Text style={styles.label}>Total pendiente a pagar: </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          Q{solicitud.total_pendiente_pagar?.toFixed(2)}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.label}>Plan de pago</Text>
                    <View style={{ ...styles.input, marginBottom: 10 }}>
                      <Picker
                        style={styles.picker}
                        selectedValue={nuevo_convenio.id_plan}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setPlan(itemValue);
                          this.props.editarNuevoConvenio("id_plan", itemValue);
                        }}
                      >
                        {planes.map((plan) => {
                          return (
                            <Picker.Item
                              key={plan.id}
                              label={
                                plan.nombre +
                                " - " +
                                plan.periodo +
                                " (" +
                                plan.interes * 100 +
                                "%)"
                              }
                              value={plan.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    {nuevo_plan && nuevo_plan.periodo === "Mensual" && (
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Fecha de Inicio</Text>
                        <View style={{ ...styles.input }}>
                          <Picker
                            style={styles.picker}
                            selectedValue={nuevo_convenio.fecha_inicio}
                            onValueChange={(itemValue) =>
                              this.props.editarNuevoConvenio(
                                "fecha_inicio",
                                itemValue
                              )
                            }
                          >
                            {fechas.map((fecha, index) => {
                              return (
                                <Picker.Item
                                  key={index}
                                  label={fecha}
                                  value={fecha}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      </View>
                    )}

                    <View>
                      <Text style={{ ...styles.label, marginBottom: 5 }}>
                        Eliminar moras del pago original
                      </Text>
                      <View style={{ alignSelf: "flex-start" }}>
                        <Switch
                          trackColor={{ false: colors.Gris, true: "#f7aea1" }}
                          thumbColor={colors.Naranja}
                          onValueChange={(e) =>
                            this.props.editarNuevoConvenio("eliminar_moras", e)
                          }
                          value={nuevo_convenio.eliminar_moras}
                        />
                      </View>
                    </View>

                    <View padder>
                      <Button
                        style={styles.button}
                        block
                        onPress={() => {
                          if (solicitud.id === undefined){
                            Alert.alert("ERROR", "Seleccione un cliente antes de continuar");
                            return;
                          }
                          this.props.editarNuevoConvenio(
                            "id_solicitud",
                            solicitud.id
                          );

                          if (nuevo_convenio.id_plan === null) {
                            this.setPlan(planes[0].id);
                            this.props.editarNuevoConvenio("id_plan", planes[0].id);

                            if (planes[0].periodo === "Mensual") {
                              this.props.editarNuevoConvenio(
                                "fecha_inicio",
                                calcularFechas("Mensual")[0]
                              );
                            }
                          }

                          Keyboard.dismiss();
                          navigation.navigate("ConfirmarConvenio");
                        }}
                      >
                        {loader && (
                          <Spinner color="#ffff" size={20} style={{ padding: 10 }} />
                        )}
                        <Text> Generar Proyección </Text>
                      </Button>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

export default GenerarConvenio;
