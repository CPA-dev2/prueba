import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/solicitud/pre_autorizadas";
import TabCliente from "../../../stories/screens/Solicitud/PreAutorizadas/Vista/TabCliente";


const ms2p = (state) => {
  const cliente = state.pre_autorizadas.solicitud_seleccionada.cliente;
  return {
    ...state.pre_autorizadas,
    cliente,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TabCliente);
