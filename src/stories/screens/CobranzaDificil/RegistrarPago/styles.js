import { Dimensions } from "react-native";
import { colors } from "../../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  input: {
    borderBottomColor: colors.Negro,
    marginBottom: 10,
    borderBottomWidth: 1,
    height: 35,
    justifyContent: "center",
  },
  label: {
    color: colors.Gris,
    fontSize: 14,
    fontWeight: 'bold',
  },
  picker:{
    textDecorationLine: 'underline'
  },
  textArea:{
    borderBottomColor: colors.Negro,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.Negro,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors.Azul,
    borderRadius: 10,
  },
  content: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: colors.Gris,
    borderTopWidth: 0.5,
  },
  principal_view: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  btn_payments: {
    backgroundColor: colors.Blanco,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.Azul,
    flex:1,
    marginBottom:10
  },
  btn_payments_2: {
    backgroundColor: colors.Naranja,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.Naranja,
    flex:1,
    marginBottom:10
  },
  icono: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginLeft:20,
  },
  row:{
    flexDirection: 'row',
  },
};