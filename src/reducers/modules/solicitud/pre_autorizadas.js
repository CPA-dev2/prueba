import { handleActions } from 'redux-actions';
import Fuse from 'fuse.js';
import { api } from "../../../utils/api";
import _ from "lodash";
import {Alert} from 'react-native';
import { setCliente } from '../clientes';
// ------------------------------------
// Constants
// ------------------------------------

export const LOADER = "PRE_AUTORIZADAS LOADER";
export const SOLICITUDES = "PRE_AUTORIZADAS";
export const SOLICITUDES_F = "PREAUTORIZADAS_F";
export const SOLICITUDES_SELECCIONADA = "PREAUTORIZADAS_SELECCIONADA";

// ------------------------------------
// Actions
// ------------------------------------

export const getListado = () => (dispatch, getStore) => {
  dispatch(setLoader(true));
  api.get("pre_autorizadas/pendientes", {}, {dispatch, store: getStore()}).catch(() =>{}).then((data) => {
    if (data) {
      dispatch(setSolicitudes(data));
      dispatch(setSolicitudesFiltro(data));
    }
    dispatch(setLoader(false));
  });
};

export const filtrarSolicitudes = (dpi) => (dispatch, getStore) => {
  const store = getStore();
  const solicitudes = store.pre_autorizadas.solicitudes;
  if (dpi) {
    const options = {keys: ['cliente.dpi']};
    const fuse = new Fuse(solicitudes, options);
    const data = fuse.search(dpi);
    dispatch(setSolicitudesFiltro(data));
  } else {
    dispatch(setSolicitudesFiltro([...solicitudes]));
  }
};

export const cambiarMonto = (nuevo_monto, motivo) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader:true});
  const store = getStore();
  const solicitud = _.cloneDeep(store.pre_autorizadas.solicitud_seleccionada);
  const body = {id: solicitud.id, nuevo_monto, motivo_reduccion: motivo};
  api.post('pre_autorizadas/cambiar_monto', body, {}, {dispatch, store: getStore()}).catch((error) => {
    Alert.alert(
      'Error',
      'Ha ocurrido un error, verifica y vuelve a intentar',
      [
        {text: 'Aceptar'},
      ],
      {cancelable: false}
    );
    dispatch({ type: LOADER, loader: false });
  }).then((data) => {
    if (data){
      solicitud.monto = nuevo_monto;
      dispatch({ type: SOLICITUDES_SELECCIONADA, solicitud_seleccionada: solicitud});
      dispatch({ type: LOADER, loader: false });
      Alert.alert(
        'Éxito',
        'Monto reducido exitosamente',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
    }
  });
};

export const autorizarSolicitud = (id, monto, navigation) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader:true});
  api.post('pre_autorizadas/autorizar', {id, monto}, {}, {dispatch, store: getStore()}).catch((err) => {
    if (err){
      if (err.mensaje !== undefined){
        Alert.alert(
          'Error',
          err.mensaje.toString(),
          [
            {text: 'Aceptar'},
          ],
          {cancelable: false}
        );
      } else {
        Alert.alert(
          'Error',
          err.mensaje,
          [
            {text: 'Aceptar'},
          ],
          {cancelable: false}
        );
      }
      dispatch({ type: LOADER, loader: false });
    }
  }).then((data) => {
    if (data){
      dispatch({ type: LOADER, loader: false });
      Alert.alert(
        'Éxito',
        'Solicitud autorizada exitosamente',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
      navigation.popToTop();
    }
  });
};
export const rechazarSolicitud = (id, navigation) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader:true});
  api.post('pre_autorizadas/rechazar', {id}, {}, {dispatch, store: getStore()}).catch((error) => {
    Alert.alert(
      'Error',
      'Ha ocurrido un error, verifica y vuelve a intentar',
      [
        {text: 'Aceptar'},
      ],
      {cancelable: false}
    );
    dispatch({ type: LOADER, loader: false });
  }).then((data) => {
    if (data){
      dispatch({ type: LOADER, loader: false });
      Alert.alert(
        'Éxito',
        'Solicitud rechazada exitosamente',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
      navigation.popToTop();
    }
  });
};
// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
  type: LOADER,
  loader,
});

export const setSolicitudes = solicitudes => ({
  type: SOLICITUDES,
  solicitudes,
});
export const setSolicitudesFiltro = solicitudes_filtro => ({
  type: SOLICITUDES_F,
  solicitudes_filtro,
});

export const setSolicitudSeleccionada = solicitud_seleccionada => ({
  type: SOLICITUDES_SELECCIONADA,
  solicitud_seleccionada,
});

export const actions = {
  getListado,
  filtrarSolicitudes,
  setLoader,
  setSolicitudSeleccionada,
  cambiarMonto,
  autorizarSolicitud,
  rechazarSolicitud,
  setCliente,
};

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader,
    };
  },
  [SOLICITUDES]: (state, { solicitudes }) => {
    return {
      ...state,
      solicitudes,
    };
  },
  [SOLICITUDES_F]: (state, { solicitudes_filtro }) => {
    return {
      ...state,
      solicitudes_filtro,
    };
  },
  [SOLICITUDES_SELECCIONADA]: (state, { solicitud_seleccionada }) => {
    return {
      ...state,
      solicitud_seleccionada,
    };
  },
};

// ------------------------------------
// InitialState
// ------------------------------------

const initialState = {
  loader: false,
  solicitudes: [],
  solicitudes_filtro: [],
  solicitud_seleccionada: {},
};

export default handleActions(reducers, initialState);
