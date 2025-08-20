import * as React from "react";
import { Image, Platform } from "react-native";
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonText,
  Icon,
  VStack,
  Center,
  HStack,
} from "@gluestack-ui/themed";
import { Flash } from "lucide-react-native";

export interface Props {
  loginForm: any,
  onLogin: Function,
}
export interface State {}
class Login extends React.Component<Props, State> {
  render() {
    return (
      <Box flex={1}>
        <Center h={200} bg="$primary500">
          <Icon as={Flash} size="xl" color="$white" />
          <Heading color="$white">PrendaCreditoAvanza.com</Heading>
          <Box p="$4">
            <Text color={Platform.OS === "ios" ? "$black" : "$white"}>
              Build Something Amazing
            </Text>
          </Box>
        </Center>
        <Box>
          {this.props.loginForm}
          <Box p="$4">
            <Button onPress={() => this.props.onLogin()}>
              <ButtonText>INICIAR</ButtonText>
            </Button>
          </Box>
        </Box>
        <Box bg="$trueGray200" p="$4">
          <Center>
            <HStack>
              <Text color="$black">Made with love at </Text>
              <Image
                source={{ uri: "https://geekyants.com/images/logo-dark.png" }}
                style={{ width: 422 / 4, height: 86 / 4 }}
                alt="GeekyAnts"
              />
            </HStack>
          </Center>
        </Box>
      </Box>
    );
  }
}

export default Login;
