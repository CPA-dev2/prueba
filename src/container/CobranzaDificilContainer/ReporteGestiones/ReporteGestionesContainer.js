import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/cobranza-dificil";
import ReporteGestiones from '../../../stories/screens/CobranzaDificil/ReporteGestiones/ReporteGestiones';

const ms2p = (state) => {
  const user = state.login.user;
  return {
    ...state.cobranza_dificil,
    user,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReporteGestiones);
