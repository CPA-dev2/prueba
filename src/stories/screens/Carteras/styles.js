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
  tab:{
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor:"#1E78C2",
  },
  active_tab:{
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor:"#2269A3",
    borderBottomColor: "#C53819",
    borderBottomWidth: 2,
  },
  texto:{
    color: "#FFF",
  },
  padding10:{
    padding: 10,
  },
  text_gray:{
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
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
  },
  appellidos:{
    color: colors.AzulClaro,
    fontSize: 14,
  },
  nombres:{
    color: colors.AzulClaro,
    fontSize: 14,
  },
  circle: {
    borderRadius: 20 / 2,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  borde: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.Gris
  },
  picker:{
    textDecorationLine: 'underline',
    height:35,
    width:"100%",
  }
};
