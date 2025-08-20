import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  SearchIcon,
  Spinner,
  useToast,
  Toast,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import { Keyboard } from "react-native";
import styles from "./styles";
import { estilos } from "../../../utils/estilos";
import { validations } from "../../../utils/validation";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";

const BusquedaCliente = (props) => {
  const [dpi, setDpi] = useState('');
  const toast = useToast();

  const validarDpi = () => {
    if (dpi === "") {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="error">
              <VStack space="xs">
                <Text>Ingrese un DPI valido</Text>
              </VStack>
            </Toast>
          );
        },
      });
      return;
    }
    props.verificarDPI(dpi, props.navigation);
    console.log(dpi);
  };

  const { loader, navigation } = props;

  return (
    <Box flex={1} bg="$white">
      <Navbar titulo={"Nuevo cliente"} navigation={navigation} regresar={() => navigation.popToTop()}/>
      <Box p="$4">
        <Heading style={styles.buscar}>Buscar por medio de DPI</Heading>
        <Input style={styles.busqueda_container}>
          <InputField
            keyboardType="numeric"
            placeholder=""
            value={dpi}
            onChangeText={setDpi}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              props.verificarDPI(dpi, navigation);
            }}
          />
          <InputSlot pr="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
        </Input>
        <Text style={estilos.inputError}>{validations.dpi(dpi)}</Text>
      </Box>
      <Box p="$4">
        <Button
          style={styles.boton}
          onPress={() => {
            validarDpi();
            Keyboard.dismiss();
          }}
        >
          {loader ? <Spinner color="$white" /> : <ButtonText>Siguiente</ButtonText>}
        </Button>
      </Box>
    </Box>
  );
};

export default BusquedaCliente;
