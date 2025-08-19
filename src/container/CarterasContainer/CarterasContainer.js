import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/cartera";
import { irPorDPI, cobroIrDPI } from "../../reducers/modules/clientes";
import Carteras from "../../stories/screens/Carteras/Carteras";


const ms2p = (state) => {
  const user = state.login.user;
  return {
    ...state.cartera,
    user,
  };
};

const md2p = { ...actions, irPorDPI, cobroIrDPI };

export default connect(ms2p, md2p)(Carteras);
