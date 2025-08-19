import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/clientes";
import BusquedaCliente from "../../stories/screens/Clientes/BusquedaCliente";


const ms2p = (state) => {
  return {
    ...state.clientes,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(BusquedaCliente);
