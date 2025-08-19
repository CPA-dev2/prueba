import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/solicitud/pre_autorizadas";
import TabSolicitud from "../../../stories/screens/Solicitud/PreAutorizadas/Vista/TabSolicitud";
import _ from "lodash";


const ms2p = (state) => {
  const solicitud = state.pre_autorizadas.solicitud_seleccionada;
  const plan = _.find(state.comun.planes, {id: Number(solicitud.plan.id)});
  const monto = solicitud.monto !== "" ? solicitud.monto : 0;
  const cuota = plan !== undefined ? ((parseInt(monto, 10) * plan.cuota) / plan.referencia) : 0;
  const productos = state.comun.productos;
  return {
    solicitud,
    planes : state.comun.planes,
    productos,
    cuota: cuota.toFixed(2),
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TabSolicitud);
