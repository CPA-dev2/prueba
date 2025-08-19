import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/solicitud/pre_autorizadas";
import PreAutorizadas from "../../stories/screens/Solicitud/PreAutorizadas/PreAutorizadas";


const ms2p = (state) => {
  return {
    ...state.pre_autorizadas,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(PreAutorizadas);
