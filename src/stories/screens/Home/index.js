import * as React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonIcon,
  Spinner,
  HStack,
  VStack,
  Image,
  Pressable,
} from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { estilos } from "../../../utils/estilos"; // This will probably need to be updated
import styles from "./styles"; // This will probably need to be updated
import { colors } from "../../../utils/colors"; // This will probably need to be updated

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
      <Box flex={1} bg="$white">
        <HStack
          style={estilos.navbar} // I'll keep this for now, but it might need to be converted to utility props
          alignItems="center"
          p="$2"
        >
          <Box>
            <Button
              variant="link"
              onPress={() => this.props.navigation.openDrawer()} // Updated for RNv6
            >
              <Image
                style={styles.image} // This will need to be updated
                source={require("../../../../images/logo-ico.png")}
                alt="logo"
              />
            </Button>
          </Box>
          <Box flex={1} alignItems="center">
            {this.props.conteo !== 0 ? (
              <HStack space="md" alignItems="center">
                <Spinner color="$black" />
                <Text size="sm">
                  Subiendo {this.props.conteo} imagenes, por favor no cierre el
                  app
                </Text>
              </HStack>
            ) : (
              <Heading color="$black">Prenda crédito</Heading>
            )}
          </Box>
          <Box />
        </HStack>
        <ScrollView>
          {this.props.login?.user?.perfil?.rol?.id === 17 && (
            <VStack>
              <HStack justifyContent="space-around" m="$4">
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("ReporteGestiones")
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/reporte_gestiones.png")}
                        alt="reporte"
                      />
                    </Box>
                    <Text>Reporte</Text>
                    <Text>de Gestiones</Text>
                  </VStack>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("GenerarConvenio", {
                      without_solicitud: true,
                    })
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/generar_convenio.png")}
                        alt="convenio"
                      />
                    </Box>
                    <Text>Generar</Text>
                    <Text>Convenio</Text>
                  </VStack>
                </Pressable>
              </HStack>
              <HStack justifyContent="space-around" m="$4">
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("RutaCobranzaDificil")
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/ruta_cd.png")}
                        alt="ruta"
                      />
                    </Box>
                    <Text>Ruta</Text>
                  </VStack>
                </Pressable>
                <Box />
              </HStack>
            </VStack>
          )}

          {this.props.login?.user?.perfil?.rol?.id !== 17 && (
            <VStack>
              <HStack justifyContent="space-around" m="$4">
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("BuscarClientes")
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/nuevo_cliente.png")}
                        alt="cliente"
                      />
                    </Box>
                    <Text>Nuevo</Text>
                    <Text>Cliente</Text>
                  </VStack>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("BuscarClientes")
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/nueva_solicitud.png")}
                        alt="solicitud"
                      />
                    </Box>
                    <Text>Nueva</Text>
                    <Text>Solicitud</Text>
                  </VStack>
                </Pressable>
              </HStack>
              <HStack justifyContent="space-around" m="$4">
                <Pressable
                  onPress={() => this.props.navigation.navigate("Carteras")}
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/hoja_cobro.png")}
                        alt="cobro"
                      />
                    </Box>
                    <Text>Hoja</Text>
                    <Text>Cobro</Text>
                  </VStack>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("ListadoSolicitud")
                  }
                >
                  <VStack alignItems="center">
                    <Box style={styles.image_shadow}>
                      <Image
                        style={styles.image_menu}
                        source={require("../../../../images/solicitudes.png")}
                        alt="solicitudes"
                      />
                    </Box>
                    <Text>Solicitudes</Text>
                    <Text>Pendientes</Text>
                  </VStack>
                </Pressable>
              </HStack>
            </VStack>
          )}
        </ScrollView>
      </Box>
    );
  }
}

export default Home;
