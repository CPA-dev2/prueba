import { connect } from 'react-redux';
import _ from 'lodash';
import { actions } from "../../reducers/modules/clientes";
import NuevoCliente from "../../stories/screens/Clientes/NuevoCliente";
import { MUNICIPIOS } from "../../utils/departamentos_municipios";


const ms2p = (state) => {
  const municipios = _.filter(MUNICIPIOS, {departamento:state.clientes.nuevo_cliente.aldea.departamento});
  const token = state.login.token;
  return {
    municipios,
    ...state.clientes,
    token,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(NuevoCliente);
