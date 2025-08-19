import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/cartera";
import RegistrarPagos from "../../stories/screens/Carteras/Pagos/RegistrarPagos";
import moment from "moment/moment";
import _ from "lodash";


const ms2p = (state) => {
  const cartera = state.cartera.cartera_seleccionada;
  let pago_actual = {};
  if (cartera.fechas_pago){
    const hoy = moment().format('YYYY-MM-DD');
    pago_actual = _.find(cartera.fechas_pago.slice(1,), { 'fecha': hoy});
  }
  return {
    ...state.cartera,
    pago_actual,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RegistrarPagos);
