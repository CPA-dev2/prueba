import React, { useState, useEffect } from 'react';
import { RefreshControl, Image } from "react-native";
import {
  Box,
  Button,
  Text,
  Spinner,
  VStack,
  HStack,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import Navbar from "../../../../container/NavbarContainer/NavbarContainer";
import Buscador from "../../Navbar/Buscador";
import styles from "./styles";
import { fotos } from "../../../../utils/fotos";
import { EyeIcon } from 'lucide-react-native';

const ListadoPreAutorizadas = (props) => {
  const { solicitudes_filtro, loader, navigation, filtrarSolicitudes, getListado, setSolicitudSeleccionada } = props;
  const [search, setSearch] = useState(true);

  useEffect(() => {
    getListado();
  }, []);

  const toggleNavbar = () => {
    setSearch(!search);
  };

  const onRefresh = () => {
    getListado();
  };

  return (
    <Box flex={1}>
      {search ? (
        <Navbar regresar={() => navigation.popToTop()} titulo={"Solicitudes Pre-Autorizadas"} navigation={navigation} imagen={fotos.lupa} cerrar={toggleNavbar}/>
      ) : (
        <Buscador placeholder={"Buscar por No. de DPI"} salir={toggleNavbar} inputChange={filtrarSolicitudes}/>
      )}
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={<RefreshControl refreshing={loader} onRefresh={onRefresh} />}
      >
        {loader ? (
          <Box><Text style={styles.text_center}>Cargando información...</Text></Box>
        ) : (
          <VStack>
            <HStack borderBottomWidth="$1" borderColor="$trueGray300" p="$2">
              <Text flex={2} style={styles.text_center}>Nombre</Text>
              <Text flex={2} style={styles.text_center}>DPI</Text>
              <Text flex={1} style={styles.text_center}>Acciones</Text>
            </HStack>
            {solicitudes_filtro.filter(solicitud => !solicitud.analisis_credito).map((solicitud) => (
              <HStack key={solicitud.id} borderBottomWidth="$1" borderColor="$trueGray200" p="$2" alignItems="center">
                <VStack flex={2} style={styles.titulo_nombre}>
                  <Text style={styles.appellidos}>{solicitud.cliente.apellidos},</Text>
                  <Text style={styles.nombres}>{solicitud.cliente.nombres}</Text>
                </VStack>
                <Text flex={2} style={styles.text_gray}>{solicitud.cliente.dpi}</Text>
                <Pressable
                  flex={1}
                  justifyContent="center"
                  onPress={() => {
                    setSolicitudSeleccionada(solicitud);
                    navigation.navigate("VistaPreAutorizada");
                  }}
                >
                  <Icon as={EyeIcon} size="md" color="$primary500" />
                </Pressable>
              </HStack>
            ))}
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
};

export default ListadoPreAutorizadas;
