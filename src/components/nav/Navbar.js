// import React, { PureComponent } from "react";
// import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
// import DropDownMenu from "material-ui/DropDownMenu";
// import Menu from "material-ui/Menu";
// import MenuItem from "material-ui/MenuItem";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import * as Color from "material-ui/styles/colors";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
// import RaisedButton from "material-ui/RaisedButton";
// import Popover, { PopoverAnimationVertical } from "material-ui/Popover";
//
// const muiTheme = getMuiTheme({
// 	palette: {
// 		primary1Color: Color.cyan500,
// 		primary2Color: Color.cyan700,
// 		primary3Color: Color.grey400,
// 		accent1Color: Color.pinkA200,
// 		accent2Color: Color.grey100,
// 		accent3Color: Color.grey500,
// 		textColor: Color.darkBlack,
// 		alternateTextColor: Color.white,
// 		canvasColor: Color.white,
// 		borderColor: Color.grey300,
// 		pickerHeaderColor: Color.cyan500,
// 		shadowColor: Color.fullBlack
// 	},
// 	Toolbar: {
// 		height: 30
// 	}
// });
//
// export default class Navbar extends PureComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			open: false
// 		};
// 	}
//
// 	handleTouchTap = event => {
// 		event.preventDefault();
// 		this.setState({
// 			open: true,
// 			anchorEl: event.currentTarget
// 		});
// 	};
//
// 	handleRequestClose = () => {
// 		this.setState({
// 			open: false
// 		});
// 	};
//
// 	render() {
// 		return (
// 			<MuiThemeProvider muiTheme={muiTheme}>
// 				<Toolbar>
// 					<ToolbarGroup
// 						style={{
// 							width: "100%"
// 						}}>
// 						<ToolbarTitle text="CoderHive" />
// 						<RaisedButton
// 							style={{
// 								position: "relative",
// 								right: "10px"
// 							}}
// 							label="Hive"
// 							primary={true}
// 						/>
// 					</ToolbarGroup>
// 					<ToolbarGroup firstChild={true}>
// 						<RaisedButton
// 							style={{
// 								margin: "auto"
// 							}}
// 							onClick={this.handleTouchTap}
// 							label={`${this.props.user.display_name}`}
// 						/>
// 						<Popover
// 							open={this.state.open}
// 							anchorEl={this.state.anchorEl}
// 							anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
// 							targetOrigin={{ horizontal: "left", vertical: "top" }}
// 							onRequestClose={this.handleRequestClose}
// 							animation={PopoverAnimationVertical}>
// 							<Menu>
// 								<MenuItem primaryText="Profile" />
// 								<MenuItem primaryText="Logout" />
// 							</Menu>
// 						</Popover>
// 					</ToolbarGroup>
// 				</Toolbar>
// 			</MuiThemeProvider>
// 		);
// 	}
// }
