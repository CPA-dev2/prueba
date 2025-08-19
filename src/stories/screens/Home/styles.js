import { StyleSheet } from "react-native";
import {colors} from "../../../utils/colors";

export default {
  boton:{
    width: 60,
    justifyContent: "center"
  },
  image:{
    width: 44,
    height: 44,
    resizeMode: 'stretch',
  },
  elemento_menu: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
  },
  boton_menu:{
    flex:1,
    justifyContent: "center",
  },
  c_boton_menu:{
    alignItems: "center",
  },
  image_menu:{
    resizeMode: 'stretch',
    width: 100,
    height: 100,
  },
  image_shadow:{
    borderWidth: 0,
    borderRadius: 50,
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 55,
    elevation: 5,
  },
  texto_menu: {
    color: colors.Gris,
    fontSize: 25,
  },
  container: {
    backgroundColor: "#FBFAFA",
  },
  row: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  mt: {
    marginTop: 18,
  },
};
