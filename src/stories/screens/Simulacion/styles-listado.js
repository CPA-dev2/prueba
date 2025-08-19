import { Dimensions } from "react-native";
import { colors } from "../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  text_center:{
    fontSize: 15,
    padding: 10,
    color: colors.Negro,
    fontWeight: 'bold',
  },
  text_gray:{
    padding: 10,
    color: colors.Gris,
    textAlign: 'center',
  },
  ojo: {
    padding: 10,
    width: 30,
    height: 30,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  titulo_nombre:{
    padding: 10,
  },
  appellidos:{
    color: colors.Gris,
  },
  nombres:{
    color: colors.Gris,
  },
};
