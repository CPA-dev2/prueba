import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/login";
import Inicio from "../../stories/screens/Inicio/Inicio";


const ms2p = (state) => {
  return {
    ...state.login,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Inicio);
