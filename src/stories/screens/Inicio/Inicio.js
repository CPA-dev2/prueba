import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./styles";
import { colores } from "../../../utils/colors";
import {
  Container,
  Spinner,
  Button,
  Text,
  View,
  Icon,
  Item,
  Input,
  Content,
} from "native-base";

const background = require("../../../../images/login.png");
const logo = require("../../../../images/logotipo.png");
const PIN_LENGTH = 6;

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      code: "",
      length_error: false
    };
  }


  componentWillMount() {
    this.props.initialLoad();
    this.setState({ username: "", password: "", length_error: false });
  }
  render() {
    const {
      navigation,
      submitError,
      loader,
      smsError,
      phone_number,
      user_id,
      verify_loader,
      sms_fail
    } = this.props;
    return (
      <Container>
        <Content style={{ backgroundColor: "white" }}>
          <View>
            <Image source={logo} style={styles.logo} />

            {!phone_number && !user_id ? (
              <React.Fragment>
                <View style={styles.form}>
                  <View style={styles.input}>
                    <Item>
                      <Icon style={colores.gris} name="person" />
                      <Input
                        placeholder="Usuario"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(username) => this.setState({ username })}
                      />
                    </Item>
                  </View>
                  <View style={styles.input}>
                    <Item>
                      <Icon style={colores.gris} name="unlock" />
                      <Input
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        onSubmitEditing={() => {
                          this.props.login(this.state, navigation);
                        }}
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password })}
                      />
                    </Item>
                  </View>
                </View>
                {submitError && (
                  <Text style={styles.error}>
                    Datos incorrectos, verifique y vuelva a intentar
                  </Text>
                )}
                {smsError && (
                  <Text style={styles.error}>
                    Error al enviar el código por SMS, por favor inténtelo más
                    tarde.
                  </Text>
                )}
                <View padder>
                  <Button
                    style={styles.btn}
                    block
                    onPress={() => this.props.login(this.state, navigation)}
                  >
                    {loader && (
                      <Spinner color="#fff" size={20} style={{ padding: 10 }} />
                    )}
                    <Text>Iniciar Sesión</Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : null}
            {phone_number && user_id ? (
              <React.Fragment>
                <View style={styles.form}>
                  <View  style={{display: 'flex', flexDirection: 'column', marginTop: 15, marginBottom: 5}}>
                    <Text>
                      Se le acaba de enviar un código via SMS a:
                      <Text style={{fontWeight: 'bold'}}>{phone_number}</Text>.
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Item>
                      <Icon
                        style={colores.gris}
                        type="Ionicons"
                        name="calculator"
                      />
                      <Input
                        placeholder="Código"
                        autoCapitalize="none"
                        keyboardType={"numeric"}
                        onChangeText={(code) => {
                          if (code.length == 6) {
                            this.setState({ length_error: false });
                            const data = {
                              user: this.props.user_id,
                              code: code,
                              pass_reset: this.props.pass_reset1,
                            };
                            this.props.verifyCode(data, navigation);
                          } else {
                            this.setState({ length_error: true });
                          }
                        }}
                      />
                    </Item>
                  </View>
                </View>
                {this.state.length_error && (
                  <Text style={styles.error}>
                    El código debe tener 6 dígitos.
                  </Text>
                )}
                {sms_fail && (
                  <Text style={styles.error}>
                    Código inválido, por favor ingreselo de nuevo.
                  </Text>
                )}
                <View padder>
                  <Button
                    onPress={() => {
                      if (this.state.code.length == 6) {
                        this.setState({ length_error: false });
                        const data = {
                          user: this.props.user_id,
                          code: this.state.code,
                          pass_reset: this.props.pass_reset1,
                        };
                        this.props.verifyCode(data, navigation);
                      } else {
                        this.setState({ length_error: true });
                      }
                    }}
                    style={styles.btn}
                    block
                  >
                    {verify_loader && (
                      <Spinner color="#fff" size={20} style={{ padding: 10 }} />
                    )}
                    <Text>Validar</Text>
                  </Button>
                </View>
              </React.Fragment>
            ) : null}
            <Image source={background} style={styles.shadow} />
          </View>
        </Content>
      </Container>
    );
  }
}

export default Inicio;
