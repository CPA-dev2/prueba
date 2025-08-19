import { Dimensions } from "react-native";
import { colors } from "../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {

  logo:{
    top: '15%',
    width: deviceWidth - (deviceWidth * 0.12),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'center',
  },
  input: {
    borderBottomColor: colors.Negro,
    marginBottom: 15,
    borderBottomWidth: 1,
    height: 35,
    justifyContent: "center",
  },
  btn: {
    flex:1,
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
    flex:1,
    paddingBottom:5
  },
  texto:{
    fontSize: 17,
    paddingBottom:15,
    paddingTop:5,
    color: colors.Negro,
    flex:1,
    paddingLeft: 15,
  },
  text_center:{
    textAlign: 'center',
    paddingBottom:10,
    color: colors.Gris,
    fontWeight: 'bold',
  },
  encabezado:{
    paddingTop:15,
    textAlign: 'left',
    fontSize: 20,
    color: colors.Negro,
    fontWeight: 'bold',
    paddingBottom:10
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
    resizeMode: 'stretch',
  },
  icono_sm:{
    height: 25,
    width: 25,
    backgroundColor: colors.Blanco,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.Blanco
  },
  text_gray:{
    color: colors.Gris,
     textAlign: 'center',
  },
  line:{
    marginBottom: 5,
    marginTop:10,
    borderColor: colors.Gris,
    borderWidth: .70,
  },
  avatar:{
    height: 62,
    width: 62,
    borderRadius: 50,
    backgroundColor: colors.Blanco,
  },
  textArea:{
    borderWidth: 1,
    borderColor: colors.Negro,
  },
  picker:{
    textDecorationLine: 'underline',
    height:35,
    width:"100%",
  },
};
