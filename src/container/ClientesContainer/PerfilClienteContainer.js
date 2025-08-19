import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/clientes";
import { resetDatos } from "../../reducers/modules/solicitud/solicitud";
import { irImagen } from "../../reducers/modules/imagenes";
import PerfilCliente from "../../stories/screens/Clientes/PerfilCliente";


const ms2p = (state) => {
  return {
    ...state.clientes,
    ...state.login,
  };
};

const md2p = { ...actions, resetDatos, irImagen };

export default connect(ms2p, md2p)(PerfilCliente);
