import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/clientes";
import ImageZoom from "../../stories/screens/ImageZoom/ImageZoom";


const ms2p = (state) => {
  return {
    ...state.imagenes,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ImageZoom);
