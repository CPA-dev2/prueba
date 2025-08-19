import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/fcm";
import { getUris } from "../../reducers/modules/imagenes";
import Navbar from "../../stories/screens/Navbar/Navbar";


const ms2p = (state) => {
  const conteo = state.imagenes.conteo;
  return {
    ...state.fcm,
    conteo,
  };
};

const md2p = { ...actions, getUris };

export default connect(ms2p, md2p)(Navbar);
