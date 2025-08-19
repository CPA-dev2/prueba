import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/cobranza-dificil";
import RegistrarPago from '../../../stories/screens/CobranzaDificil/RegistrarPago/RegistrarPago';

const ms2p = (state) => {
  return {
    ...state.cobranza_dificil,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RegistrarPago);
