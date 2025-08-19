// @flow
import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
export interface Props {
	navigation: any,
}
export interface State {}
export default class SidebarContainer extends React.Component<Props, State> {
	render() {
    console.log(this);
    return <Sidebar navigation={this.props.navigation} />;
	}
}
