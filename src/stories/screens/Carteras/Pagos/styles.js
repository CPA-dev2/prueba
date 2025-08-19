import { colors } from "../../../../utils/colors";


export default {
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
    fontSize: 15,
    paddingBottom:15,
    paddingTop:5,
    color: colors.Negro,
    flex:1,
    paddingLeft: 10,
     textAlign: 'center',
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

  btn_blanco_azul: {
    backgroundColor: colors.Blanco,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.Azul,
    flex:1,
    // marginLeft:30,
    marginBottom:10
  },

  icono:{
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginLeft:20,
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
  borde: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.Gris
  },
  principal_view: {
    paddingRight: 35,
    paddingLeft: 35,
    marginTop: 20,
    marginBottom: 10,
  }
};
