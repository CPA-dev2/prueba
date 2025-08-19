import React, { Component } from 'react';
import { Container, View } from "native-base";
import { Image, Dimensions } from 'react-native';
import styles from "./styles";
import { estilos } from "../../../utils/estilos";
import Navbar from "../../../container/NavbarContainer/NavbarContainer";
import ImageZoom from 'react-native-image-pan-zoom';


class ImageZoomer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    this.setState({dpi: ''});
  }

  render() {
    const { imagen, navigation } = this.props;
    return (
      <Container style={estilos.fondoBlanco}>
        <Navbar titulo={""} navigation={navigation} />
        <View style={styles.content}>
          <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={Dimensions.get('window').height}>
                <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, resizeMode: 'center'}}
                       source={imagen}/>
            </ImageZoom>
        </View>
      </Container>
    );
  }
}

export default ImageZoomer;
