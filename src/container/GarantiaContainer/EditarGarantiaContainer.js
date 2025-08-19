import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/solicitud/solicitud";
import EditarGarantia from "../../stories/screens/Solicitud/Crear/Garantia/EditarGarantia";


const ms2p = (state) => {
  return {
    ...state.solicitud,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EditarGarantia);
