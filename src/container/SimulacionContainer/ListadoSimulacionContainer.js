import { connect } from 'react-redux';
import { actions } from "../../reducers/modules/simulacion";
import ListadoSimulacion from "../../stories/screens/Simulacion/ListadoSimulacion";


const ms2p = (state) => {

  return {
    ...state.simulacion,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListadoSimulacion);
