import { Container, Content, Icon, Text, View } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, Platform, ToastAndroid } from "react-native";
import DatePicker from "react-native-datepicker";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../../../utils/colors";
import Navbar from "../../Navbar/Navbar";
import Gestion from "../Gestion";
import styles from "./styles";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNPrint from "react-native-print";
import FileViewer from "react-native-file-viewer";
import { report_utils } from "./utils";
export class ReporteGestiones extends Component {
  constructor(props) {
    super(props);
  }

  async createPDF() {
    const gestiones = this.props.gestiones;
    const filtros_gestiones = this.props.filtros_gestiones;
    const user = this.props.user;
    let options = {
      html: report_utils.get_html(gestiones, filtros_gestiones, user),
      fileName:
        "reporte_gestiones_cobranza_dificil_" +
        report_utils.get_string_full_date(),
      directory: "Documents",
      width: 165,
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
    const gestiones = this.props.gestiones;
    const filtros_gestiones = this.props.filtros_gestiones;
    const user = this.props.user;
    await RNPrint.print({
      html: report_utils.get_html(gestiones, filtros_gestiones, user),
    });
  }

  componentDidMount() {
    this.props.setFiltroGestion("from", report_utils.get_monday_date());
    this.props.setFiltroGestion("to", report_utils.get_saturday_date());
  }

  render() {
    const { navigation, gestiones, loader, filtros_gestiones } = this.props;
    const actions = [
      {
        text: "Generar PDF",
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
          titulo={"Reporte de Gestiones"}
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
          <View
            style={{
              ...styles.input,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Icon style={{ marginRight: 10, marginLeft: 15 }} name="calendar" />
            <Text style={styles.label}>Desde</Text>
            <DatePicker
              androidMode="spinner"
              style={{ flex: 1 }}
              mode="date"
              date={filtros_gestiones.from}
              placeholder="Desde..."
              format="DD-MM-YYYY"
              confirmBtnText="Aceptar"
              cancelBtnText="Cancelar"
              maxDate={report_utils.get_today_date()}
              showIcon={false}
              customStyles={styles.styles_date_picker}
              onDateChange={(date) => {
                this.props.setFiltroGestion("from", date);
              }}
            />
            <Text style={styles.label}>Hasta</Text>
            <DatePicker
              androidMode="spinner"
              style={{ flex: 1 }}
              mode="date"
              date={filtros_gestiones.to}
              placeholder="Hasta"
              format="DD-MM-YYYY"
              confirmBtnText="Aceptar"
              cancelBtnText="Cancelar"
              maxDate={report_utils.get_saturday_date()}
              showIcon={false}
              customStyles={styles.styles_date_picker}
              onDateChange={(date) => {
                this.props.setFiltroGestion("to", date);
              }}
            />
          </View>

          {loader && (
            <View style={{ alignSelf: "center" }}>
              <Text style={{ ...styles.text_center }}>
                Cargando información...
              </Text>
              <ActivityIndicator
                color={colors.Naranja}
                size={30}
                style={{ padding: 10 }}
              />
            </View>
          )}

          {!loader && gestiones && gestiones.length === 0 && (
            <Text
              style={{
                ...styles.text_info,
                paddingLeft: 8,
              }}
            >
              No hay gestiones registradas.
            </Text>
          )}

          {!loader &&
            gestiones &&
            gestiones.map((gestion, key) => {
              return (
                <View key={key}>
                  <Gestion gestion={gestion} with_name={true} />
                </View>
              );
            })}
          <View style={{ backgroundColor: "white", height: 125 }} />
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
export default ReporteGestiones;
