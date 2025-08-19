import { handleActions } from 'redux-actions';
import { api } from "../../utils/api";
import { editarValor } from "./solicitud/solicitud";

// ------------------------------------
// Constants
// ------------------------------------

const PLANES = "COMUN_PLANES";
const PRODUCTOS = "COMUN_PRODUCTOS";
const LATITUD = "COMUN_LATITUD";
const LONGITUD = "COMUN_LONGITUD";
const PIDIENDO_GPS = "COMUN_PIDIENDO_GPS";

export const constants = {
};

// ------------------------------------
// Actions
// ------------------------------------

export const getPlanes = () => (dispatch, getStore) => {
  const store = getStore();
  api.get("planes_pago/listado", {}, {dispatch, store}).catch(() => {}).then((data) => {
    const { planes, productos } = data;
    dispatch(setPlanes(planes));
    dispatch(setProductos(productos));
    if (planes.length > 0) {
      dispatch(editarValor('plan', planes[0].id));
    }
    if (productos.length > 0) {
      dispatch(editarValor('tipo_producto', productos[0].id));
    }
  });
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setPlanes = planes => ({
  type: PLANES,
  planes,
});

export const setProductos = productos => ({
  type: PRODUCTOS,
  productos,
});

export const setLatitud = latitud => ({
  type: LATITUD,
  latitud
});

export const setLongitud = longitud => ({
  type: LONGITUD,
  longitud
});

export const setPeticionesGPS = pidiendoGPS => ({
  type: PIDIENDO_GPS,
  pidiendoGPS
});

// ------------------------------------
// Export Actions
// ------------------------------------

export const actions = {
  getPlanes,
  setLatitud,
  setLongitud,
  setPeticionesGPS,
};

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [PLANES]: (state, { planes }) => {
    return {
      ...state,
      planes,
    };
  },
  [PRODUCTOS]: (state, { productos }) => {
    return {
      ...state,
      productos,
    };
  },
  [LATITUD]: (state, { latitud }) => {
    return {
      ...state,
      latitud,
    };
  },
  [LONGITUD]: (state, { longitud }) => {
    return {
      ...state,
      longitud,
    };
  },
  [PIDIENDO_GPS]: (state, { pidiendoGPS }) => {
    return {
      ...state,
      pidiendoGPS,
    };
  },
};

// ------------------------------------
// InitialState
// ------------------------------------

const initialState = {
  planes: [],
  productos: [],
  latitud: null,
  longitud: null,
  pidiendoGPS: false,
};

export default handleActions(reducers, initialState);
