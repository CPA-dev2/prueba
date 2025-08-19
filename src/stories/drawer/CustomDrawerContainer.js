import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/imagenes";
import CustomDrawerContentComponent from "./CustomDrawerContentComponent";


const ms2p = (state) => {
  return {
    ...state.login,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CustomDrawerContentComponent);
