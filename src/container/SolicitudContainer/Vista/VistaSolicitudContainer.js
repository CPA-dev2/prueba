import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/solicitud/solicitud";
import VistaSolicitud from "../../../stories/screens/Solicitud/Vista/VistaSolicitud";
import { irImagen } from "../../../reducers/modules/imagenes";

const ms2p = (state) => {
  return {
    ...state.solicitud,
  };
};

const md2p = { ...actions, irImagen };

export default connect(ms2p, md2p)(VistaSolicitud);
