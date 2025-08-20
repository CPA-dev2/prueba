import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { api } from "../../utils/api";
import { getSolicitudById } from "./solicitud/solicitud";
import RNFetchBlob from 'react-native-blob-util';

const RNFS = require('react-native-fs');

const fs = RNFetchBlob.fs;



const IMAGENES = 'IMAGENES';
const IMAGEN = 'IMAGENES_IMAGEN';
const CONTEO = 'IMAGENES_CONTEO';

export const constants = {
  IMAGENES,
  IMAGEN,
};

// ------------------------------------
// Actions
// ------------------------------------

export const postImagen = (item, ref_id) => (dispatch, getStore) => {
  const store = getStore();
  fs.readFile(item.uri, 'base64').then((archivo) => {
    api.postImagenes("uris/imagen", item,
      {imagen: {data:archivo, filename: item.nombre}}, {dispatch, store}).catch(()=>{})
      .then((resp) => {
        if (resp) {
          const response = JSON.parse(resp.text());
          dispatch(getSolicitudById(ref_id));
          RNFS.unlink(response.uri)
            .then(() => {
              console.log('FILE DELETED');
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
  }).catch((err) => {
    console.log(err);
  });
};
export const getUris = () => (dispatch, getStore) => {
  const store = getStore();
  // NetInfo.getConnectionInfo().then((connectionInfo) => {
  //   if (connectionInfo.type === "wifi") {
  api.get("uris", {}, {dispatch, store}).catch(() => {
  }).then(async (data) => {
    if (data) {
      // data.results.forEach(  async(item) => {
        dispatch(setConteoByUris(data.count));
        for await (const item of data.results) {
          await fs.readFile(item.uri, 'base64').then( async(archivo) => {
            try {
              const resp = await api.postImagenes("uris/imagen", item,
                {imagen: {data:archivo, filename: item.nombre, name:item.campo}}, {dispatch, store});

              if (resp) {
                  // const response = JSON.parse(resp.text());
                  RNFS.unlink(resp.uri)
                    .then(() => {
                      console.log('FILE DELETED');
                    })
                    .catch((err) => {
                      console.log(err.message);
                    })}
            } catch (error) {
              console.log('error ocurred');
              console.log(error);
            } finally {
              dispatch(setConteo(false));
            }
          }).catch(async(err) => {
            console.log(err);
            try {
              await api.eliminar(`uris/${item.id}`, {dispatch, store});
              dispatch(setConteo(false));
            } catch (error) {
              console.log('No se pudo eliminar de bd');
            }
          });
        }
    }
  });

};

export const setNuevaImagen = (imagen) => (dispatch, getStore) => {
  const store = getStore();
  const imagenes = store.imagenes.imagenes;
  const existe = _.find(imagenes, {ref_id: imagen.ref_id, campo: imagen.campo});
  if (existe){
    const index = imagenes.indexOf(imagen);
    imagenes.splice(index, 1, imagen);
    dispatch(setImagenes([...imagenes]));
  } else {
    dispatch(setImagenes([...imagenes, imagen]));
  }
};

export const quitarImagen = (imagen) => (dispatch, getStore) => {
  const store = getStore();
  const imagenes = store.imagenes.imagenes;
  const item = _.find(imagenes, {uri: imagen.uri});
  if (item) {
    const index = imagenes.indexOf(item);
    imagenes.splice(index, 1);
  }
  dispatch(setImagenes([...imagenes]));
};

export const irImagen = (uri, navigation) => (dispatch) => {
  dispatch(setImagen([{uri}]));
  navigation.navigate("ImageZoom");
};
// ------------------------------------
// Pure Actions
// ------------------------------------

export const setImagenes = imagenes => ({
  type: IMAGENES,
  imagenes,
});
export const setImagen = imagen => ({
  type: IMAGEN,
  imagen,
});

const setConteo = (conteo) => (dispatch, getStore) => {
  const store =  getStore();
  const counter = store.imagenes.conteo;
  if (conteo){
    dispatch({ type: CONTEO, conteo: counter + 1 });
  } else {
    if (counter > 0) {
      dispatch({ type: CONTEO, conteo: counter - 1 });
    }
  }
};

const setConteoByUris = (value_uris) => (dispatch, getStore) => {
  dispatch({ type: CONTEO, conteo: value_uris});
};

export const actions = {
  setImagenes,
  getUris,
  postImagen,
};

// ------------------------------------
// REDUCERS
// ------------------------------------

export const reducers = {
  [IMAGENES]: (state, { imagenes }) => {
    return {
      ...state,
      imagenes,
    };
  },
  [IMAGEN]: (state, { imagen }) => {
    return {
      ...state,
      imagen,
    };
  },
  [CONTEO]: (state, { conteo }) => {
    return {
      ...state,
      conteo,
    };
  },
};

const initialState = {
  imagenes: [],
  imagen: [],
  conteo: 0,
};


export default handleActions(reducers, initialState);
