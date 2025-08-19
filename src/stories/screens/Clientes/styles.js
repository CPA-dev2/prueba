import { colors } from "../../../utils/colors";

export default {
  //Perfil
  topPerfil:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    paddingTop: 20,
    backgroundColor: colors.AzulClaro,
    borderBottomColor: colors.AzulBorde,
    borderBottomWidth: 1,
  },
  topDatos:{
    flexDirection: "row",
    marginTop: 10,
  },
  topSeccion:{
    flex: 1
  },
  topTitulo:{
    color: colors.Blanco,
    fontWeight: "bold",
    marginLeft: 5,
  },
  topInfo:{
    color: colors.Blanco,
    marginLeft: 15,
  },
  midPerfil:{
    backgroundColor: "#FFF",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    flexDirection: "column",
  },
  midDatos:{
    flexDirection: "row",
  },
  midSeccion:{
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.AzulBorde,
    padding: 5,
  },
  midTitulo: {
    color: colors.Blanco,
    fontWeight: "bold",
  },
  midInfo: {
    color: colors.Blanco,
    fontSize: 23,
    fontWeight: "100",
  },
  bottomPerfil:{
    padding: 15,
  },
  bottomEncabezado:{
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.Negro,
  },
  bottomDatos:{
    flexDirection: "row",
    marginBottom: 5,
  },
  bottomSeccion:{
    flexDirection: "column",
    flex: 1,
    paddingRight: 25,
  },
  bottomTitulo:{
    color: colors.Negro
  },
  bottomInfo:{
    color: colors.GrisDark,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gris,
  },
  image_shadow:{
    borderWidth: 0,
    borderRadius: 68,
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 75,
    elevation: 4,
  },
  image_perfil:{
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  //FinPerfil
  formulario:{
    paddingRight: 35,
    paddingLeft: 35,
  },
  contenedor:{
    alignItems: 'center',
    backgroundColor: colors.Blanco,
  },
  content:{
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },
  imagen:{
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cliente:{
    alignItems: 'center',
  },
  buscar: {
    color: colors.GrisDark,
    fontSize: 25,
    fontWeight: 'bold',
  },
  busqueda_container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.Gris
  },
  busqueda: {
    color: colors.GrisDark,
    fontSize: 30,
  },
  nombre: {
    color: colors.Negro,
  },
  direccion:{
    color: colors.Gris,
  },
  boton:{
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors.Azul,
    borderRadius: 10,
  },
  existente:{
    color: colors.Azul
  },
  boton_blanco:{
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors.Blanco,
    borderRadius: 10,
  },
  azul:{
    color: colors.Azul,
  },
  /*Creacion*/
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
  icono_sm:{
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    backgroundColor:'#ffffff',
  },
  avatar:{
    height: 72,
    width: 72,
  },
  grupoAvatar:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
  },
  lineaAvatar:{
    marginBottom: 7,
    marginTop: 7,
    backgroundColor:'#FFFFFF',
  },
  textoAvatar:{
    color: colors.Azul,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 17,
  }
};
