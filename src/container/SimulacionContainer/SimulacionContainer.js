import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/simulacion";
import Simulacion from "../../stories/screens/Simulacion/Simulacion";
import _ from 'lodash';

const ms2p = (state) => {
  const datos = state.simulacion.datos;
  const plan = _.find(state.comun.planes, {id: Number(datos.plan)});
  const productos = state.comun.productos;
  const perfil = state.login.user?.perfil?.rol?.id;
  let cobranza_dificil = false;

  if (perfil === 17) {
    cobranza_dificil = true;
  }

  let planes = [];
  if (!cobranza_dificil) {
    if (datos.tipo_producto) {
      planes = _.filter(state.comun.planes, {tipo_producto: Number(datos.tipo_producto)});
    } else {
      if (productos[0]) {
        planes = _.filter(state.comun.planes, {tipo_producto: productos[0].id});
      }
    }
  } else {
    planes = _.filter(state.comun.planes, {cobranza_dificil: true});
  }

  return {
    ...state.simulacion,
    planes,
    productos,
    plan,
    cobranza_dificil,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Simulacion);
