import { Dimensions } from "react-native";
import { colors } from "../../../../../utils/colors";

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
    // borderColor: colors.Gris,
    borderWidth: 2,
    padding: 3,
    paddingLeft: 15,
    backgroundColor: colors.Blanco,
    borderBottomColor: colors.Negro,
  },
  btn: {
    flex:1,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent:'center',
  },
  row:{
    flexDirection: 'row',
  },
  tittle:{
    textAlign: 'left',
    fontSize: 17,
    color: colors.Negro,
    fontWeight: 'bold',
    flex:1
  },
  texto:{
    textAlign: 'left',
    fontSize: 17,
    color: colors.Negro,
  },
  text_center:{
    textAlign: 'center',
  },
  encabezado:{
    paddingTop:15,
    fontSize: 20,
    color: colors.Negro,
    fontWeight: 'bold',
    paddingBottom:10,
    textAlign: 'center',
  },
  btn_azul: {
    marginTop: 20,
    backgroundColor: colors.Azul,
    borderRadius: 10,
  },
  btn_gris:{
     marginTop: 20,
    backgroundColor: colors.Gris,
    borderRadius: 10,
  },
  icono:{
    height: 150,
    width: 150,
    backgroundColor: colors.Blanco,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: colors.Blanco
  },
  avatar:{
    height: 72,
    width: 72,
    backgroundColor: colors.Blanco,
  },
  grupoAvatar:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Blanco,
  },
  lineaAvatar:{
    marginBottom: 7,
    marginTop: 7,
    backgroundColor: colors.Blanco,
  },
  textoAvatar:{
    color: colors.Azul,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 17,
  }
};
