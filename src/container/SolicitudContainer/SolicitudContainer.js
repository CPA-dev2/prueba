import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/solicitud/solicitud";
import CrearSolicitud from "../../stories/screens/Solicitud/Crear/CrearSolicitud";
import _ from 'lodash';

const ms2p = (state) => {
  const solicitud = state.solicitud.solicitud;
  const plan = _.find(state.comun.planes, {id: Number(solicitud.plan)});
  const categorias = state.solicitud.categorias;
  const monto = solicitud.monto !== "" ? solicitud.monto : 0;
  const listarCategorias = state.solicitud.listarCategorias;
  const cuota = plan !== undefined ? ((parseInt(monto) * plan.cuota) / plan.referencia) : 0;
  const productos = state.comun.productos;
  let planes = [];
  if (solicitud.tipo_producto) {
    planes = _.filter(state.comun.planes, {tipo_producto: Number(solicitud.tipo_producto)});
  } else {
    if (productos[0]) {
      planes = _.filter(state.comun.planes, {tipo_producto: productos[0].id});
    }
  }

  return {
    ...state.solicitud,
    cuota,
    planes,
    categorias,
    productos,
    plan,
    listarCategorias,
    montoTotal: Math.ceil(plan.cuotas * cuota).toFixed(2),
  };
};


const md2p = { ...actions };

export default connect(ms2p, md2p)(CrearSolicitud);
