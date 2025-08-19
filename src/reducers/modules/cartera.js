import { handleActions } from 'redux-actions';
import { api} from "../../utils/api";
import {getAldeas} from "./clientes";
import {MUNICIPIOS} from "../../utils/departamentos_municipios";
import _ from "lodash";
import {Alert} from 'react-native';
import Fuse from "fuse.js";
import RNPrint from 'react-native-print';
import { ticket } from '../../utils/ticket';

// ------------------------------------
// Constants
// ------------------------------------

const LOADER = 'CARTERAS_LOADER';
const DATA = 'CARTERAS_DATA';
const BACK_DATA = 'CARTERAS_BACK_DATA';
const NO_MOVIL = 'CARTERAS_NO_MOVIL';
const PAGE = 'CARTERAS_PAGE';
const BUSCADOR = 'CARTERAS_BUSCADOR';
const TOTAL_CARTERAS = 'CARTERAS_TOTAL';
const CARTERA_SELECCIONADA = 'CARTERA_SELECCIONADA';
const DATOS_PAGO = 'DATOS_PAGO';
// ------------------------------------
// Actions
// ------------------------------------

export const listarCarteras = (no_movil) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const user = store.login.user;
  const params = {asesor__id: user.perfil.id};
  if (no_movil) {
    params.no_movil = true;
  }
  dispatch(setNoMovil(no_movil));
  api.get('carteras', params, {dispatch, store}).catch(() =>{
    dispatch({ type: LOADER, loader: false });
  }).then((data) => {
    if (data){
      dispatch(setTotalCarteras(data.count));
      dispatch({ type: BACK_DATA, back_data: data });
      dispatch({ type: DATA, data });
      dispatch({ type: LOADER, loader: false });
    }
  });
};

export const editarValor = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const datos_pago = _.cloneDeep(store.cartera.datos_pago);
  datos_pago[key] = value;
  dispatch({ type: DATOS_PAGO, datos_pago: datos_pago});
};

export const registrarPago = (id, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const body = store.cartera.datos_pago;
  const lat = store.comun.latitud;
  const long = store.comun.longitud;
  const cliente = store.cartera.cartera_seleccionada.cliente;
  const gestor = store.login.user;
  const _ticket={cliente:`${cliente.nombres} ${cliente.apellidos}`, datos_pago:body, gestor:`${gestor.first_name} ${gestor.last_name}`};
  if (!store.cartera.loader) {
    if (lat !== null && long !== null) {
      dispatch({type: LOADER, loader: true});
      body.cuota = body.cuota !== "" ? parseFloat(body.cuota) : "";
      body.mora = body.mora !== "" ? parseFloat(body.mora) : "";
      body.lat = lat;
      body.long = long;
      const no_movil = store.cartera.no_movil;
      const params = {};
      if (no_movil) {
        params.no_movil = true;
      }
      api.put(`carteras/${id}`, body, params, {dispatch, store}).catch((error) => {
        Alert.alert(
          'Error',
          'Ha ocurrido un error, verifica y vuelve a intentar',
          [
            {text: 'Aceptar'},
          ],
          {cancelable: false}
        );
        dispatch({type: LOADER, loader: false});
      }).then((data) => {
        if (data) {
          Alert.alert(
            'Éxito',
            'Pago registrado exitosamente',
            [
              {text: 'Imprimir ticket', onPress: () => { 
                _ticket['numero_ticket'] = data.movimiento.numero_ticket
                createTicket(_ticket)
                dispatch({type: LOADER, loader: false});
                dispatch({type: DATOS_PAGO, datos_pago: {cuota: "", mora: ""}});
                navigation.navigate("Carteras");
                }}, 
            ],
            {cancelable: false}
          );
        }
      });
    } else {
      Alert.alert(
        'Error',
        'La aplicación no ha podido comunicarse con el GPS',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
    }
  }
};

async function createTicket(data) {
  await RNPrint.print( { html:  ticket.get_html(data) })
}

export const filtrarCartera = (dpi) => (dispatch, getStore) => {
  const store = getStore();
  const cartera = _.cloneDeep(store.cartera.back_data);
  if (dpi && cartera.results) {
    const options = {keys: ['cliente.dpi', 'cliente.nombres', 'cliente.apellidos']};
    const fuse = new Fuse(cartera.results, options);
    cartera.results = fuse.search(dpi);
  }
  dispatch({ type: DATA, data: cartera });
};

// ------------------------------------
// PureActions
// ------------------------------------

export const changePage = page => ({
  type: PAGE,
  page,
});

export const setNoMovil = no_movil => ({
  type: NO_MOVIL,
  no_movil,
});

export const setTotalCarteras = total_carteras => ({
  type: TOTAL_CARTERAS,
  total_carteras,
});

export const setCarteraSeleccionada = cartera_seleccionada => ({
  type: CARTERA_SELECCIONADA,
  cartera_seleccionada,
});

export const actions = {
  changePage,
  listarCarteras,
  setCarteraSeleccionada,
  editarValor,
  registrarPago,
  createTicket,
  filtrarCartera
};

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [PAGE]: (state, {page}) => {
    return {
      ...state,
      page,
    };
  },
  [DATA]: (state, {data}) => {
    return {
      ...state,
      data,
    };
  },
  [BACK_DATA]: (state, {back_data}) => {
    return {
      ...state,
      back_data,
    };
  },
  [BUSCADOR]: (state, {buscador}) => {
    return {
      ...state,
      buscador,
    };
  },
  [LOADER]: (state, {loader}) => {
    return {
      ...state,
      loader,
    };
  },
  [TOTAL_CARTERAS]: (state, {total_carteras}) => {
    return {
      ...state,
      total_carteras,
    };
  },
  [CARTERA_SELECCIONADA]: (state, {cartera_seleccionada}) => {
    return {
      ...state,
      cartera_seleccionada,
    };
  },
  [DATOS_PAGO]: (state, {datos_pago}) => {
    return {
      ...state,
      datos_pago,
    };
  },
  [NO_MOVIL]: (state, {no_movil}) => {
    return {
      ...state,
      no_movil,
    };
  },
};

// ------------------------------------
// InitialState
// ------------------------------------

export const initialState = {
  loader:false,
  data: {},
  back_data: {},
  page: 1,
  total_carteras: 0,
  cartera_seleccionada:{},
  datos_pago: {
    cuota:"",
    mora:""
  },
  no_movil: false,
};

export default handleActions(reducers, initialState);

