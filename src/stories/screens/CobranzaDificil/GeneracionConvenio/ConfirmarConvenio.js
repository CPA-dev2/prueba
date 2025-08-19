import { Button, Container, Content, Spinner, Text, View } from "native-base";
import React, { Component } from "react";
import Navbar from "../../Navbar/Navbar";
import styles from "./styles";
import { colors } from "../../../../utils/colors";
import { Alert, Platform, ToastAndroid } from "react-native";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNPrint from "react-native-print";
import FileViewer from "react-native-file-viewer";
import { FloatingAction } from "react-native-floating-action";
import { html_utils } from "./utils";

export class ConfirmarConvenio extends Component {
  constructor(props) {
    super(props);
  }

  async createPDF() {
    let options = {
      html: html_utils.get_html(
        this.props.demo_simulacion,
        this.props.solicitud,
        this.props.nuevo_plan
      ),
      fileName: "tarjeta_cobro_" + this.props.solicitud.cliente.nombres,
      directory: "Documents",
      width: 164,
      height: 765,
    };
    // let file = await RNHTMLtoPDF.convert(options);
    this.props.setLoader(false);
    FileViewer.open(file.filePath);
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        `Se generó el documento correctamente en ${file.filePath}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  }

  async print() {
    await RNPrint.print({
      html: html_utils.get_html(
        this.props.demo_simulacion,
        this.props.solicitud,
        this.props.nuevo_plan
      ),
    });
  }

  componentDidMount() {
    this.props.simularPagos();
  }

  getTotalPendiente(){
    const { solicitud, nuevo_convenio } = this.props;
    const monto_mora = solicitud.monto_mora_pendiente ? solicitud.monto_mora_pendiente : 0;
    const saldo_pendiente = solicitud.saldo_pendiente ? solicitud.saldo_pendiente : 0;
    const eliminar_moras = nuevo_convenio.eliminar_moras ? nuevo_convenio.eliminar_moras : false;
    let total = monto_mora + saldo_pendiente;
    if (eliminar_moras) {
       total = total - monto_mora;
    }
    return total;
  }

  render() {
    const {
      navigation,
      loader,
      nuevo_plan,
      demo_simulacion,
    } = this.props;
    const actions = [
      {
        text: "Generar PDF de proyección",
        icon: require("../../../../../images/icons/pdf.png"),
        name: "pdf",
        position: 1,
        color: colors.Naranja,
        textBackground: "transparent",
        textElevation: 0,
        textColor: colors.Blanco,
      },
      {
        text: "Imprimir",
        icon: require("../../../../../images/icons/print.png"),
        name: "print",
        position: 2,
        color: colors.Naranja,
        textBackground: "transparent",
        textElevation: 0,
        textColor: colors.Blanco,
      },
    ];
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        <Navbar
          titulo={"Generar Convenio"}
          conteo={0}
          navigation={navigation}
          regresar={() => navigation.goBack()}
        />
        <Content
          style={{
            backgroundColor: "white",
            padding: 10,
            borderTopColor: colors.Gris,
            borderTopWidth: 1,
          }}
        >
          <View
            style={{
              paddingRight: 35,
              paddingLeft: 35,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.label}>Monto del Convenio: </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}
              >
                Q{this.getTotalPendiente().toFixed(2)}
              </Text>
              <Text style={styles.label}>Intereses: </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}
              >
                Q{(this.getTotalPendiente() * nuevo_plan.interes).toFixed(2)}
              </Text>
              <Text style={styles.label}>Total: </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}
              >
                Q
                {(this.getTotalPendiente() * (1 + nuevo_plan.interes)).toFixed(
                  2
                )}
              </Text>
                </View>

            {loader ? (
              <View>
                <Text style={styles.text_center}>Cargando información...</Text>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 3,
                  }}
                >
                  <Text style={{ flex: 0.5, ...styles.text_center }}>No.</Text>
                  <Text style={{ flex: 1.5, ...styles.text_center }}>
                    Fecha
                  </Text>
                  <Text style={{ flex: 1, ...styles.text_center }}>Cuota</Text>
                  <Text style={{ flex: 1, ...styles.text_center }}>Saldo</Text>
                </View>
                {demo_simulacion.map((item) => {
                  return (
                    <View
                      key={item.numero}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Text style={{ ...styles.text_gray, flex: 0.5 }}>
                        {item.numero}
                      </Text>
                      <Text style={{ ...styles.text_gray, flex: 1.5 }}>
                        {item.fecha}
                      </Text>
                      <Text style={{ ...styles.text_gray, flex: 1 }}>
                        Q.{item.cuota.toFixed(2)}
                      </Text>
                      <Text
                        style={{
                          ...styles.text_gray,
                          flex: 1,
                          textAlign: "right",
                        }}
                      >
                        Q.{item.saldo.toFixed(2)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            <View padder>
              <Button
                style={{ ...styles.button, width: 250 }}
                block
                onPress={() => {
                  Alert.alert(
                    "Generar Convenio",
                    "¿Está seguro de generar este convenio?",
                    [
                      {
                        text: "Aceptar",
                        onPress: () => this.props.generarConvenio(navigation),
                      },
                      { text: "Cancelar" },
                    ]
                  );
                }}
              >
                {loader && (
                  <Spinner color="#ffff" size={20} style={{ padding: 10 }} />
                )}
                <Text> Generar Convenio </Text>
              </Button>
            </View>
          </View>
          <View style={{ backgroundColor: "white", height: 160 }} />
        </Content>
        <FloatingAction
          actions={actions}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          color={colors.Naranja}
          onPressItem={(name) => {
            if (name === "pdf") {
              this.props.setLoader(true);
              this.createPDF();
            }
            if (name === "print") {
              this.print();
            }
          }}
          animated={false}
        />
      </Container>
    );
  }
}

export default ConfirmarConvenio;
