import React, { PureComponent } from "react";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import RaisedButton from "material-ui/RaisedButton";

const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500
	},
	Toolbar: {
		height: 30
	}
});

export default class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<Toolbar>
					<ToolbarGroup>
						<DropDownMenu value={null}>
							<MenuItem primaryText="logout" />
							<MenuItem primaryText="profile" />
						</DropDownMenu>
					</ToolbarGroup>
					<ToolbarTitle text="Hive" />
				</Toolbar>
			</MuiThemeProvider>
		);
	}
}
