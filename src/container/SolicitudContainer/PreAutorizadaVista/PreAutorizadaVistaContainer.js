import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/solicitud/pre_autorizadas";
import VistaPreAutorizada from "../../../stories/screens/Solicitud/PreAutorizadas/Vista/VistaPreAutorizada";


const ms2p = (state) => {
  const solicitud = state.pre_autorizadas.solicitud_seleccionada;
  return {
    ...state.pre_autorizadas,
    solicitud,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(VistaPreAutorizada);
