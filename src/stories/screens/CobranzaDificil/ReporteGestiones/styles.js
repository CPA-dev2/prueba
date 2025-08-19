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
    fontWeight: "bold",
  },
  picker: {
    textDecorationLine: "underline",
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
  text_info: {
    color: colors.GrisDark,
    fontSize: 13,
  },
  styles_date_picker: {
    dateTouchBody: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    dateInput: {
      borderWidth: 0,
    },
    dateText: {
      color: '#515151',
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    placeholderText: {
      color: '#515151',
      alignItems: 'flex-start',
      marginLeft:20,
    },
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    }
  }
};


