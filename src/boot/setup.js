import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";
import {Component} from "react";
export interface Props {}
export interface State {
  store: Object;
  isLoading: boolean;
}
function setup():React.Component{
  if (__DEV__){
    // const bakXHR = global.XMLHttpRequest;
    // const bakFormData = global.FormData;
    global.XMLHttpRequest = global.originalXMLHttpRequest ?
      global.originalXMLHttpRequest :
      global.XMLHttpRequest;
    global.FormData = global.originalFormData ?
      global.originalFormData :
      global.FormData;
  }
  class Root extends Component<Props, State>{
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false }))
      };
    }

    render() {
      if (this.state.isLoading) return null;
      return (
        <StyleProvider style={getTheme(variables)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      );
    }
  }
  return Root;
}

export default setup;
//
// export default class Setup extends React.Component<Props, State> {
//     constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       store: configureStore(() => this.setState({ isLoading: false }))
//     };
//   }
//
//   render() {
//     return (
//       <StyleProvider style={getTheme(variables)}>
//         <Provider store={this.state.store}>
//           <App />
//         </Provider>
//       </StyleProvider>
//     );
//   }
// }
