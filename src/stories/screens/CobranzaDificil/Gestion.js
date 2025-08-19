import { Text, View } from "native-base";
import React, { Component } from "react";
import moment from "moment";
import { StyleSheet } from "react-native";

import { ACCIONES_COBRANZA_DIFICIL_READ } from "../../../utils/constants";
import { colors } from "../../../utils/colors";

export class Gestion extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { gestion, with_name } = this.props;
    return (
      <View>
        {with_name && (
          <View style={{ ...styles.row_data }}>
            <View style={{ ...styles.col_data_cliente }}>
              <Text style={{ ...styles.cliente }}>
                {gestion.cliente?.nombres.toUpperCase() + " " + gestion.cliente?.apellidos.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        <View style={{ ...styles.row_data }}>
          <View style={{ ...styles.col_data }}>
            <Text style={{ ...styles.text_info }}>
              Tipo:{" "}
              <Text style={{ ...styles.text_info_resalted }}>
                {gestion
                  ? ACCIONES_COBRANZA_DIFICIL_READ.find(
                      (e) => e.value === gestion.tipo_gestion
                    )?.label
                  : "--"}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.col_data }}>
            <Text style={{ ...styles.text_info }}>
              Asesor:{" "}
              <Text style={{ ...styles.text_info_resalted }}>
                {gestion.asesor_cobranza_dificil.nombres},{" "}
                {gestion.asesor_cobranza_dificil.apellidos}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ ...styles.row_data }}>
          <View style={{ ...styles.col_data }}>
            {!with_name && <Text style={{ ...styles.text_info }}>
              Fecha:{" "}
              <Text style={{ ...styles.text_info_resalted }}>
                {gestion
                  ? moment(gestion.creado).format("DD-MM-YYYY")
                  : "--"}
              </Text>
            </Text>}
            {with_name && <Text style={{ ...styles.text_info }}>
              Fecha:{" "}
              <Text style={{ ...styles.text_info_resalted }}>
                {gestion
                  ? moment(gestion.creado).format("DD-MM-YYYY h:mm a")
                  : "--"}
              </Text>
            </Text>}
          </View>
          <View style={{ ...styles.col_data }}>
            {!with_name && (
              <Text style={{ ...styles.text_info }}>
                Hora: {""}
                <Text style={{ ...styles.text_info_resalted }}>
                  {gestion ? moment(gestion.creado).format("h:mm a") : "--"}
                </Text>
              </Text>
            )}
            {with_name && (
              <Text style={{ ...styles.text_info }}>
                Saldo pendiente: {""}
                <Text style={{ ...styles.text_info_resalted }}>
                  {"Q" + gestion.saldo_pendiente.toFixed(2)}
                </Text>
              </Text>
            )}
          </View>
        </View>
        <View style={{ ...styles.row_data }}>
          <View
            style={{
              ...styles.col_data,
              width: "100%",
              marginTop: 10,
              borderBottomColor: colors.Gris,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          >
            <Text style={{ ...styles.text_info }}>
              Detalle:{" "}
              <Text style={{ ...styles.text_info_resalted }}>
                {gestion.detalle}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row_data: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "white",
    borderWidth: 0,
  },
  col_data: {
    flexDirection: "column",
    width: "50%",
  },
  col_data_cliente: {
    flexDirection: "column",
  },
  cliente: {
    color: colors.Naranja,
    fontSize: 14,
    fontWeight: "bold",
  },
  text_info: {
    color: colors.GrisDark,
    fontSize: 13,
  },
  text_info_resalted: {
    color: colors.GrisDark,
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default Gestion;
