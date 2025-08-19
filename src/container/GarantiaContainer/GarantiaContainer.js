import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/solicitud/solicitud";
import CrearGarantia from "../../stories/screens/Solicitud/Crear/Garantia/CrearGarantia";
import { OTRAS_CATEGORIAS } from '../../utils/constants';


const ms2p = (state) => {
  return {
    ...state.solicitud,
    familias: OTRAS_CATEGORIAS,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearGarantia);
