import { Dimensions } from "react-native";
import { colors } from "../../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = {
  shadow: {
    zIndex: -1,
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: 'stretch',
  },
  logo:{
    top: '30%',
    width: deviceWidth - (deviceWidth * 0.12),
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'center',
  },
  btn: {
    marginTop: 50,
    alignSelf: "center",
    backgroundColor: colors.Rojo,
    borderRadius: 10,
  },
  texto:{
    marginTop:'50%',
    fontSize: 20,
    color: colors.Rojo,
    textAlign:'center'
  }
};
export default styles;
