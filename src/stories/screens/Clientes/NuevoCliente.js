import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  Spinner,
  Text,
  Textarea,
  TextareaInput,
  useToast,
  Toast,
  VStack,
  Heading,
  Image,
  Pressable,
  Icon,
  CircleIcon,
} from "@gluestack-ui/themed";
import { Keyboard, Modal, Alert, ScrollView } from "react-native";
import DatePicker from 'react-native-date-picker';
import { api } from "../../../utils/api";
import { estilos } from "../../../utils/estilos";
import styles from "./styles";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import { DEPARTAMENTOS } from "../../../utils/departamentos_municipios";
import SelectModal from "../../select/Select";
import Referencias from "./Referencias";
import { validations } from "../../../utils/validation";
import { fotos as galeria } from "../../../utils/fotos";
import ModalImagen from './ModalImagen.js'

const hoy = new Date();
hoy.setFullYear(hoy.getFullYear() - 18);

const NuevoCliente = (props) => {
  const { loader, navigation, editarValor, nuevo_cliente, municipios, fotos, token, crearUris, setLoader, agregarReferencia, editarReferencia, eliminarReferencia } = props;

  const [paso, setPaso] = useState(1);
  const [cliente, setCliente] = useState({});
  const [date, setDate] = useState(`${hoy.getFullYear()}/${hoy.getMonth() + 1}/${hoy.getDate()}`);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRef, setModalRef] = useState(false);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalDPI, setModalDPI] = useState(false);
  const [modalRecibo, setModalRecibo] = useState(false);
  const [modalIngreso, setModalIngreso] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [referencia, setReferencia] = useState(null);

  const toast = useToast();

  useEffect(() => {
    setCliente({});
  }, []);

  const setRadioValue = (key, value) => {
    return () => {
      editarValor(key, value);
    };
  };

  const crearCliente = () => {
    if (!loader) {
      let path;
      let metodo;
      if (nuevo_cliente.id !== undefined) {
        path = `clientes/${nuevo_cliente.id}`;
        metodo = "PUT";
      } else {
        path = "clientes";
        metodo = "POST";
      }
      if (
        nuevo_cliente.nombres &&
        nuevo_cliente.apellidos &&
        nuevo_cliente.nacimiento &&
        nuevo_cliente.estado_civil &&
        nuevo_cliente.aldea.departamento &&
        nuevo_cliente.aldea.municipio &&
        nuevo_cliente.aldea.nombre &&
        nuevo_cliente.telefono &&
        nuevo_cliente.profesion &&
        nuevo_cliente.direccion
      ) {
        setLoader(true);
        const apiCall = metodo === "POST" ? api.post : api.put;
        apiCall(path, { data: JSON.stringify(nuevo_cliente) }, {}, token)
          .catch((err) => {
            Alert.alert('Error', 'Ha ocurrido un error, verifica y vuelve a intentar');
            setLoader(false);
          })
          .then((resp) => {
            if (resp) {
              crearUris(resp.id);
              Alert.alert('Exito', 'Datos almacenados exitosamente');
              navigation.popToTop();
            }
            setLoader(false);
          });
      } else {
        Alert.alert('Información faltante', 'Por favor llene la información obligatoria');
        setLoader(false);
      }
    }
  };

  return (
    <Box flex={1} bg="$white">
      <Navbar titulo={nuevo_cliente.id ? "Datos Cliente" : "Nuevo Cliente"} navigation={navigation} />
      <ScrollView>
        <Box p="$4">
          <Heading style={styles.titulo}>Formulario para nuevo expediente</Heading>
        </Box>
        <Text style={styles.subtitulo}>Datos del cliente</Text>
        <Box style={styles.formulario}>
          <FormControl mb="$4">
            <FormControl.Label><FormControl.Label.Text>Nombres*</FormControl.Label.Text></FormControl.Label>
            <Input>
              <InputField value={nuevo_cliente.nombres} onChangeText={text => editarValor("nombres", text)} />
            </Input>
            <Text style={estilos.inputError}>{validations.required(nuevo_cliente.nombres)}</Text>
          </FormControl>

          {/* ... other form controls ... */}

          <FormControl mb="$4">
            <FormControl.Label><FormControl.Label.Text>Género</FormControl.Label.Text></FormControl.Label>
            <RadioGroup value={nuevo_cliente.genero} onChange={setRadioValue("genero")}>
              <HStack space="md">
                <Radio value={10}>
                  <RadioIndicator><RadioIcon as={CircleIcon} /></RadioIndicator>
                  <RadioLabel>Masculino</RadioLabel>
                </Radio>
                <Radio value={20}>
                  <RadioIndicator><RadioIcon as={CircleIcon} /></RadioIndicator>
                  <RadioLabel>Femenino</RadioLabel>
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl mb="$4">
            <FormControl.Label><FormControl.Label.Text>Estado Civil</FormControl.Label.Text></FormControl.Label>
            <Select selectedValue={nuevo_cliente.estado_civil?.toString()} onValueChange={value => editarValor("estado_civil", value)}>
              <SelectItem label="Soltero" value="10" />
              <SelectItem label="Casado" value="20" />
              <SelectItem label="Divorciado" value="30" />
              <SelectItem label="Viudo" value="40" />
            </Select>
          </FormControl>

          <FormControl mb="$4">
            <FormControl.Label><FormControl.Label.Text>Fecha de nacimiento*</FormControl.Label.Text></FormControl.Label>
            <Pressable onPress={() => setDatePickerVisible(true)}>
              <Text>{nuevo_cliente.nacimiento || "Seleccione la Fecha"}</Text>
            </Pressable>
            <DatePicker
              modal
              open={isDatePickerVisible}
              date={nuevo_cliente.nacimiento ? new Date(nuevo_cliente.nacimiento) : new Date()}
              mode="date"
              onConfirm={(date) => {
                setDatePickerVisible(false);
                editarValor("nacimiento", date.toISOString().split('T')[0]);
              }}
              onCancel={() => setDatePickerVisible(false)}
            />
          </FormControl>

          <FormControl mb="$4">
            <FormControl.Label><FormControl.Label.Text>Observaciones</FormControl.Label.Text></FormControl.Label>
            <Textarea>
              <TextareaInput value={nuevo_cliente.observaciones} onChangeText={text => editarValor("observaciones", text)} />
            </Textarea>
          </FormControl>

          {/* ... and so on for all form fields ... */}

        </Box>
        <Box p="$4">
          <Button onPress={crearCliente}>
            {loader ? <Spinner color="$white" /> : <ButtonText>Finalizar</ButtonText>}
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NuevoCliente;
