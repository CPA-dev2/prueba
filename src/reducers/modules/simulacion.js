import {handleActions} from "redux-actions";
import { api } from "../../utils/api";
import _ from "lodash";
import moment from 'moment';
import generadorPlanPagos from "../../utils/generador_plan_pagos";

const LOADER = 'SIMULACION_LOADER';
const DEMO_SIMULACION = 'SIMULACION_DEMO';
const DATOS_SIMULACION = 'SIMULACION_DATOS';
const FECHAS_SIMULACION = 'FECHAS_SIMULACION';

// ------------------------------------
// Actions
// ------------------------------------

export const editarValor = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const datos = _.cloneDeep(store.simulacion.datos);
  datos[key] = value;
  dispatch({ type: DATOS_SIMULACION, datos});
};

export const calcularTotal = (navigation) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const planes = store.comun.planes;
  const datos = store.simulacion.datos;
  const plan = _.find(planes, {id:datos.plan});
  const fechas = store.simulacion.fechas;
  const perfil = store.login.user?.perfil?.rol?.id;

  const monto = parseInt(datos.monto);
  const total = monto * (1 + plan.interes);
  const demo = generadorPlanPagos(total, plan, fechas);
  if (perfil === 17) {
    demo.shift();
  }

  dispatch({ type: DEMO_SIMULACION, demo });
  dispatch({ type: LOADER, loader: false });
  navigation.navigate("ListSimulacion");
};

export const editarTipoProducto = (key , value) => (dispatch, getStore) => {
  const store = getStore();
  console.log(store)
  const datos = _.cloneDeep(store.simulacion.datos);
  datos[key] = value;
  const plan = _.find(store.comun.planes, {tipo_producto: Number(value)});
  console.log(plan)
  datos.plan = plan.id;
  dispatch({ type: DATOS_SIMULACION, datos: datos });
};

export const getFechas = (navigation) => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const datos = store.simulacion.datos;
  const planes = store.comun.planes;
  let plan = undefined;
  try {
    plan = _.find(planes, {id: Number(datos.plan)})
  } catch (e) {
    plan = undefined
  }
  let hoy = moment();
  let inicio = 0;
  if (plan && plan.periodo === "MENSUAL"){
    inicio = hoy.format('DD/MM/YYYY');
  } else {
    const dia = hoy.format('DD');
    if (dia > 16){
      inicio = 1;
    } else {
      inicio = 16;
    }
  }
  api.get('solicitudes/simulacion',{plan:datos.plan, inicio}, {dispatch, store}).catch((error) => {
    dispatch({ type: LOADER, loader: false });
  }).then((data)=>{
    dispatch({type: FECHAS_SIMULACION, fechas:data});
    dispatch({ type: LOADER, loader: false });
    dispatch(calcularTotal(navigation));
  });
};

export const actions = {
  editarValor,
  editarTipoProducto,
  getFechas,
  calcularTotal,
};

export const reducers = {
  [DEMO_SIMULACION]: (state, {demo}) => {
    return {
      ...state,
      demo,
    };
  },
  [DATOS_SIMULACION]: (state, {datos}) => {
    return {
      ...state,
      datos,
    };
  },
  [FECHAS_SIMULACION]: (state, {fechas}) => {
    return {
      ...state,
      fechas,
    };
  },
};

export const initialState = {
  loader:false,
  demo:[],
  fechas:[],
  datos:{
    plan:"",
    tipo_producto:"",
    monto:0,
  },
};

export default handleActions(reducers, initialState);
