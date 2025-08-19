import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/solicitud/solicitud";
import { setCliente } from "../../../reducers/modules/clientes";
import TabCliente from "../../../stories/screens/Solicitud/Vista/TabCliente";

const ms2p = (state) => {
  const cliente = state.solicitud.solicitud_seleccionada.cliente;
  const loader = state.solicitud.loader;
  return {
    cliente,
    loader,
  };
};

const md2p = { ...actions, setCliente };

export default connect(ms2p, md2p)(TabCliente);
