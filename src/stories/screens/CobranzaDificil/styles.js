import { Dimensions } from "react-native";
import { colors } from "../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  row_data: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "white",
    borderWidth: 0,
  },
  col_data: {
    flexDirection: "column",
    width: "50%"
  },
  cliente: {
    color: colors.Naranja,
    fontSize: 14,
    fontWeight: "bold",
  },
  text_info: {
    color: colors.GrisDark,
    fontSize: 13,
  },
  text_center:{
    fontSize: 15,
    padding: 0,
    color: colors.Negro,
    fontWeight: 'bold',
    textAlign: 'center'
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
  text_gray:{
    color: colors.Gris,
    textAlign: 'center',
  },
  titulo_nombre:{
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
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
    borderBottomWidth: 1,
    borderTopWidth: 0.0,
    borderColor: colors.Gris
  },
  label: {
    color: colors.Gris,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: colors.Negro,
    marginBottom: 10,
    borderBottomWidth: 1,
    height: 35,
    justifyContent: "center",
  },
  referencia: {
    borderBottomColor: colors.Negro,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  picker:{
    textDecorationLine: 'underline',
    height:35,
    width:"100%",
  },
  titulo:{
    color: colors.Gris,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitulo:{
    color: colors.Negro,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
  },
  textArea:{
    borderBottomColor: colors.Negro,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.Negro,
  },
  button:{
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors.Azul,
    borderRadius: 10,
  },
};
