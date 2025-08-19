import { handleActions } from 'redux-actions';

import _ from 'lodash';
import { api} from "../../utils/api";
import {MUNICIPIOS} from "../../utils/departamentos_municipios";
import { validations } from "../../utils/validation";
import { actions as imagenesActions } from "./imagenes";
import { URL_BASE } from "../../utils/variables";
import {Alert} from "react-native";

const RNFS = require('react-native-fs');


const LOADER = 'CLIENTE_LOADER';
const NUEVO_CLIENTE = 'NUEVO_CLIENTE';
const ULTIMA_PETICION = 'ULTIMA_PETICION';
const ALDEA = 'CLIENTE_ALDEA';
const ALDEAS = 'CLIENTE_ALDEAS';
const FOTOS = 'CLIENTE_FOTOS';

export const constants = {

};

function format_dpi(dpi){
  if (dpi.length === 13){
    return `${dpi.substring(0,4)} ${dpi.substring(4,9)} ${dpi.substring(9)}`;
  }
  return dpi;
}

// ------------------------------------
// Actions
// ------------------------------------
export const resetCliente = (dpi = '') => (dispatch) => {
  const hoy = new Date();
  hoy.setDate(1);
  hoy.setMonth(0);
  hoy.setFullYear(hoy.getFullYear() - 18);
  const nuevo_cliente = {
    dpi: dpi,
    nit: '',
    dpi_extendido: '',
    nombres: '',
    apellidos: '',
    estado_civil: 10,
    profesion: '',
    genero: 10,
    nacimiento: `${hoy.getFullYear()}/${hoy.getMonth() + 1}/${hoy.getDate()}`,
    telefono: '',
    es_whatsapp:false,
    direccion: '',
    tipo_vivienda: 10,
    nis: '',
    tipo_cliente: 10,
    observaciones:'',
    aldea: {
      departamento:'01',
      municipio:'011',
      nombre:'',
      id:0,
    },
    socioeconomico: {
      nombre_negocio:'',
      direccion_negocio: '',
      telefono_negocio: '',
      tiempo_laborar: '',
      razon_empresa: '',
      tipo_empresa: 10,
      actividad_empresa: '',
      direccion_empresa: '',
      telefono_empresa: '',
      nombre_constancias: '',
      telefono_constancias: '',
      tiempo_funcionamiento_empresa: '',
      puesto_trabajo: '',
      tiempo_trabajar: '',
      departamento_laboral: '',
      salario_nominal: '',
      otros_ingresos: '',
      descuentos: '',
      salario_liquido: '',
      paga_igss: '',
      nombre_jefe: '',
      telefono_jefe: '',
      cuenta_nomina:'',
      ocupacion: '',
      ingreso_promedio: '',
      periocidad_ingresos: '',
    },
    referencias:[
    ],
  };
  dispatch({ type: FOTOS, fotos: {} });
  dispatch({ type: NUEVO_CLIENTE, nuevo_cliente });
  dispatch({ type: ALDEA, aldea:null});
  dispatch(getAldeas('011'));
};

export const crearUris = (ref_id) => (dispatch, getStore) => {
  const store = getStore();
  const fotos = store.clientes.fotos;
  let cont = 0;
  Object.keys(fotos).forEach((campo) => {
    const foto = fotos[campo];
    if (foto) {
      if (foto.nombre) {
        const path = RNFS.PicturesDirectoryPath + "/" + foto.nombre;
        const uri = {
          ref_id,
          uri: path,
          nombre: foto.nombre,
          campo,
          modelo: 1, // VALOR PARA MODELO CLIENTE
        };
        // write the file
        // RNFS.writeFile(path, foto.data, 'base64')
        //   .then((success) => {
        //     console.log('FILE WRITTEN!');
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });

        api.post("uris", uri, {}, {dispatch, store}).catch(() => {
        }).then(() => {
          cont = cont + 1;
          if (cont === Object.keys(fotos).length) {
            dispatch(imagenesActions.getUris());
          }
        });
      } else {
        cont = cont + 1;
      }
    } else {
      cont = cont + 1;
    }
  });
};

export const getAldeas = (municipio) => (dispatch, getStore) => {
  const store = getStore();
  api.get('aldeas', {municipio}, {dispatch, store}).catch((err) => {}).then((data) => {
    if (data){
      dispatch(setAldeas(data.results));
    }
  });
};

export const eliminarReferencia = (key) => (dispatch, getStore) => {
  const store = getStore();
  const nuevo_cliente = _.cloneDeep(store.clientes.nuevo_cliente);
  const referencias = nuevo_cliente.referencias;
  referencias.splice(key, 1);
  referencias.forEach((referencia, index)=>{
    referencias[index]['key'] = index;
  });
  nuevo_cliente.referencias = referencias;
  dispatch({ type: NUEVO_CLIENTE, nuevo_cliente });
};

export const agregarReferencia = (referencia) => (dispatch, getStore) => {
  const store = getStore();
  const nuevo_cliente = _.cloneDeep(store.clientes.nuevo_cliente);
  referencia.key = nuevo_cliente.referencias.length;
  nuevo_cliente.referencias.push(referencia);
  dispatch({type: NUEVO_CLIENTE, nuevo_cliente });
};

export const editarReferencia = (referencia) => (dispatch, getStore) => {
  const store = getStore();
  const nuevo_cliente = _.cloneDeep(store.clientes.nuevo_cliente);
  const referencias = nuevo_cliente.referencias;
  referencias.splice(referencia.key, 1, referencia);
  nuevo_cliente.referencias = referencias;
  dispatch({type: NUEVO_CLIENTE, nuevo_cliente });
};

export const editarFotos = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const fotos = _.cloneDeep(store.clientes.fotos);
  fotos[key] = value;
  dispatch(setFotos(fotos));
};

export const editarValor = (key, value) => (dispatch, getStore) => {
  const store = getStore();
  const cliente = _.cloneDeep(store.clientes.nuevo_cliente);
  if ( cliente[key] !== undefined){
    if (key === "tipo_cliente" && value === 30){
      cliente.tipo_cliente  = 30;
      cliente.socioeconomico.ocupacion = 1;
      cliente.socioeconomico.periocidad_ingresos = "DIARIO";
    }
    if (key === "tipo_cliente" && value === 20){
      cliente.tipo_cliente  = 20;
      cliente.socioeconomico.tipo_empresa= 10;
    }
    cliente[key] = value;
  }
  if (cliente.aldea[key] !== undefined){
    if (key === 'departamento') {
      const municipios = _.filter(MUNICIPIOS, {departamento: value });
      cliente.aldea.municipio = municipios[0].id;
      dispatch(getAldeas(municipios[0].id));
    } else if (key === 'municipio') {
      dispatch(getAldeas(value));
    }
    if (key === 'nombre'){
      cliente.aldea[key] = value.nombre;
      cliente.aldea.id = value.id;
    } else {
      cliente.aldea[key] = value;
    }
  }
  if (cliente.socioeconomico[key] !== undefined){
    cliente.socioeconomico[key] = value;
  }
  dispatch({ type: NUEVO_CLIENTE, nuevo_cliente: cliente });
};

export const verificarDPI = (dpi, navigation) => (dispatch, getStore) => {
  if (validations.dpi(dpi) === null) {
    dispatch(setLoader(true));
    const store = getStore();
    api.get('clientes/validar_dpi', {dpi: format_dpi(dpi)}, {dispatch, store}).catch((error) => {
      dispatch(setLoader(false));
    }).then((data) => {
      if (data) {
        if (data.count === 0) {
          //Limpia el formulario
          dispatch(resetCliente(dpi));
          navigation.navigate("NuevoCliente");
          dispatch(setLoader(false));
        }
        if (data.count > 1) {
          dispatch(resetCliente());
          dispatch(setLoader(false));
        }
        if (data.count === 1) {
          const cliente = data.results[0];
          console.log(`cliente encontrado por dpi${dpi}: `, cliente);

          cliente.referencias.forEach((referencia, index) => {
            referencia.key = index;
          });

          const aldea = {
            label: cliente.aldea.nombre,
            value: cliente.aldea.id
          };
          if (cliente.foto_cropped) {
            dispatch(editarFotos('foto', {uri: `${cliente.foto_cropped && cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto', undefined));
          }
          if (cliente.foto_dpi_cropped) {
            dispatch(editarFotos('foto_dpi', {uri: `${cliente.foto_dpi_cropped && cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_dpi', undefined));
          }
          if (cliente.foto_recibo_cropped) {
            dispatch(editarFotos('foto_recibo', {uri: `${cliente.foto_recibo_cropped && cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_recibo', undefined));
          }
          if (cliente.foto_casa_cropped) {
            dispatch(editarFotos('foto_casa', {uri: `${cliente.foto_casa_cropped && cliente.foto_casa_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_casa_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_casa', undefined));
          }
          dispatch({type: NUEVO_CLIENTE, nuevo_cliente: cliente});
          api.get(`clientes/validar_recompra`,{id:cliente.id}, {dispatch, store}).catch((error) =>{
          }).then((response) => {
            if (response) {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: response.ultimo_prestamo });
            } else {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: {} });
            }
          });
          dispatch(setLoader(false));
          navigation.navigate("PrevistaClientes");
          dispatch({type: ALDEA, aldea});
        }
      } else {
        dispatch(setLoader(false));
      }
    });
  }
};
export const irPorDPI = (dpi, navigation) => (dispatch, getStore) => {
  if (validations.dpi(dpi) === null) {
    dispatch(setLoader(true));
    const store = getStore();
    api.get('clientes', {dpi: format_dpi(dpi)}, {dispatch, store}).catch((error) => {
      dispatch(setLoader(false));
    }).then((data) => {
      if (data) {
        if (data.count === 0) {
          //Limpia el formulario
          dispatch(resetCliente(dpi));
          navigation.navigate("NuevoCliente");
          dispatch(setLoader(false));
        }
        if (data.count > 1) {
          dispatch(resetCliente());
          dispatch(setLoader(false));
        }
        if (data.count === 1) {
          const cliente = data.results[0];

          cliente.referencias.forEach((referencia, index) => {
            referencia.key = index;
          });

          const aldea = {
            label: cliente.aldea.nombre,
            value: cliente.aldea.id
          };
          if (cliente.foto_cropped) {
            dispatch(editarFotos('foto', {uri: `${cliente.foto_cropped && cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto', undefined));
          }
          if (cliente.foto_dpi_cropped) {
            dispatch(editarFotos('foto_dpi', {uri: `${cliente.foto_dpi_cropped && cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_dpi', undefined));
          }
          if (cliente.foto_recibo_cropped) {
            dispatch(editarFotos('foto_recibo', {uri: `${cliente.foto_recibo_cropped && cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_recibo', undefined));
          }
          if (cliente.foto_casa_cropped) {
            dispatch(editarFotos('foto_casa', {uri: `${cliente.foto_casa_cropped && cliente.foto_casa_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_casa_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_casa', undefined));
          }
          dispatch({type: NUEVO_CLIENTE, nuevo_cliente: cliente});
          api.get(`clientes/validar_recompra`,{id:cliente.id}, {dispatch, store}).catch((error) =>{
          }).then((response) => {
            if (response) {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: response.ultimo_prestamo });
            } else {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: {} });
            }
          });
          dispatch(setLoader(false));
          navigation.navigate("PerfilCliente");
          dispatch({type: ALDEA, aldea});
        }
      } else {
        dispatch(setLoader(false));
      }
    });
  }
};

export const geoLocalizar = () => (dispatch, getStore) => {
  const store = getStore();
  const id = store.clientes.nuevo_cliente.id;
  const lat = store.comun.latitud;
  const long = store.comun.longitud;
  if (lat !== null && long !== null) {
    api.post('clientes/geolocalizar', {lat, long}, {id}, {dispatch, store}).catch(() => {
    }).then((data) => {
      if (data) {
        Alert.alert(
          "Ingreso efectuado",
          "Geo localización del domicilio se efectuó correctamente",
          [
            {
              text: 'Aceptar', onPress: () => {
              }
            }
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
};

export const setCliente = (cliente, navigation) => (dispatch) => {
  if (cliente.foto_cropped !== ""){
    dispatch(editarFotos('foto', {uri: `${cliente.foto_cropped && cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`}));
  } else {
    dispatch(editarFotos('foto', null));
  }
  if (cliente.foto_dpi_cropped !== ""){
    dispatch(editarFotos('foto_dpi', {uri: `${cliente.foto_dpi_cropped && cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`}));
  } else {
    dispatch(editarFotos('foto_dpi', null));
  }
  if (cliente.foto_recibo_cropped !== ""){
    dispatch(editarFotos('foto_recibo', {uri: `${cliente.foto_recibo_cropped && cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`}));
  } else {
    dispatch(editarFotos('foto_recibo', null));
  }
  if (cliente.foto_casa_cropped !== ""){
    dispatch(editarFotos('foto_casa', {uri: `${cliente.foto_casa_cropped && cliente.foto_casa_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_casa_cropped}?random=${Math.random().toString(36).substring(7)}`}));
  } else {
    dispatch(editarFotos('foto_casa', null));
  }
  dispatch({type: NUEVO_CLIENTE, nuevo_cliente: cliente});
  navigation.navigate("NuevoCliente");
};

// ____________________________________
export const cobroIrDPI = (dpi, navigation) => (dispatch, getStore) => {
  console.log("irPorDPI ----")
  if (validations.dpi(dpi) === null) {
    dispatch(setLoader(true));
    const store = getStore();
    api.get('clientes/validar_dpi', {dpi: format_dpi(dpi)}, {dispatch, store}).catch((error) => {
      dispatch(setLoader(false));
    }).then((data) => {
      console.log(data, "data respuesta ----")
      if (data) {
        if (data.count === 0) {
          //Limpia el formulario
          dispatch(resetCliente(dpi));
          navigation.navigate("NuevoCliente");
          dispatch(setLoader(false));
        }
        console.log(data.count, "data conteo ---")
        if (data.count > 1) {
          dispatch(resetCliente());
          dispatch(setLoader(false));
        }
        if (data.count === 1) {
          const cliente = data.results[0];
          console.log(cliente, "cliente");

          if(cliente.referencia){
            cliente.referencias.forEach((referencia, index) => {
              referencia.key = index;
            });
          }


          console.log(cliente, "despues del forEach");

          if (cliente.aldea){
            const aldea = {
              label: cliente.aldea.nombre,
              value: cliente.aldea.id
            };
          }
          

          if (cliente.foto_cropped) {
            dispatch(editarFotos('foto', {uri: `${cliente.foto_cropped && cliente.foto_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto', undefined));
          }
          if (cliente.foto_dpi_cropped) {
            dispatch(editarFotos('foto_dpi', {uri: `${cliente.foto_dpi_cropped && cliente.foto_dpi_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_dpi_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_dpi', undefined));
          }
          if (cliente.foto_recibo_cropped) {
            dispatch(editarFotos('foto_recibo', {uri: `${cliente.foto_recibo_cropped && cliente.foto_recibo_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_recibo_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_recibo', undefined));
          }
          if (cliente.foto_casa_cropped) {
            dispatch(editarFotos('foto_casa', {uri: `${cliente.foto_casa_cropped && cliente.foto_casa_cropped.includes("https://") ? "" : URL_BASE}${cliente.foto_casa_cropped}?random=${Math.random().toString(36).substring(7)}`}));
          } else {
            dispatch(editarFotos('foto_casa', undefined));
          }
          dispatch({type: NUEVO_CLIENTE, nuevo_cliente: cliente});
          api.get(`clientes/validar_recompra`,{id:cliente.id}, {dispatch, store}).catch((error) =>{
          }).then((response) => {
            if (response) {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: response.ultimo_prestamo });
            } else {
              dispatch({ type: ULTIMA_PETICION, ultima_peticion: {} });
            }
          });
          dispatch(setLoader(false));
          navigation.navigate("PerfilCliente");
          console.log("navigate perfil del cliente");
          if(cliente.aldea){
            dispatch({type: ALDEA, aldea});

          }
        }
      } else {
        dispatch(setLoader(false));
      }
    });
  }
};





// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
  type: LOADER,
  loader,
});

export const setAldeas = aldeas => ({
  type: ALDEAS,
  aldeas,
});

export const setFotos = fotos => ({
  type: FOTOS,
  fotos,
});


export const actions = {
  setLoader,
  geoLocalizar,
  verificarDPI,
  resetCliente,
  editarValor,
  setAldeas,
  editarFotos,
  agregarReferencia,
  eliminarReferencia,
  editarReferencia,
  crearUris,
  cobroIrDPI,
};

// ------------------------------------
// REDUCERS
// ------------------------------------

export const reducers = {
  [LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader,
    };
  },
  [NUEVO_CLIENTE]: (state, { nuevo_cliente }) => {
    return {
      ...state,
      nuevo_cliente,
    };
  },
  [ULTIMA_PETICION]: (state, { ultima_peticion }) => {
    return {
      ...state,
      ultima_peticion,
    };
  },
  [ALDEA]: (state, { aldea }) => {
    return {
      ...state,
      aldea,
    };
  },
  [ALDEAS]: (state, { aldeas }) => {
    return {
      ...state,
      aldeas,
    };
  },
  [FOTOS]: (state, { fotos }) => {
    return {
      ...state,
      fotos,
    };
  },
};

export const initialState = {
  loader: false,
  aldea: null,
  nuevo_cliente: {},
  ultima_peticion: {},
  aldeas: [],
  fotos: {}
};
export default handleActions(reducers, initialState);
