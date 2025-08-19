import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Item,
  Body,
  Right,
  List,
  ListItem,
  Icon,
  Toast,
  View, Spinner
} from "native-base";
import { Image, TouchableHighlight } from 'react-native';
import { estilos } from "../../../utils/estilos";
import { colors } from "../../../utils/colors";
import styles from "./styles";

export interface Props {
  navigation: any;
  titulo: string;
}

export interface State {}
class Navbar extends React.Component<Props, State> {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    if (this.props.getUris !== undefined){
      this.props.getUris();
    }
  }
  render() {
    const { regresar, imagen, cerrar, conteo } = this.props;
    return (
      <Header style={estilos.navbar}>
        <Button style={{...styles.boton, flex: 1}} transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
          <Image style={styles.image} source={ require('../../../../images/logo-ico.png') } />
        </Button>
        {conteo !== 0 ? (
          <Item><Text style={{fontSize: 12}}>Subiendo {conteo} imagenes, por favor no cierre el app</Text></Item>
        ) : (
          <Title style={{flex:4, alignSelf: "center", color: colors.Negro}}>{this.props.titulo}</Title>
        )}
        {imagen && (
          <Button style={styles.boton} transparent onPress={() => cerrar()}>
            <Image style={styles.extra} source={imagen}/>
          </Button>
        )}
        <Button style={{...styles.boton, flex: 1}} transparent onPress={() => (regresar !== undefined) ? regresar() : this.props.navigation.goBack()}>
          <Image style={styles.atras} source={ require('../../../../images/arrow-left-solid.png') } />
        </Button>
      </Header>
    );
  }
}

export default Navbar;
