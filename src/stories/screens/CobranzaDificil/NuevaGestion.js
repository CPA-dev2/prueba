import {
  Button,
  Container,
  Content,
  Item,
  Picker,
  Spinner,
  Text,
  Textarea,
  View,
} from "native-base";
import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./styles";
import { colors } from "../../../utils/colors";
import { Alert, Keyboard } from "react-native";
import { estilos } from "../../../utils/estilos";
import { validations } from "../../../utils/validation";

export class NuevaGestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nueva_gestion: {
        tipo_gestion: "10",
        detalle: "",
        solicitud: "",
      },
    };
    this.editarValor = this.editarValor.bind(this);
  }

  editarValor(key, value) {
    let nueva_gestion = this.state.nueva_gestion;
    nueva_gestion[key] = value;
    this.setState({ nueva_gestion: nueva_gestion });
  }

  render() {
    const { navigation, solicitud, loader } = this.props;
    return (
      <Container ref={(ref) => (this.scrollView = ref)}>
        <Navbar
          titulo={"Registrar Gestión"}
          conteo={0}
          navigation={navigation}
          regresar={() => navigation.goBack()}
        />
        <Content
          style={{
            backgroundColor: "white",
            padding: 10,
            borderTopColor: colors.Gris,
            borderTopWidth: 0.5,
          }}
        >
          <View style={{ paddingRight: 35, paddingLeft: 35, marginTop: 20 }}>
            <Text style={styles.label}>Tipo de Gestión</Text>
            <View style={{ ...styles.input, marginBottom: 10 }}>
              <Picker
                style={styles.picker}
                selectedValue={
                  this.state.nueva_gestion.tipo_gestion
                    ? this.state.nueva_gestion.tipo_gestion.toString()
                    : "10"
                }
                onValueChange={(itemValue, itemIndex) =>
                  this.editarValor("tipo_gestion", itemValue)
                }
              >
                <Picker.Item label="No localizado" value="10" />
                <Picker.Item label="Negociación" value="20" />
                <Picker.Item label="Incobrabilidad" value="50" />
              </Picker>
            </View>

            <View>
              <Text style={styles.label}>Detalle</Text>
              <Item style={styles.textArea}>
                <Textarea
                  value={this.state.nueva_gestion.detalle}
                  style={{ flex: 1 }}
                  multiline={true}
                  rowSpan={4}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onChangeText={(detalle) =>
                    this.editarValor("detalle", detalle)
                  }
                />
              </Item>
              <Text style={estilos.inputError}>
                {validations.required(this.state.nueva_gestion.detalle)}
              </Text>
            </View>

            <View padder>
              <Button
                style={styles.button}
                block
                disabled={this.state.nueva_gestion.detalle === ""}
                onPress={() => {
                  this.editarValor("solicitud", solicitud.id);
                  if (this.state.nueva_gestion.detalle == "") {
                    Alert.alert(
                      "INFORMACIÓN INCOMPLETA",
                      "Complete la información requerida."
                    );
                  } else {
                    this.props.guardarGestion(
                      this.state.nueva_gestion,
                      navigation
                    );
                  }
                  Keyboard.dismiss();
                }}
              >
                {loader && (
                  <Spinner color="#ffff" size={20} style={{ padding: 10 }} />
                )}
                <Text> Guardar</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default NuevaGestion;
