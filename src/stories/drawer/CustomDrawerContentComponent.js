import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  List,
  ListItem,
  Body,
  Text,
  View,
} from "native-base";
import { SafeAreaView } from "react-navigation";
import { Alert, Image } from "react-native";
import { estilos } from "../../utils/estilos";
import { colors } from "../../utils/colors";
import NetInfo from "@react-native-community/netinfo";

const routes = [
  {
    route: "Home",
    caption: "Inicio",
    icon: require("../../../images/home.png"),
  },
  {
    route: "ListadoSolicitud",
    caption: "Solicitudes Pendientes",
    icon: require("../../../images/solicitud_pendiente.png"),
  },
  {
    route: "PreAutorizadas",
    caption: "Solicitudes Pre-Autorizadas",
    icon: require("../../../images/pre_autorizada.png"),
  },
  {
    route: "Simulacion",
    caption: "Simulacion pagos",
    icon: require("../../../images/simulacion_de_creditos.png"),
  },
  {
    route: "Inicio",
    caption: "Cerrar Sesión",
    icon: require("../../../images/cierre.png"),
  },
];

const back_routes = [
  {
    route: "ListadoSolicitud",
    caption: "Solicitudes Pendientes",
    icon: require("../../../images/solicitud_pendiente.png"),
  },
  {
    route: "PreAutorizadas",
    caption: "Solicitudes Pre-Autorizadas",
    icon: require("../../../images/pre_autorizada.png"),
  },
];

class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert("ERROR DE CONEXIÓN", "Al parecer no estas conectado a una red, conectate por Wifi o Datos Móviles para poder utilizar la aplicación.")
      }
    });
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === "wifi") {
        this.props.getUris();
      }
    });
  }
  render() {
    const { user } = this.props;
    if (user.perfil.rol?.id === 17 && routes.length === 5) {
      routes.splice(1, 2)
    }
    if (user.perfil.rol?.id !== 17 && routes.length === 3) {
      routes.splice(2, 0, ...back_routes)
    }
   
    return (
      <Container>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <Header
            style={{
              height: 230,
              ...estilos.navbar,
              backgroundColor: "#740D27",
            }}
          >
            <Body style={{ alignItems: "center" }}>
              {user.perfil.avatar && (
                <Image
                  style={{ height: 150, width: 150, borderRadius: 75 }}
                  source={{ uri: user.perfil.avatar }}
                />
              )}
              {!user.perfil.avatar && user.perfil.genero === 10 && (
                <Image
                  style={{ height: 150, width: 150, borderRadius: 75 }}
                  source={require("../../../images/mujer.png")}
                />
              )}
              {!user.perfil.avatar && user.perfil.genero !== 10 && (
                <Image
                  style={{ height: 150, width: 150, borderRadius: 75 }}
                  source={require("../../../images/hombre.png")}
                />
              )}
              <Text style={{ color: "#FFFFFF" }}>
                {user.first_name} {user.last_name}
              </Text>
              {user.perfil.rol?.id !== 17 &&
              <View>
                <View>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    Máximo monto de autorización
                  </Text>
                  <Text style={{ color: "#FFFFFF" }}>
                    Q{user.perfil.rol ? user.perfil.rol.monto_autorizado : "0"}
                  </Text>
                </View>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Cobro del día Q{" "}
                {user.total_dia ? user.total_dia.toFixed(2) : "0.00"}
              </Text>
              </View>}
              {user.perfil.rol?.id === 17 &&
              <View>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                  Cobrado hoy Q{" "}
                  {user.total_dia ? user.total_dia.toFixed(2) : "0.00"}
                </Text>
              </View>}
            </Body>
          </Header>

          <Content>
            <List
              style={{ marginTop: 10 }}
              dataArray={routes}
              renderRow={(data) => {
                return (
                  <ListItem
                    button
                    onPress={() => {
                      if (data.route === "Home") {
                        this.props.navigation.popToTop();
                      } else {
                        this.props.navigation.navigate(data.route);
                      }
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={data.icon}
                      />
                      <Text style={{ color: colors.GrisDark }}>
                        {" "}
                        {data.caption}
                      </Text>
                    </View>
                  </ListItem>
                );
              }}
            />
          </Content>
        </SafeAreaView>
      </Container>
    );
  }
}

export default CustomDrawerContentComponent;
