// export let URL_BASE = "https://app.corporacionavanza.com";
//export let URL_BASE = "https://vpnprendacredito.ciancoders.com/api";
export let URL_BASE = "http://10.24.153.102:8000/api";

if (__DEV__ === true) {
  try {
    //const server = require('./local_settings');
    //URL_BASE = server.URL_BASE;
    URL_BASE = "http://10.24.153.102:8000/api";
  } catch (err){
    URL_BASE = 'http://10.24.153.102:8000/api';
    //URL_BASE = 'http://10.24.153.102:8000';
  }
}