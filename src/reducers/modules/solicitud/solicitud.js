import { handleActions } from 'redux-actions';
import {Alert} from 'react-native';
import _ from "lodash";
import Fuse from 'fuse.js';
import { api } from "../../../utils/api";
import { actions as imagenesActions } from "../imagenes";

const RNFS = require('react-native-fs');

const LOADER = "SOLICITUD_LOADER";
const DATA = 'SOLICITUD_DATA';
const CLIENTE_ID = 'CLIENTE_ID';
const SOLICITUD = 'SOLICITUD';
const SOLICITUDES = 'SOLICITUDES';
const SOLICITUDES_F = 'SOLICITUDES_F';
const JUSTIFICACION = 'SOLICITUDES_JUSTIFICACION';
const GARANTIA = 'GARANTIA';
const SOLICITUDES_SELECCIONADA = 'SOLICITUDES_SELECCIONADA';
const LOADER_GARANTIA = 'GARANTIA_LOADER';
const RESETEAR = "RESETEAR_SOLICITUD";
const CATEGORIAS = "CATEGORIAS_SOLICITUD";

export const constants = {
  LOADER,
};

// ------------------------------------
// Actions
// ------------------------------------

export const editarValor = (key, value, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  solicitud[key] = value;
  dispatch({ type: SOLICITUD, solicitud});
  if (key === 'tipo_garantia'){
    navigation.navigate("CrearGarantia");
    dispatch({ type: RESETEAR, resetear:false});
  }
};

export const editarTipoProducto = (key , value) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  solicitud[key] = value;
  const plan = _.find(store.comun.planes, {tipo_producto: Number(value)});
  solicitud.plan = plan.id;
  dispatch({ type: SOLICITUD, solicitud: solicitud });
};

export const addGarantia = (nuevo, navigation) => (dispatch, getStore) => {
  dispatch({ type: RESETEAR, resetear:false });
  dispatch({type:LOADER_GARANTIA, loaderGarantia:true});
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  nuevo['key'] = solicitud.garantias.length;
  nuevo['tipo'] = solicitud.tipo_garantia;
  nuevo['tipo_garantia'] = solicitud.tipo_garantia;
  solicitud['garantias'].push(nuevo);
  dispatch({ type: SOLICITUD, solicitud: solicitud });
  dispatch({type:LOADER_GARANTIA, loaderGarantia:false});
  navigation.navigate("CrearSolicitud");
};

export const eliminarGarantia = (posicion) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  const garantias = solicitud.garantias;
  garantias.splice(posicion,1);
  garantias.forEach((garantia, index)=>{
    garantias[index]['key'] = index;
  });
  solicitud['garantias'] = garantias;
  dispatch({ type: SOLICITUD, solicitud: solicitud });
};

export const loadGarantia = (posicion, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const garantias = _.cloneDeep(store.solicitud.solicitud.garantias);
  const garantia = garantias[posicion];
  dispatch({type: GARANTIA, garantia: garantia});
  dispatch({ type: RESETEAR, resetear:false });
  navigation.navigate("EditarGarantia");
};

export const editarGarantia = (garantia, posicion, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  solicitud.garantias[posicion] = garantia;
  dispatch({type: SOLICITUD, solicitud:solicitud});
  navigation.navigate("CrearSolicitud");
};

export const crearUris = (garantias_id, garantias) => (dispatch, getStore) => {
  const store = getStore();
  let cont = 0;
  garantias.forEach((garantia, index) => {
    const info = garantia.temp_foto;
    if (info) {
      const path = RNFS.PicturesDirectoryPath + "/" + info.nombre;
      const uri = {
        ref_id: garantias_id[index].id,
        uri: info.source.uri,
        nombre: info.nombre,
        campo: "foto",
        modelo: 2,  // VALOR PARA MODELO GARANTIAS
      };
      // RNFS.writeFile(path, info.data, 'base64')
      //   .then((success) => {
      //     console.log('FILE WRITTEN!');
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });

      api.post("uris", uri, {}, {dispatch, store}).catch(() => {
      }).then(() => {
        cont = cont + 1;
        if (cont === garantias.length) {
          dispatch(imagenesActions.getUris());
        }
      });
    }
  });
};

export const crearSolicitud = (navigation) => (dispatch, getStore) => {
  const store = getStore();
  dispatch(setLoader(true));
  const solicitud = _.cloneDeep(store.solicitud.solicitud);
  const garantias = _.cloneDeep(solicitud.garantias);
  solicitud.garantias.forEach((garantia) => {garantia.temp_foto = undefined});
  api.post("solicitudes", {data: JSON.stringify(solicitud)}, {}, {dispatch, store}).catch((err) => {
    if (err){
      Alert.alert(
        'Error',
        `ERROR ${err.error}`,
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
      dispatch({ type: RESETEAR, resetear:true });
    } else {
      Alert.alert(
        'Error',
        'Ha ocurrido un error, verifica y vuelve a intentar',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
      dispatch({ type: RESETEAR, resetear:true });
    }
  }).then((data) => {
    if (data) {
      dispatch(crearUris(data.garantias, garantias));
      Alert.alert(
        'Éxito',
        'Solicitud creada Exitosamente',
        [
          {text: 'Aceptar'},
        ],
        {cancelable: false}
      );
      navigation.popToTop();
      dispatch(resetDatos());
    }
    dispatch(setLoader(false));
  });
};

export const listarCategorias = (categoria = null, tipo_producto = null) => (dispatch, getState) => {
  dispatch({ type: LOADER, loader: true });
  console.log('listarCategorias');
  const params = {};
  
  if (tipo_producto != null){
    params.tipo_producto__id = tipo_producto;
  }

  api.get('categorias_productos', params, { dispatch, store: getState() })
    .then((data) => {
      console.log('paso get api', data);
      if (data){
        const categorias = data.results;
        dispatch({ type: CATEGORIAS, categorias });
        if (categoria !== null){
          dispatch(editarValor('categoria_producto', categoria));
        } else {
          if (categorias[0] && categorias[0].id !== undefined){
            dispatch(editarValor('categoria_producto', categorias[0].id));
          }
        }
      }
      dispatch({ type: LOADER, loader: false });
    })
    .catch((error) => {
      console.log('paso get api', error);
      dispatch({ type: LOADER, loader: false });
    });
};

export const resetDatos = (cliente_id) => (dispatch, getStore) => {
  const store = getStore();
  const producto = store.comun.productos[0];
  const plan = _.find(store.comun.planes, {tipo_producto: producto.id});
  const solicitud = {
    cliente:{},
    monto:'',
    plan: plan ? plan.id : null,
    tipo_producto: producto.id ? producto.id : '',
    tipo_garantia: '',
    garantias:[]
  };
  dispatch({ type: SOLICITUD, solicitud:solicitud });
  dispatch({ type: GARANTIA, garantia:{} });
  dispatch({ type: CLIENTE_ID, cliente_id });
  dispatch({ type: RESETEAR, resetear:true });
};

//ELIMINAR CUANDO ESTE LA VISTA DE CLIENTE
export const loadCliente = () => (dispatch, getStore) => {
  dispatch({ type: LOADER, loader: true });
  const store = getStore();
  const id = store.solicitud.cliente_id;
  api.get(`clientes`, {id}, {dispatch,store}).catch((error) =>{
    dispatch({ type: LOADER, loader: false });
  }).then((data) => {
    if (data){
      const cliente = data.results[0];
      dispatch(editarValor('cliente',cliente));
    }
    dispatch({ type: LOADER, loader: false });
  });
};

export const getListado = () => (dispatch, getStore) => {
  dispatch(setLoader(true));
  api.get("solicitudes/pendientes", {}, {dispatch, store: getStore()}).catch(() =>{}).then((data) => {
    if (data) {
      dispatch(setSolicitudes(data));
      dispatch(setSolicitudesFiltro(data));
    }
    dispatch(setLoader(false));
  });
};

export const filtrarSolicitudes = (dpi) => (dispatch, getStore) => {
  const store = getStore();
  const solicitudes = store.solicitud.solicitudes;
  if (dpi) {
    const options = {keys: ['cliente.dpi']};
    const fuse = new Fuse(solicitudes, options);
    const data = fuse.search(dpi);
    dispatch(setSolicitudesFiltro(data));
  } else {
    dispatch(setSolicitudesFiltro([...solicitudes]));
  }

};

export const editarMonto = (body) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = store.solicitud.solicitud_seleccionada;
  dispatch(setLoader(true));
  api.put(`solicitudes/${solicitud.id}`, body, {}, {dispatch, store}).catch(() => {
    Alert.alert(
      "Error",
      "Ha ocurrido verifica y vuelve a intentar",
      [
        {text: 'Aceptar'}
      ],
      {cancelable: false}
    );
  }).then((data) => {
    if (data) {
      dispatch(setSolicitudSeleccionada(data));
      Alert.alert(
        "Éxito",
        "Datos actualizados",
        [
          {text: 'Aceptar'}
        ],
        {cancelable: false}
      );
    }
    dispatch(setLoader(false));
  });
};

export const editarObservaciones = (observaciones) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = _.cloneDeep(store.solicitud.solicitud_seleccionada);
  solicitud.observaciones = observaciones;
  dispatch(setSolicitudSeleccionada(solicitud));
};

/**
 * Funcion para cuando se esta viendo la solicitud ya creada y se desea editar o agregar garantias
 * */
export const crearGarantia = (garantia) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = store.solicitud.solicitud_seleccionada;
  dispatch(setLoader(true));
  const body = {
    id: garantia.id,
    solicitud: solicitud.id,
    articulo: garantia.articulo,
    serie: garantia.serie,
    tipo_vehiculo: garantia.tipo_vehiculo,
    personas: garantia.personas,
    marca: garantia.marca,
    uso: garantia.uso,
    placa: garantia.placa,
    chasis: garantia.chasis,
    vin: garantia.vin,
    centimetros_cubicos: garantia.centimetros_cubicos,
    cilindros: garantia.cilindros,
    color: garantia.color,
    modelo: garantia.modelo,
    valor_mercado: garantia.valor_mercado,
    linea: garantia.linea,
    precio_avaluo: garantia.precio_avaluo,
    familia: garantia.familia,
    tipo_garantia: garantia.tipo_garantia,
    motivo_ingreso: garantia.motivo_ingreso,
    link_referencia: garantia.link_referencia,
    descripcion: garantia.descripcion,
    estado: garantia.estado,
    precio_sugerido_venta: garantia.precio_sugerido_venta,
  };
  api.post('solicitudes/cambio_garantia', body, {}, {dispatch, store}).catch((err) =>{
    if (err) {
      if (err.error) {
        Alert.alert(
          "Error",
          err.error,
          [
            {text: 'Aceptar'}
          ],
          {cancelable: false}
        );
      } else {
        Alert.alert(
          "Error",
          "Ha ocurrido un error en la pre-aprobación de la solicitud",
          [
            {text: 'Aceptar'}
          ],
          {cancelable: false}
        );
      }
    }
    dispatch(setLoader(false));
  }).then((data) => {
    if (data) {
      if (garantia.temp_foto.data) {
        const info = garantia.temp_foto;
        const path = RNFS.PicturesDirectoryPath + "/" + info.nombre;
        const uri = {
          ref_id: data.garantia.id,
          uri: info.source.uri,
          nombre: info.nombre,
          campo: "foto",
          modelo: 2,  // VALOR PARA MODELO GARANTIAS
        };
        // RNFS.writeFile(path, info.data, 'base64')
        //   .then((success) => {
        //     api.post("uris", uri, {}, {dispatch, store}).catch(() => {}).then((item) => {
        //       dispatch(imagenesActions.postImagen(item, data.solicitud.id));
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
      }
      dispatch(setLoader(false));
    }
    dispatch(setLoader(false));
  });
};

export const getSolicitudById = (id) => (dispatch, getStore) => {
  const store = getStore();
  dispatch(setLoader(true));
  api.get(`solicitudes/${id}`, {}, {dispatch, store}).catch(() => {}).then((data) => {
    dispatch(setSolicitudSeleccionada(data));
    dispatch(setLoader(false));
  });
};

export const validarGarantia = (tipo, id) => (dispatch, getStore) => {
  const store = getStore();
  api.post("solicitudes/validar_garantia", {tipo, id}, {}, {dispatch, store}).catch(() => {}).then((data) => {
    if (data) {
      dispatch(setSolicitudSeleccionada(data));
    }
  });
};

export const validarReferencia = (tipo, id, justificacion, navigation) => (dispatch, getStore) => {
  const store = getStore();
  if (tipo === true){
    api.post("referencias/validar", {id}, {}, {dispatch, store}).catch(() => {}).then((data) => {
      if (data) {
        const solicitud = _.cloneDeep(store.solicitud.solicitud_seleccionada);
        const referencias = solicitud.cliente.referencias;
        const referencia = _.find(referencias, {id});
        const index = referencias.indexOf(referencia);
        referencias.splice(index, 1, data);
        dispatch(setSolicitudSeleccionada(solicitud));
      }
    });
  } else if (tipo === false) {
    const solicitud = _.cloneDeep(store.solicitud.solicitud_seleccionada);
    api.post("referencias/rechazar", {id, id_solicitud: solicitud.id,
      justificacion}, {}, {dispatch, store}).catch(() => {}).then((data) => {
      if (data) {
        if (data.mensaje !== undefined){
          Alert.alert(
            "Solicitud rechazada",
            "Puesto que dos personas han dado mala referencia, se rechaza la solicitud",
            [
              {text: 'Aceptar', onPress: () => navigation.navigate('ListadoSolicitud')}
            ],
            {cancelable: false}
          );
        } else {
          const referencias = solicitud.cliente.referencias;
          const referencia = _.find(referencias, {id});
          const index = referencias.indexOf(referencia);
          referencias.splice(index, 1, data);
          dispatch(setSolicitudSeleccionada(solicitud));
        }
      }
    });
  }
};

export const preautorizarSolicitud = (navigation) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = store.solicitud.solicitud_seleccionada;
  const justificacion = store.solicitud.justificacion;
  const lat = store.comun.latitud;
  const long = store.comun.longitud;
  if (lat !== null && long !== null) {
    dispatch(setLoader(true));
    api.post("solicitudes/validar_solicitud", {
        id: solicitud.id,
        tipo: true,
        monto: solicitud.monto,
        justificacion,
        lat,
        long
      },
      {}, {dispatch, store}).catch((err) => {
      dispatch(setLoader(false));
      if (err) {
        if (err.error) {
          Alert.alert(
            "Error",
            err.error,
            [
              {text: 'Aceptar'}
            ],
            {cancelable: false}
          );
        } else {
          Alert.alert(
            "Error",
            "Ha ocurrido un error en la pre-aprobación de la solicitud",
            [
              {text: 'Aceptar'}
            ],
            {cancelable: false}
          );
        }
      }
    }).then((data) => {
      dispatch(setLoader(false));
      if (data) {
        Alert.alert(
          "Solicitud pre-autorizada",
          "La solicitud de crédito ha sido pre-autorizada",
          [
            {text: 'Aceptar', onPress: () => navigation.navigate('ListadoSolicitud')}
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

export const rechazarSolicitud = (motivo, navigation) => (dispatch, getStore) => {
  const store = getStore();
  const solicitud = store.solicitud.solicitud_seleccionada;
  api.post("solicitudes/validar_solicitud", {motivo, id:solicitud.id, tipo: false}, {}, {dispatch, store}).catch((err) => {
    if (err){
      if (err.error) {
        Alert.alert(
          "Error",
          err.error
            [
            {text: 'Aceptar'}
          ],
          {cancelable: false}
        );
      }
    }
  }).then((data) => {
    if (data){
      Alert.alert(
        "Solicitud rechazada",
        "La solicitud de crédito ha sido rechazada",
        [
          {text: 'Aceptar', onPress: () => navigation.navigate('ListadoSolicitud')}
        ],
        {cancelable: false}
      );
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
export const setJustificacion = justificacion => ({
  type: JUSTIFICACION,
  justificacion,
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
  editarValor,
  addGarantia,
  editarTipoProducto,
  eliminarGarantia,
  loadGarantia,
  editarGarantia,
  crearSolicitud,
  loadCliente,
  filtrarSolicitudes,
  setSolicitudSeleccionada,
  validarGarantia,
  validarReferencia,
  preautorizarSolicitud,
  rechazarSolicitud,
  editarMonto,
  editarObservaciones,
  setJustificacion,
  crearGarantia,
  listarCategorias,

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
  [LOADER_GARANTIA]: (state, { loaderGarantia }) => {
    return {
      ...state,
      loaderGarantia,
    };
  },
  [DATA]: (state, { data }) => {
    return {
      ...state,
      data,
    };
  },
  [RESETEAR]: (state, { resetear }) => {
    return {
      ...state,
      resetear,
    };
  },
  [SOLICITUD]: (state, { solicitud }) => {
    return {
      ...state,
      solicitud,
    };
  },
  [GARANTIA]: (state, { garantia }) => {
    return {
      ...state,
      garantia,
    };
  },
  [CLIENTE_ID]: (state, { cliente_id }) => {
    return {
      ...state,
      cliente_id,
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
  [JUSTIFICACION]: (state, { justificacion }) => {
    return {
      ...state,
      justificacion,
    };
  },
  [SOLICITUDES_SELECCIONADA]: (state, { solicitud_seleccionada }) => {
    return {
      ...state,
      solicitud_seleccionada,
    };
  },
  [CATEGORIAS]: (state, { categorias }) => {
    return {
      ...state,
      categorias,
    };
  },
};

const initialState = {
  loader: false,
  loaderGarantia: false,
  garantia:{},
  data: {},
  solicitud:{
    cliente:{},
    monto:'',
    plan:null,
    tipo_producto:'',
    tipo_garantia: '',
    garantias:[],
    observaciones: '',
    categoria_producto: null,
  },
  cliente_id: 0,
  solicitudes: [],
  solicitudes_filtro: [],
  solicitud_seleccionada: {},
  justificacion: "",
  resetear: true,
  categorias: [],
};


export default handleActions(reducers, initialState);
