import { Dimensions } from "react-native";
import { colors } from "../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  shadow: {
    zIndex: -1,
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: 'stretch',
  },
  logo:{
    top: '15%',
    width: deviceWidth - (deviceWidth * 0.12),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'center',
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 5,
    borderRadius: 10,
    borderColor: colors.Gris,
    borderWidth: 2,
    padding: 3,
    paddingLeft: 15,
    backgroundColor: colors.Blanco,
  },
  btn: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors.Azul,
    borderRadius: 10,
  },
  form: {
    width: deviceWidth - (deviceWidth * 0.1),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  error:{
    color: colors.RojoDark,
    textAlign: "center",
  }
};
