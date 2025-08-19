import { connect } from 'react-redux';
import _ from 'lodash';
import { actions } from "../../../reducers/modules/solicitud/solicitud";
import TabSolicitud from "../../../stories/screens/Solicitud/Vista/TabSolicitud";

const ms2p = (state) => {
  const solicitud = state.solicitud.solicitud_seleccionada;
  const loader = state.solicitud.loader;

  const plan = _.find(state.comun.planes, {id: Number(solicitud.plan.id)});
  const monto = solicitud.monto !== "" ? solicitud.monto : 0;
  const cuota = plan !== undefined ? ((parseInt(monto, 10) * plan.cuota) / plan.referencia) : 0;
  const productos = state.comun.productos;

  return {
    solicitud,
    loader,
    planes : state.comun.planes,
    productos,
    cuota: cuota.toFixed(2),
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TabSolicitud);
