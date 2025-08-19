import React, { Component } from 'react';
import { Image } from 'react-native';
import styles from "./styles";
import { Container, Content, Header, Body, Title, Button, Text, View, Icon, Item, Input } from "native-base";

const background = require("../../../../../images/lock-background.png");
const logo = require("../../../../../images/lock.png");

class Blocked extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", passwod: ""};
  }
  render() {
    return (
      <Container>
        <View>
          <Image source={background} style={styles.shadow} />
          <Image source={logo} style={styles.logo} />
          <View padder>
            <Text style={styles.texto}>POR MOTIVOS DE SEGURIDAD ESTA CUENTA HA SIDO BLOQUEADA</Text>
          </View>
        </View>
      </Container>
    );
  }
}

export default  Blocked;
