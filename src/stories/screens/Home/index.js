import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Body,
  Right,
  Item,
  View,
  Spinner,
  Left,
} from "native-base";
import { Image, TouchableHighlight } from "react-native";
import { estilos } from "../../../utils/estilos";
import styles from "./styles";
import { colors } from "../../../utils/colors";

export interface Props {
  navigation: any;
  list: any;
  conteo: any;
  login: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={estilos.navbar}>
          <Left>
            <Button
              style={styles.boton}
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Image
                style={styles.image}
                source={require("../../../../images/logo-ico.png")}
              />
            </Button>
          </Left>
          <Body>
            {this.props.conteo !== 0 ? (
              <Item>
                <Spinner color="#000" size={20} style={{ padding: 10 }} />
                <Text style={{ fontSize: 12 }}>
                  Subiendo {this.props.conteo} imagenes, por favor no cierre el
                  app
                </Text>
              </Item>
            ) : (
              <Title style={{ color: colors.Negro }}>Prenda crédito</Title>
            )}
          </Body>
          <Right />
        </Header>
        <Content>
          {this.props.login?.user?.perfil?.rol?.id === 17 && (
            <Content>
              <View style={styles.elemento_menu}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("ReporteGestiones")
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/reporte_gestiones.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Reporte</Text>
                    <Text style={styles.texto_menu}>de Gestiones</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("GenerarConvenio", {without_solicitud: true})
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/generar_convenio.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Generar</Text>
                    <Text style={styles.texto_menu}>Convenio</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.elemento_menu}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("RutaCobranzaDificil")
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/ruta_cd.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Ruta</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow} />
                  </View>
                </TouchableHighlight>
              </View>
            </Content>
          )}

          {this.props.login?.user?.perfil?.rol?.id !== 17 && (
            <Content>
              <View style={styles.elemento_menu}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("BuscarClientes")
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/nuevo_cliente.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Nuevo</Text>
                    <Text style={styles.texto_menu}>Cliente</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("BuscarClientes")
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/nueva_solicitud.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Nueva</Text>
                    <Text style={styles.texto_menu}>Solicitud</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.elemento_menu}>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() => this.props.navigation.navigate("Carteras")}
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/hoja_cobro.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Hoja</Text>
                    <Text style={styles.texto_menu}>Cobro</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={"#fff"}
                  style={styles.boton_menu}
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("ListadoSolicitud")
                  }
                >
                  <View style={styles.c_boton_menu}>
                    <View style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/solicitudes.png")}
                      />
                    </View>
                    <Text style={styles.texto_menu}>Solicitudes</Text>
                    <Text style={styles.texto_menu}>Pendientes</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </Content>
          )}
        </Content>
      </Container>
    );
  }
}

export default Home;
