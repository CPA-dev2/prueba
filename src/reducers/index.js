import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from "redux-form";
import AsyncStorage from '@react-native-async-storage/async-storage';

import homeReducer from "../container/HomeContainer/reducer";
import login from "./modules/login";
import passReset from "./modules/passReset";
import clientes from "./modules/clientes";
import solicitud from "./modules/solicitud/solicitud";
import pre_autorizadas from "./modules/solicitud/pre_autorizadas";
import fcm from "./modules/fcm";
import imagenes from "./modules/imagenes";
import comun from "./modules/comun";
import cartera from "./modules/cartera";
import simulacion from "./modules/simulacion";
import cobranza_dificil from "./modules/cobranza-dificil"

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['fcm']
};

const rootReducer = combineReducers({
  form: formReducer,
  homeReducer,
  login,
  passReset,
  clientes,
  solicitud,
  pre_autorizadas,
  imagenes,
  comun,
  fcm,
  cartera,
  simulacion,
  cobranza_dificil,
});

export default persistReducer(rootPersistConfig, rootReducer);
