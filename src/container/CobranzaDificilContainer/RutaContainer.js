import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/cobranza-dificil";
import Ruta from "../../stories/screens/CobranzaDificil/Ruta";
import { irPorDPI } from "../../reducers/modules/clientes";


const ms2p = (state) => {
  return {
    ...state.cobranza_dificil,
  };
};

const md2p = { ...actions, irPorDPI };

export default connect(ms2p, md2p)(Ruta);
