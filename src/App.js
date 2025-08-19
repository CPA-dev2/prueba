// @flow
import React from "react";
import { StackNavigator, DrawerNavigator, SwitchNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./container/LoginContainer";
import Inicio from "./container/LoginContainer/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import CustomSidebar from "./stories/drawer/CustomDrawerContainer";
import PassReset from './container/PassResetContainer/PassResetContainer';
import Blocked from './stories/screens/Inicio/Blocked/Blocked';

// SOLICITUDES DE CREDITO
import CrearSolicitud from './container/SolicitudContainer/SolicitudContainer';
import ListadoSolicitud from './container/SolicitudContainer/ListadoSolicitudContainer';
import PreAutorizadas from './container/SolicitudContainer/PreAutorizadasContainer';
import CrearGarantia from './container/GarantiaContainer/GarantiaContainer';
import EditarGarantia from './container/GarantiaContainer/EditarGarantiaContainer';
import VistaSolicitud from './container/SolicitudContainer/Vista/VistaSolicitudContainer';

import VistaPreAutorizada from './container/SolicitudContainer/PreAutorizadaVista/PreAutorizadaVistaContainer';
// CLIENTES
import BuscarClientes from './container/ClientesContainer/BuscarClientesContainer';
import NuevoCliente from './container/ClientesContainer/NuevoClienteContainer';
import PrevistaClientes from './container/ClientesContainer/PrevistaClientesContainer';
import PerfilCliente from './container/ClientesContainer/PerfilClienteContainer';
// CARTERAS
import Carteras from './container/CarterasContainer/CarterasContainer';

//PAGOS
import RegistrarPagos from './container/PagosContainer/RegistrarPagosContainer';

//SIMULACION
import Simulacion from './container/SimulacionContainer/SimulacionContainer';
import ListadoSimulacion from "./container/SimulacionContainer/ListadoSimulacionContainer";

// IMAGEZOOM
import ImageZoom from "./container/ImageZoom/ImageZoomContainer";

//COBRANZA DIFICIL
import Ruta from './container/CobranzaDificilContainer/RutaContainer';
import ListadoGestiones from './container/CobranzaDificilContainer/ListadoGestionesContainer';
import NuevaGestion from './container/CobranzaDificilContainer/NuevaGestionContainer';
import GenerarConvenio from "./container/CobranzaDificilContainer/GeneracionConvenio/GenerarConvenioContainer";
import ConfirmarConvenio from "./container/CobranzaDificilContainer/GeneracionConvenio/ConfirmarConvenioContainer";
import RegistrarPago from "./container/CobranzaDificilContainer/RegistrarPago/RegistrarPagoContainer";
import ReporteGestiones from "./container/CobranzaDificilContainer/ReporteGestiones/ReporteGestionesContainer";


const loggedStackNavigator = StackNavigator(
  {
    Home: { screen: Home },
    BuscarClientes: { screen: BuscarClientes },
    NuevoCliente: { screen: NuevoCliente },
    CrearSolicitud: { screen: CrearSolicitud },
    CrearGarantia: { screen: CrearGarantia },
    EditarGarantia: { screen: EditarGarantia },
    PrevistaClientes: { screen: PrevistaClientes },
    PerfilCliente: { screen: PerfilCliente },
    ListadoSolicitud: { screen: ListadoSolicitud },
    PreAutorizadas: { screen: PreAutorizadas },
    VistaSolicitud: { screen: VistaSolicitud },
    VistaPreAutorizada: { screen: VistaPreAutorizada },
    Carteras: { screen: Carteras },
    RegistrarPagos: { screen: RegistrarPagos },
    Simulacion: { screen: Simulacion},
    ImageZoom: { screen: ImageZoom },
    ListSimulacion: { screen: ListadoSimulacion },
    RutaCobranzaDificil: { screen: Ruta },
    GestionesPorCredito: { screen: ListadoGestiones },
    NuevaGestion: { screen: NuevaGestion },
    GenerarConvenio: { screen: GenerarConvenio },
    ConfirmarConvenio: { screen: ConfirmarConvenio},
    RegistrarPago: { screen: RegistrarPago},
    ReporteGestiones: { screen: ReporteGestiones},
  },
  {
    headerMode: "none",
    initialRouteName: "Home",
  }
);

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    loggedStackNavigator: { screen: loggedStackNavigator },
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <CustomSidebar {...props} />,
  }
);

export const App = SwitchNavigator(
  {
    Login: { screen: Login },
    Inicio: { screen: Inicio },
    BlankPage: { screen: BlankPage },
    Drawer: { screen: Drawer },
    PassReset: { screen:PassReset},
    Blocked: { screen:Blocked},
  },
  {
    initialRouteName: "Inicio",
    headerMode: "none",
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
