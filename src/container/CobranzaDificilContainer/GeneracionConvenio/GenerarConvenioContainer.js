import { connect } from 'react-redux';
import { actions } from "../../../reducers/modules/cobranza-dificil";
import GenerarConvenio from "../../../stories/screens/CobranzaDificil/GeneracionConvenio/GenerarConvenio";

const ms2p = (state) => {
  return {
    ...state.cobranza_dificil,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(GenerarConvenio);
