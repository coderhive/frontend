import React, { PureComponent } from "react";
import { Dropdown, Image, Menu, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Navbar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		};
	}
	handleClick = (e, { name }) => this.setState({ activeItem: name });
	render() {
		const { activeItem } = this.state;

		return (
			<Menu fixed="top" inverted style={{ marginBottom: "10em" }}>
				<Menu.Item as={Link} to="/" header position="left">
					<Image size="mini" src="/favicon.ico" />
					CoderHive
				</Menu.Item>
				<Menu.Item
					as={Link}
					to="/hive"
					position="right"
					name="hive"
					active={activeItem === "hive"}
					onClick={this.handleClick}>
					Hive
				</Menu.Item>

				<Dropdown
					item
					simple
					text={this.props.user.display_name}
					position="right"
					onClick={this.handleClick}>
					<Dropdown.Menu>
						<Dropdown.Item>Profile</Dropdown.Item>
						<Dropdown.Item>Settings</Dropdown.Item>
						<Dropdown.Item>Logout</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu>
		);
	}
}
