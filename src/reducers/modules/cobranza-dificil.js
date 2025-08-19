import _ from "lodash";
import { Alert } from "react-native";
import { handleActions } from "redux-actions";
import { getCobroDia } from "./login";
import { api } from "../../utils/api";
import moment from "moment";
import RNPrint from "react-native-print";
import { ticket } from "../../utils/ticket";
import { utils } from "../../stories/screens/CobranzaDificil/utils";
import { NavigationActions } from "react-navigation";
import generadorPlanPagos from "../../utils/generador_plan_pagos";

// ------------------------------------
// Constants
// ------------------------------------
const DATA = "DATA";
const SOLICITUD_SELECCIONADA = "SOLICITUD_SELECCIONADA";
const LOADER = "LOADER";
const PLANES = "PLANES";
const SEARCH = "SEARCH";
const NUEVO_CONVENIO = "NUEVO_CONVENIO";
const NUEVO_PLAN = "NUEVO_PLAN";
const FECHAS_SIMULACION = "FECHAS_SIMULACION";
const DEMO_SIMULACION = "DEMO_SIMULACION";
const DATOS_PAGO = "DATOS_PAGO";
const GESTIONES = "GESTIONES";
const FILTROS_GESTIONES = "FILTROS_GESTIONES";

// ------------------------------------
// Actions
// ------------------------------------
export const loadData = (without_plan = undefined) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const user = store.login.user;
  const params = { asesor__id: user.perfil.id };
  params.no_movil = true;
  params.search = store.cobranza_dificil.search;
  if (without_plan) {
    params.status_cb = 60;
  }
  api
    .get("cobranza_dificil/get_cartera", params, { dispatch, store })
    .catch((error) => {
      dispatch({ type: LOADER, loader: false });
    })
    .then((data) => {
      if (data) {
        //data.sort((a, b) => (a.plan_cobranza_dificil !== b.plan_cobranza_dificil) ? 1 : -1)
        dispatch({ type: DATA, data });
      }
      dispatch({ type: LOADER, loader: false });
    }).finally(()=>{
      dispatch({ type: LOADER, loader: false });
    });
};

export const guardarGestion = (nueva_gestion, navigation) => (
  dispatch,
  getStore
) => {
  dispatch(setLoader(true));
  const store = getStore();
  const user = store.login.user;
  const cliente = store.cobranza_dificil.solicitud.cliente;
  const _ticket = {
    cliente: `${cliente.nombres} ${cliente.apellidos}`,
    asesor: `${user.first_name} ${user.last_name}`,
    fecha: new Date(),
    detalle: nueva_gestion.detalle,
    tipo_gestion: _.toInteger(nueva_gestion.tipo_gestion),
  };
  console.log(_ticket);
  api
    .post("cobranza_dificil_gestion", nueva_gestion, {}, { dispatch, store })
    .catch((err) => {
      dispatch(setLoader(false));
      if (err) {
        Alert.alert("Error", `ERROR ${err.error}`, [{ text: "Aceptar" }], {
          cancelable: false,
        });
      } else {
        Alert.alert("Error", `Ocurrió un error`, [{ text: "Aceptar" }], {
          cancelable: false,
        });
      }
    })
    .then((data) => {
      if (data) {
        dispatch(setLoader(false));
        Alert.alert(
          "Éxito",
          "Gestión creada correctamente...",
          [
            { text: "Aceptar" },
            {
              text: "Imprimir Ticket",
              onPress: () => {
                createTicketGestion(_ticket);
              },
            },
          ],
          { cancelable: false }
        );
        navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "RutaCobranzaDificil",
              }),
            ],
          })
        );      }
    });
};

async function createTicketGestion(data) {
  await RNPrint.print({ html: utils.get_html_gestion(data) });
}

export const generarConvenio = (navigation) => (dispatch, getStore) => {
  dispatch(setLoader(true));
  const store = getStore();
  const datos_convenio = store.cobranza_dificil.nuevo_convenio;
  api
    .post("cobranza_dificil_gestion/generar_convenio", {}, datos_convenio, {
      dispatch,
      store,
    })
    .catch((err) => {
      dispatch(setLoader(false));
      if (err && err.error) {
        Alert.alert("Error", `ERROR ${err.error}`, [{ text: "Aceptar" }], {
          cancelable: false,
        });
      } else {
        Alert.alert("Error", `Ocurrió un error`, [{ text: "Aceptar" }], {
          cancelable: false,
        });
      }
    })
    .then((data) => {
      dispatch(resetSolicitud());
      if (data) {
        dispatch(setLoader(false));
        Alert.alert(
          "Éxito",
          "Se generó correctamente el convenio.",
          [{ text: "Aceptar" }],
          { cancelable: false }
        );
        navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "RutaCobranzaDificil",
              }),
            ],
          })
        );
      }
    }).finally(() => {
      dispatch(setLoader(false));
    });
};

export const getPlanes = () => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const params = { cobranza_dificil: true };

  api
    .get("planes_pago", params, { dispatch, store })
    .catch((error) => {
      dispatch({ type: LOADER, loader: false });
    })
    .then((data) => {
      if (data) {
        dispatch({ type: PLANES, planes: data.results });
      }
      dispatch({ type: LOADER, loader: false });
    });
};

export const loadGestiones = () => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const user = store.login.user;
  const filtros_gestiones = store.cobranza_dificil.filtros_gestiones;
  const params = {
    asesor_cobranza_dificil__id: user.perfil.id,
    from: filtros_gestiones.from,
    to: filtros_gestiones.to,
  };
  if (filtros_gestiones.from !== "" && filtros_gestiones.to !== "") {
    api
      .get("cobranza_dificil_gestion", params, { dispatch, store })
      .catch((error) => {
        dispatch({ type: LOADER, loader: false });
      })
      .then((data) => {
        if (data) {
          dispatch({ type: GESTIONES, gestiones: data.results });
        }
        dispatch({ type: LOADER, loader: false });
      });
  }
};

export const editarNuevoConvenio = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const nuevo_convenio = _.cloneDeep(store.cobranza_dificil.nuevo_convenio);
  nuevo_convenio[key] = value;
  dispatch({ type: NUEVO_CONVENIO, nuevo_convenio: nuevo_convenio });
};

export const editarDatosPago = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const datos_pago = _.cloneDeep(store.cobranza_dificil.datos_pago);
  datos_pago[key] = value;
  dispatch({ type: DATOS_PAGO, datos_pago: datos_pago });
};

export const simularPagos = () => (dispatch, getStore) => {
  const store = getStore();
  const mora = store.cobranza_dificil.solicitud.monto_mora_pendiente;
  const saldo_pendiente = store.cobranza_dificil.solicitud.saldo_pendiente;
  const plan = store.cobranza_dificil.nuevo_plan;
  let inicio = store.cobranza_dificil.nuevo_convenio.fecha_inicio;
  const eliminar_moras = store.cobranza_dificil.nuevo_convenio.eliminar_moras;
  let monto = saldo_pendiente + mora;
  if (eliminar_moras === true){
    monto = monto - mora;
  }

  let hoy = moment();
  if (plan && plan.periodo === "Quincenal") {
    const dia = hoy.format("DD");
    if (dia > 16) {
      inicio = 1;
    } else {
      inicio = 16;
    }
  }

  dispatch({ type: LOADER, loader: true });
  api
    .get(
      "solicitudes/simulacion",
      { plan: plan.id, inicio },
      { dispatch, store }
    )
    .catch((error) => {
      Alert.alert(
        "ERROR",
        "Ocurrió un error al intentar generar la proyección."
      );
      dispatch({ type: LOADER, loader: false });
    })
    .then((data) => {
      dispatch({ type: FECHAS_SIMULACION, fechas_simulacion: data });
      dispatch({ type: LOADER, loader: false });
      dispatch(calcularTotal(monto, plan));
    });
};

export const calcularTotal = (monto, plan) => (dispatch, getStore) => {
  const store = getStore();
  const fechas = store.cobranza_dificil.fechas_simulacion;
  const total = monto * (1 + plan.interes);

  const demo = generadorPlanPagos(total, plan, fechas);
  demo.shift();
  dispatch({ type: DEMO_SIMULACION, demo_simulacion: demo });
};

export const registrarPago = (id, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const body = store.cobranza_dificil.datos_pago;
  const lat = store.comun.latitud;
  const long = store.comun.longitud;
  const user = store.login.user;
  const cliente = store.cobranza_dificil.solicitud.cliente;
  const _ticket = {
    cliente: `${cliente.nombres} ${cliente.apellidos}`,
    datos_pago: body,
    gestor: `${user.first_name} ${user.last_name}`,
  };
  if (lat !== null && long !== null) {
    dispatch({ type: LOADER, loader: true });
    body.cuota = body.cuota !== "" ? parseFloat(body.cuota) : "";
    body.mora = body.mora !== "" ? parseFloat(body.mora) : "";
    body.lat = lat;
    body.long = long;

    const params = {};
    params.no_movil = true;

    api
      .put(`carteras/${id}`, body, params, { dispatch, store })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Ha ocurrido un error, verifica y vuelve a intentar",
          [{ text: "Aceptar" }],
          { cancelable: false }
        );
        dispatch({ type: LOADER, loader: false });
      })
      .then((data) => {
        if (data) {
          Alert.alert(
            "Éxito",
            "Pago registrado exitosamente",
            [
              {
                text: "Imprimir Ticket",
                onPress: () => {
                  _ticket["numero_ticket"] = data.movimiento.numero_ticket;
                  createTicket(_ticket);
                },
              },
            ],
            { cancelable: false }
          );
          dispatch({ type: LOADER, loader: false });
          dispatch({ type: DATOS_PAGO, datos_pago: { cuota: "", mora: "" } });
          dispatch(getCobroDia(user));
          navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "RutaCobranzaDificil",
                }),
              ],
            })
          );
        }
      });
  } else {
    Alert.alert(
      "Error",
      "La aplicación no ha podido comunicarse con el GPS",
      [{ text: "Aceptar" }],
      { cancelable: false }
    );
  }
};

async function createTicket(data) {
  await RNPrint.print({ html: ticket.get_html(data) });
}

export const setFiltroGestion = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const filtros_gestiones = _.cloneDeep(
    store.cobranza_dificil.filtros_gestiones
  );
  filtros_gestiones[key] = value;
  dispatch({ type: FILTROS_GESTIONES, filtros_gestiones: filtros_gestiones });
  dispatch(loadGestiones());
};

export const resetSolicitud = () => (dispatch, getStore) =>{
  dispatch({ type: NUEVO_CONVENIO, nuevo_convenio: {
    id_solicitud: "",
    id_plan: null,
    fecha_inicio: null,
    eliminar_moras: false,
  }});
  dispatch({ type: SOLICITUD_SELECCIONADA, solicitud: {
    cliente: {},
  }});
};

export const resetConvenio = () => (dispatch, getStore) => {
  const nuevo_convenio = {
    id_solicitud: "",
    id_plan: null,
    fecha_inicio: null,
    eliminar_moras: false,
  };
  const solicitud = { id: "", cliente: {} };
  dispatch({ type: NUEVO_CONVENIO, nuevo_convenio: nuevo_convenio });
  dispatch({ type: SOLICITUD_SELECCIONADA, solicitud: solicitud });
  dispatch({ type: NUEVO_PLAN, nuevo_plan: { periodo: "" } });
  dispatch({ type: DATA, data: [] });
  dispatch({ type: PLANES, planes: [] });
};

// ------------------------------------
// PureActions
// ------------------------------------
export const setSearch = (search) => (dispatch, getStore) => {
  dispatch({ type: SEARCH, search });
};

export const setLoader = (loader) => ({
  type: LOADER,
  loader,
});

export const setSolicitud = (solicitud) => ({
  type: SOLICITUD_SELECCIONADA,
  solicitud,
});

export const setNuevoConvenio = (nuevo_convenio) => ({
  type: NUEVO_CONVENIO,
  nuevo_convenio,
});

export const setNuevoPlan = (nuevo_plan) => ({
  type: NUEVO_PLAN,
  nuevo_plan,
});

export const actions = {
  setLoader,
  loadData,
  setSolicitud,
  guardarGestion,
  getPlanes,
  generarConvenio,
  setSearch,
  editarNuevoConvenio,
  setNuevoPlan,
  setNuevoConvenio,
  simularPagos,
  editarDatosPago,
  registrarPago,
  loadGestiones,
  setFiltroGestion,
  resetConvenio,
  resetSolicitud,
};

// ------------------------------------
// Reducers
// ------------------------------------
export const reducers = {
  [DATA]: (state, { data }) => {
    return {
      ...state,
      data,
    };
  },
  [LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader,
    };
  },
  [SOLICITUD_SELECCIONADA]: (state, { solicitud }) => {
    return {
      ...state,
      solicitud,
    };
  },
  [PLANES]: (state, { planes }) => {
    return {
      ...state,
      planes,
    };
  },
  [SEARCH]: (state, { search }) => {
    return {
      ...state,
      search,
    };
  },
  [NUEVO_CONVENIO]: (state, { nuevo_convenio }) => {
    return {
      ...state,
      nuevo_convenio,
    };
  },
  [NUEVO_PLAN]: (state, { nuevo_plan }) => {
    return {
      ...state,
      nuevo_plan,
    };
  },
  [FECHAS_SIMULACION]: (state, { fechas_simulacion }) => {
    return {
      ...state,
      fechas_simulacion,
    };
  },
  [DEMO_SIMULACION]: (state, { demo_simulacion }) => {
    return {
      ...state,
      demo_simulacion,
    };
  },
  [DATOS_PAGO]: (state, { datos_pago }) => {
    return {
      ...state,
      datos_pago,
    };
  },
  [GESTIONES]: (state, { gestiones }) => {
    return {
      ...state,
      gestiones,
    };
  },
  [FILTROS_GESTIONES]: (state, { filtros_gestiones }) => {
    return {
      ...state,
      filtros_gestiones,
    };
  },
};

// ------------------------------------
// InitialState
// ------------------------------------
export const initialState = {
  data: [],
  loader: false,
  solicitud: {
    cliente: {},
  },
  planes: [],
  search: "",
  nuevo_convenio: {
    id_solicitud: "",
    id_plan: null,
    fecha_inicio: null,
    eliminar_moras: false,
  },
  nuevo_plan: {},
  fechas_simulacion: [],
  demo_simulacion: [],
  datos_pago: {
    cuota: "",
    mora: "",
  },
  gestiones: [],
  filtros_gestiones: {
    from: "",
    to: "",
  },
};

export default handleActions(reducers, initialState);
