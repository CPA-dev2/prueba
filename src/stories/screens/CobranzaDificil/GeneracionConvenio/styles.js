import { Dimensions } from "react-native";
import { colors } from "../../../../utils/colors";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  text_center: {
    fontSize: 15,
    padding: 0,
    color: colors.Negro,
    fontWeight: "bold",
    textAlign: "center",
  },
  text_gray: {
    color: colors.Gris,
    textAlign: "center",
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
  picker: {
    textDecorationLine: "underline",
    height:35,
    width:"100%",
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
    paddingRight: 35,
    paddingLeft: 35,
    marginTop: 20,
    marginBottom: 10,
  }
};
