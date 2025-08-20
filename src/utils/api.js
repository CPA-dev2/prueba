import { actions } from "../reducers/modules/login";
import RNFetchBlob from 'react-native-blob-util';


const request = require('superagent');
const uuidv1 = require('uuid/v1');
console.log(__DEV__);
// export let SERVER_URL = "https://app.corporacionavanza.com/api";
//export let SERVER_URL = "https://vpnprendacredito.ciancoders.com/api";
export let SERVER_URL = "http://10.24.153.102:8000/api";
if (__DEV__ === true) {
  try {
    //const server = require('../utils/local_settings');
    //SERVER_URL = server.SERVER;
    SERVER_URL = "http://10.24.153.102:8000/api";
  } catch (err){
    //SERVER_URL = 'http://10.24.153.102:8000/api';
    SERVER_URL = 'http://10.24.153.102:8000/api';
  }
}


/**
 * Funcion para obtener el token
 * */
function getToken(state) {
  const token = typeof state === "string" ? state : state.store.login.token;
  if (token) {
    return `Token ${token}`;
  }
  return false;
}

/**
 * Funcion para hacer la url absoluta con query string a partir de una Url relativa y params
 * @param path: string: ruta relativa
 * @param params: dict: parametros para poner como query string
 * @return: string: string con la url absoluta para la peticion
 * */
export function makeUrl(path, params = {}) {
  let url = SERVER_URL;
  if (path[0] === '/') {
    url += `${path}/`;
  } else {
    url += `/${path}/`;
  }
  let hasQueue = false; // se coloca que no hay aun query string
  // por cada atributo en los params se inserta en el query string
  const dicKeys = Object.keys(params);
  dicKeys.forEach((row) => {
    if (hasQueue) {
      url += `&${row}=${params[row]}`;
    } else {
      url += `?${row}=${params[row]}`;
      hasQueue = true;
    }
  });
  // Se retorna la url absoluta con query string si fuera el caso
  return url;
}

/**
 * Funcion para manejar los errores de cualquier petición
 * @param response: response: response de la peticion
 * @param state: dict: state de redux
 * */
function errorHandler(response, state) {
  // Estado 401 o 403 redirigen al login
  try {
    if (response.statusCode === 401 || response.statusCode === 403) {
      state.dispatch(actions.logout());
    } else {
      // console.log(response.body);
    }
  } catch (err){}
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _post(path, body, params = {}, state) {
  const url = makeUrl(path, params);
  let token = getToken(state);
  if (getToken(state)){
    return request.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', token);
  }
  return request.post(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: Promise: promise del post
 * */
function post(path, body, params = {}, state) {
  return new Promise((resolve, reject) => {
    _post(path, body, {...params, uuid: uuidv1()}, state).then((response) => {
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          resolve(response.body);
        }
        if (response.text){
          resolve(JSON.parse(response.text));
        }
        resolve(response);
      }
    }).catch((error) => {
      errorHandler(error.response, state);
      const response = error.response;
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          reject(response.body);
        }
        if (response.text){
          reject(JSON.parse(response.text));
        }
        reject(error);
      }
    });
  });
}

/**
 * Funcion para hacer post con imagenes utilizando RNFetchBlob
 * */
async function postImagenes(path, data, fotos, state, metodo = "POST") {
  const finalData = [];
  Object.keys(fotos).forEach((foto) => {
    try {
      if (fotos[foto].filename !== undefined) {
        finalData.push({
          name: foto,
          filename: fotos[foto].filename,
          data: fotos[foto].data
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  finalData.push({name: 'data', data: JSON.stringify(data)});
  try {
    if (__DEV__ === true) {
      const response = await RNFetchBlob.fetch(metodo, `http://10.0.2.2:8000/api/${path}/`,{
        Authorization: getToken(state),
        'Content-Type': 'multipart/form-data',
      }, finalData);
      const responseData = await response.json();
      return responseData;
    }
    else {
      const response = await RNFetchBlob.fetch(metodo, makeUrl(path),{
        Authorization: getToken(state),
        'Content-Type': 'multipart/form-data',
      }, finalData);
      const responseData = await response.json();
      return responseData;
    }

  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _postMultiPart(path, body, attachments, params = {}, state) {
  const url = makeUrl(path, params);
  let token = getToken(state);
  let result;
  if (getToken(state)){
    result = request.post(url).set('Authorization', token);
  } else {
    result = request.post(url);
  }
  attachments.forEach((attachment) => {
    result.attach(attachment.name, attachment.file);
  });
  const data = JSON.stringify(body);
  result.field('data', data);
  return result;
}

/**
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: Promise: promise del post
 * */
function postAttachments(path, body, attachments, params = {}, state) {
  return new Promise((resolve, reject) => {
    _postMultiPart(path, body, attachments, params, state).then((response) => {
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          resolve(response.body);
        }
        resolve(response);
      }
    }).catch((error) => {
      errorHandler(error.response, state);
      reject(error.response.body);
    });
  });
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _put(path, body, params = {}, state) {
  const url = makeUrl(path, params);
  let token = getToken(state);
  if (getToken(state)){
    return request.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', token);
  }
  return request.put(url).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: Promise: promise del put
 * */
function put(path, body, params = {}, state) {
  return new Promise((resolve, reject) => {
    _put(path, body, {...params, uuid: uuidv1()}, state).then((response) => {
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          resolve(response.body);
        }
        if (response.text){
          resolve(JSON.parse(response.text));
        }
        resolve(response);
      }
    }).catch((error) => {
      errorHandler(error.response, state);
      const response = error.response;
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          reject(response.body);
        }
        if (response.text){
          reject(JSON.parse(response.text));
        }
        reject(error);
      }
    });
  });
}
/**
 * Funcion para hacer una peticion delete
 * @param path: string: path relativo de la peticion
 * @param state: dict: state de redux
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _delete(path, state) {
  const url = makeUrl(path);
  let token = getToken(state);
  if (getToken(state)){
    return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', token);
  }
  return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion delete
 * @param path: string: path relativo de la peticion
 * @param state: dict: state de redux
 * @return: Promise: promise del delete
 * */
function eliminar(path, state) {
  return new Promise((resolve, reject) => {
    _delete(path, state).then((response) => {
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          resolve(response.body);
        }
        resolve(response);
      }
    }).catch((error) => {
      errorHandler(error.response, state);
      reject(error.response.body);
    });
  });
}

/**
 * Funcion para hacer una peticion get
 * @param path: string: path relativo de la peticion
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: Promise: instancia de superagent lista para ser recibida como promise
 * */
function _get(path, params = {}, state) {
  const sucursal = state.store.login.sucursal;
  if (sucursal){
    params.sucursal = sucursal;
  }
  const url = makeUrl(path, params);
  let token = getToken(state);
  if (getToken(state)){
    return request.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', token);
  }
  return request.get(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Funcion para hacer una peticion get
 * @param path: string: path relativo de la peticion
 * @param params: dict: parametros para query string, opcionales
 * @param state: dict: state de redux
 * @return: Promise: promise del get
 * */
function get(path, params = {}, state) {
  return new Promise((resolve, reject) => {
    _get(path, params, state).then((response) => {
      if (response === undefined){
        reject({"error": "Comunicación con el servidor ha fallado"});
      } else {
        if (response.body){
          resolve(response.body);
        }
        if (response.text){
          resolve(JSON.parse(response.text));
        }
        resolve(response);
      }
    }).catch((error) => {
      errorHandler(error.response, state);
      reject(error.response);
    });
  });
}

export const api = { get, post, put, eliminar, postAttachments, postImagenes };
