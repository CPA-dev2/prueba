import React, { Component } from "react";
import { Container, Text, View, Item, Radio, Picker } from "native-base";
import { ToastAndroid, TouchableHighlight, Platform } from "react-native";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import { fotos } from "../../../utils/fotos";
import _ from "lodash";
import moment from "moment";
import Buscador from "../Navbar/Buscador";
import Dia from "./Dia";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../../utils/colors";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNPrint from "react-native-print";
import FileViewer from "react-native-file-viewer";
import { report_utils } from "./utils";

function getWeekDay(dia) {
  const d = new Date();
  const day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff + dia));
}

class Carteras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_movil: this.props.no_movil,
      search: true,
      index: "lunes",
      estado: "TODOS",
    };
    this.props.listarCarteras(this.state.no_movil);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  _onRefresh() {
    this.props.listarCarteras(this.state.no_movil);
  }

  toggleNavbar() {
    this.setState({ search: !this.state.search });
  }

  async createPDF(data, dia) {
    const gestor = this.props.user.first_name + " " + this.props.user.last_name;
    let options = {
      html: report_utils.get_html(data, gestor, dia),
      fileName: "reporte_cartera_" + new Date(),
      directory: "Documents",
      width: 165,
      height: 765,
    };
    // let file = await RNHTMLtoPDF.convert(options);
    FileViewer.open(file.filePath);
    if(Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        `Se generó el documento correctamente en ${file.filePath}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  }

  async print(data, dia) {
    const gestor = this.props.user.first_name + " " + this.props.user.last_name;
    await RNPrint.print({ html: report_utils.get_html(data, gestor, dia) });
  }

  render() {
    const { navigation, data, loader, filtrarCartera } = this.props;

    let data_lunes = [];
    let data_martes = [];
    let data_miercoles = [];
    let data_jueves = [];
    let data_viernes = [];
    let data_sabado = [];
    // Sacando info segun fecha
    if (data.results !== undefined) {
      let info = [];
      if (this.state.estado === "TODOS") {
        info = data.results;
      } else if (this.state.estado === "VENCIDOS") {
        const hoy = moment().format("YYYY-MM-DD");
        data.results.forEach((d) => {
          const last = _.findLast(d.fechas_pago);
          if (hoy > last.fecha) {
            info.push(d);
          }
        });
      } else if (this.state.estado === "MOROSOS") {
        const hoy = moment().format("YYYY-MM-DD");
        data.results.forEach((d) => {
          const last = _.findLast(d.fechas_pago);
          if (!(hoy > last.fecha) && d.monto_mora_pendiente) {
            info.push(d);
          }
        });
      }
      const hoy = new Date();
      info.forEach((d) => {
        d.pendiente = {};
        const fecha_vencimiento = new Date(d.fecha_vencimiento);
        const vencido = hoy > fecha_vencimiento;
        let fecha = getWeekDay(0);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.lunes = fecha.capital + fecha.interes - fecha.pago;
          data_lunes.push(d);
        } else if (vencido) {
          d.pendiente.lunes = 0;
          data_lunes.push(d);
        } else {
          d.pendiente.lunes = 0;
        }
        fecha = getWeekDay(1);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.martes = fecha.capital + fecha.interes - fecha.pago;
          data_martes.push(d);
        } else if (vencido) {
          d.pendiente.martes = 0;
          data_martes.push(d);
        } else {
          d.pendiente.martes = 0;
        }
        fecha = getWeekDay(2);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.miercoles = fecha.capital + fecha.interes - fecha.pago;
          data_miercoles.push(d);
        } else if (vencido) {
          d.pendiente.miercoles = 0;
          data_miercoles.push(d);
        } else {
          d.pendiente.miercoles = 0;
        }
        fecha = getWeekDay(3);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.jueves = fecha.capital + fecha.interes - fecha.pago;
          data_jueves.push(d);
        } else if (vencido) {
          d.pendiente.jueves = 0;
          data_jueves.push(d);
        } else {
          d.pendiente.jueves = 0;
        }
        fecha = getWeekDay(4);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.viernes = fecha.capital + fecha.interes - fecha.pago;
          data_viernes.push(d);
        } else if (vencido) {
          d.pendiente.viernes = 0;
          data_viernes.push(d);
        } else {
          d.pendiente.viernes = 0;
        }
        fecha = getWeekDay(5);
        fecha = moment(fecha).format("YYYY-MM-DD");
        fecha = _.find(d.fechas_pago, { fecha });
        if (fecha) {
          d.pendiente.sabado = fecha.capital + fecha.interes - fecha.pago;
          data_sabado.push(d);
        } else if (vencido) {
          d.pendiente.sabado = 0;
          data_sabado.push(d);
        } else {
          d.pendiente.sabado = 0;
        }
      });
    }

    let results;
    switch (this.state.index) {
      case "lunes":
        results = data_lunes;
        break;
      case "martes":
        results = data_martes;
        break;
      case "miercoles":
        results = data_miercoles;
        break;
      case "jueves":
        results = data_jueves;
        break;
      case "viernes":
        results = data_viernes;
        break;
      case "sabado":
        results = data_sabado;
        break;
      default:
        results = data_lunes;
    }

    const actions = [
      {
        text: "Generar PDF",
        icon: require("../../../../images/icons/pdf.png"),
        name: "pdf",
        position: 1,
        color: colors.Naranja,
        textBackground: "transparent",
        textElevation: 0,
        textColor: colors.Blanco,
      },
      {
        text: "Imprimir",
        icon: require("../../../../images/icons/print.png"),
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
        {this.state.search ? (
          <Navbar
            regresar={() => {
              navigation.popToTop();
            }}
            titulo={"Pagos pendientes"}
            navigation={navigation}
            imagen={fotos.lupa}
            cerrar={() => {
              this.toggleNavbar();
            }}
          />
        ) : (
          <Buscador
            placeholder={"Buscar por No. de DPI"}
            salir={this.toggleNavbar}
            inputChange={filtrarCartera}
          />
        )}
        <View>
          <Item style={{ borderBottomWidth: 0, marginTop: 5, height: 35 }}>
            <View style={{ flex: 1, flexDirection: "row", marginLeft: 20 }}>
              <Text style={styles.textradio}>Del día </Text>
              <Radio
                selected={!this.state.no_movil}
                onPress={() => {
                  this.setState({ no_movil: false });
                  this.props.listarCarteras(false);
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row", marginRight: 20 }}>
              <Text style={styles.textradio}>Todos </Text>
              <Radio
                selected={this.state.no_movil}
                onPress={() => {
                  this.setState({ no_movil: true });
                  this.props.listarCarteras(true);
                }}
              />
            </View>
            <View style={{ flex: 2, height: 35, justifyContent: "center" }}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.estado}
                onValueChange={(itemValue) =>
                  this.setState({ estado: itemValue })
                }
              >
                <Picker.Item label="Estado-todos" value="TODOS" />
                <Picker.Item label="Estado-vencidos" value="VENCIDOS" />
                <Picker.Item label="Estado-morosos" value="MOROSOS" />
              </Picker>
            </View>
          </Item>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            style={
              this.state.index === "lunes" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "lunes" });
            }}
          >
            <Text style={styles.texto}>L</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.index === "martes" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "martes" });
            }}
          >
            <Text style={styles.texto}>M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.index === "miercoles" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "miercoles" });
            }}
          >
            <Text style={styles.texto}>Mi</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.index === "jueves" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "jueves" });
            }}
          >
            <Text style={styles.texto}>J</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.index === "viernes" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "viernes" });
            }}
          >
            <Text style={styles.texto}>V</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.index === "sabado" ? styles.active_tab : styles.tab
            }
            underlayColor={"#2269A3"}
            onPress={() => {
              this.setState({ index: "sabado" });
            }}
          >
            <Text style={styles.texto}>S</Text>
          </TouchableHighlight>
        </View>
        <Dia
          dia={this.state.index}
          {...this.props}
          no_movil={this.state.no_movil}
          data={{ results }}
        />
        <FloatingAction
          actions={actions}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          color={colors.Naranja}
          onPressItem={(name) => {
            if (name === "pdf") {
              this.createPDF(results, this.state.index);
            }
            if (name === "print") {
              this.print(results, this.state.index);
            }
          }}
          animated={false}
        />
      </Container>
    );
  }
}

export default Carteras;
