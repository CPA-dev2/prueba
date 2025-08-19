import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/passReset";
import PassReset from "../../stories/screens/Inicio/PassReset/PassReset";


const ms2p = (state) => {
  return {
    ...state.passReset,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(PassReset);
