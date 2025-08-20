import React, { useState, useEffect } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Select,
  SelectItem,
  Spinner,
  Text,
  Heading,
  VStack,
  HStack,
  Pressable,
} from "@gluestack-ui/themed";
import Navbar from "../../../../../container/NavbarContainer/NavbarContainer";
import styles from "./styles";
import { validations } from "../../../../../utils/validation";
import { OTRAS_CATEGORIAS, CONDICION_PRODUCTO_CHOICES } from '../../../../../utils/constants';
import { fotos } from "../../../../../utils/fotos";
import ModalImagen from './ModalImagen';

const CrearGarantia = (props) => {
  const { navigation, loaderGarantia: loader, solicitud, addGarantia } = props;
  const [garantia, setGarantia] = useState({
    articulo: '',
    serie: '',
    tipo_vehiculo: '',
    precio_avaluo: '',
    familia: OTRAS_CATEGORIAS[0]?.value,
    personas: '',
    marca: '',
    uso: '',
    placa: '',
    chasis: '',
    vin: '',
    centimetros_cubicos: '',
    cilindros: '',
    color: '',
    modelo: '',
    valor_mercado: '',
    motivo_ingreso: '',
    link_referencia: '',
    descripcion: '',
    estado: CONDICION_PRODUCTO_CHOICES[0]?.value,
    precio_sugerido_venta: 0,
    temp_foto: '',
    linea: '',
  });
  const [modalFoto, setModalFoto] = useState(false);
  const [modalHerammienta, setModalHerramienta] = useState(false);

  useEffect(() => {
    calcularPrecioSugeridoVenta();
  }, [garantia.estado, garantia.valor_mercado]);

  const handleChange = (name, value) => {
    setGarantia(prevState => ({ ...prevState, [name]: value }));
  };

  const calcularPrecioSugeridoVenta = () => {
    let factor = 0;
    if (garantia.estado === 10) factor = 0.5;
    else if (garantia.estado === 5) factor = 0.4;
    else if (garantia.estado === 0) factor = 0.25;
    const precio_sugerido_venta = (garantia.valor_mercado || 0) * factor;
    handleChange('precio_sugerido_venta', precio_sugerido_venta);
  };

  const fotoTemporal = (source) => {
    handleChange('temp_foto', source);
  };

  const verificarData = () => {
    if (solicitud.tipo_garantia === 1) {
      if (garantia.articulo && garantia.modelo && garantia.marca && garantia.serie && garantia.valor_mercado && garantia.precio_avaluo && garantia.familia && garantia.motivo_ingreso && garantia.link_referencia && garantia.descripcion && garantia.estado !== null) {
        addGarantia(garantia, navigation);
      } else {
        Alert.alert('Información faltante', 'Por favor llene la información obligatoria');
      }
    } else {
      if (garantia.tipo_vehiculo && garantia.personas && garantia.marca && garantia.modelo && garantia.linea && garantia.uso && garantia.placa && garantia.chasis && garantia.vin && garantia.centimetros_cubicos && garantia.cilindros && garantia.color && garantia.valor_mercado) {
        addGarantia(garantia, navigation);
      } else {
        Alert.alert('Información faltante', 'Por favor llene la información obligatoria');
      }
    }
  };

  const renderElectrodomesticoForm = () => (
    <VStack space="md" p="$4">
      <Heading>Formulario para garantía de Electrodomésticos o herramientas</Heading>
      <FormControl>
        <FormControlLabel><FormControlLabelText>Familia</FormControlLabelText></FormControlLabel>
        <Select selectedValue={garantia.familia} onValueChange={(value) => handleChange('familia', value)}>
          {OTRAS_CATEGORIAS.map(item => <SelectItem key={item.value} label={item.label} value={item.value} />)}
        </Select>
      </FormControl>
      {/* Add other form controls here, converting from native-base to gluestack-ui */}
      <Button onPress={verificarData}>
        <ButtonText>Agregar</ButtonText>
      </Button>
    </VStack>
  );

  const renderAutomovilForm = () => (
    <VStack space="md" p="$4">
      <Heading>Formulario para garantía de automóvil</Heading>
      {/* Add form controls for automovil */}
      <Button onPress={verificarData}>
        <ButtonText>Agregar</ButtonText>
      </Button>
    </VStack>
  );

  return (
    <Box flex={1}>
      <Navbar titulo={"Nueva Garantía"} navigation={navigation} />
      <ScrollView>
        {solicitud.tipo_garantia === 1 ? renderElectrodomesticoForm() : renderAutomovilForm()}
      </ScrollView>
    </Box>
  );
};

export default CrearGarantia;
