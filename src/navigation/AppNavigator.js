import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

// Import all the screens
import Login from '../container/LoginContainer';
import Inicio from '../container/LoginContainer/LoginContainer';
import Home from '../container/HomeContainer';
import BlankPage from '../container/BlankPageContainer';
import CustomSidebar from '../stories/drawer/CustomDrawerContainer';
import PassReset from '../container/PassResetContainer/PassResetContainer';
import Blocked from '../stories/screens/Inicio/Blocked/Blocked';
import CrearSolicitud from '../container/SolicitudContainer/SolicitudContainer';
import ListadoSolicitud from '../container/SolicitudContainer/ListadoSolicitudContainer';
import PreAutorizadas from '../container/SolicitudContainer/PreAutorizadasContainer';
import CrearGarantia from '../container/GarantiaContainer/GarantiaContainer';
import EditarGarantia from '../container/GarantiaContainer/EditarGarantiaContainer';
import VistaSolicitud from '../container/SolicitudContainer/Vista/VistaSolicitudContainer';
import VistaPreAutorizada from '../container/SolicitudContainer/PreAutorizadaVista/PreAutorizadaVistaContainer';
import BuscarClientes from '../container/ClientesContainer/BuscarClientesContainer';
import NuevoCliente from '../container/ClientesContainer/NuevoClienteContainer';
import PrevistaClientes from '../container/ClientesContainer/PrevistaClientesContainer';
import PerfilCliente from '../container/ClientesContainer/PerfilClienteContainer';
import Carteras from '../container/CarterasContainer/CarterasContainer';
import RegistrarPagos from '../container/PagosContainer/RegistrarPagosContainer';
import Simulacion from '../container/SimulacionContainer/SimulacionContainer';
import ListadoSimulacion from "../container/SimulacionContainer/ListadoSimulacionContainer";
import ImageZoom from "../container/ImageZoom/ImageZoomContainer";
import Ruta from '../container/CobranzaDificilContainer/RutaContainer';
import ListadoGestiones from '../container/CobranzaDificilContainer/ListadoGestionesContainer';
import NuevaGestion from '../container/CobranzaDificilContainer/NuevaGestionContainer';
import GenerarConvenio from "../container/CobranzaDificilContainer/GeneracionConvenio/GenerarConvenioContainer";
import ConfirmarConvenio from "../container/CobranzaDificilContainer/GeneracionConvenio/ConfirmarConvenioContainer";
import RegistrarPago from "../container/CobranzaDificilContainer/RegistrarPago/RegistrarPagoContainer";
import ReporteGestiones from "../container/CobranzaDificilContainer/ReporteGestiones/ReporteGestionesContainer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomSidebar {...props} />}>
    <Drawer.Screen name="Home" component={Home} />
    {/* Add all other screens from the old StackNavigator here */}
    <Drawer.Screen name="BuscarClientes" component={BuscarClientes} />
    <Drawer.Screen name="NuevoCliente" component={NuevoCliente} />
    <Drawer.Screen name="CrearSolicitud" component={CrearSolicitud} />
    <Drawer.Screen name="CrearGarantia" component={CrearGarantia} />
    <Drawer.Screen name="EditarGarantia" component={EditarGarantia} />
    <Drawer.Screen name="PrevistaClientes" component={PrevistaClientes} />
    <Drawer.Screen name="PerfilCliente" component={PerfilCliente} />
    <Drawer.Screen name="ListadoSolicitud" component={ListadoSolicitud} />
    <Drawer.Screen name="PreAutorizadas" component={PreAutorizadas} />
    <Drawer.Screen name="VistaSolicitud" component={VistaSolicitud} />
    <Drawer.Screen name="VistaPreAutorizada" component={VistaPreAutorizada} />
    <Drawer.Screen name="Carteras" component={Carteras} />
    <Drawer.Screen name="RegistrarPagos" component={RegistrarPagos} />
    <Drawer.Screen name="Simulacion" component={Simulacion} />
    <Drawer.Screen name="ImageZoom" component={ImageZoom} />
    <Drawer.Screen name="ListSimulacion" component={ListadoSimulacion} />
    <Drawer.Screen name="RutaCobranzaDificil" component={Ruta} />
    <Drawer.Screen name="GestionesPorCredito" component={ListadoGestiones} />
    <Drawer.Screen name="NuevaGestion" component={NuevaGestion} />
    <Drawer.Screen name="GenerarConvenio" component={GenerarConvenio} />
    <Drawer.Screen name="ConfirmarConvenio" component={ConfirmarConvenio} />
    <Drawer.Screen name="RegistrarPago" component={RegistrarPago} />
    <Drawer.Screen name="ReporteGestiones" component={ReporteGestiones} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const user = useSelector(state => state.login.user); // This is an assumption

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="BlankPage" component={BlankPage} />
            <Stack.Screen name="Blocked" component={Blocked} />
          </>
        ) : (
          <>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PassReset" component={PassReset} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
