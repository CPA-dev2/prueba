import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/clientes";
import { irImagen } from "../../reducers/modules/imagenes";
import PrevistaCliente from "../../stories/screens/Clientes/PrevistaCliente";


const ms2p = (state) => {
  return {
    ...state.clientes,
  };
};

const md2p = { ...actions, irImagen };

export default connect(ms2p, md2p)(PrevistaCliente);
