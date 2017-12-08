import React, { PureComponent } from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";

export default class Navbar extends PureComponent {
	state = {};
	handleClick = (e, { name }) => this.setState({ activeItem: name });

	logOut = () => {
		this.props.onLogout();
	};

	render() {
		const { activeItem } = this.state;
		if (this.props.user[0] && this.props.user[0].loggedUser) {
			let user = this.props.user[0] ? this.props.user[0].loggedUser : null;

			return (
				<Menu fixed="top" inverted style={{ height: "45px" }}>
					<Menu.Item as={Link} to="/" header position="left">
						<Image size="tiny" src="/favicon.ico" style={{ marginTop: "20px" }} />
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
					<Menu.Item style={{ padding: "0" }}>
						<Dropdown
							item
							simple
							pointing="top right"
							text={user ? user.display_name : null}
							position="right"
							onClick={this.handleClick}>
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to={`/users/${user.id}`}>
									Profile
								</Dropdown.Item>
								<Dropdown.Item>Settings</Dropdown.Item>
								<Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu>
			);
		} else {
			return (
				<Menu fixed="top" inverted style={{ height: "45px" }}>
					<Menu.Item as={Link} to="/" header position="left">
						<Image size="tiny" src="/favicon.ico" style={{ marginTop: "20px" }} />
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
					<Menu.Item style={{ padding: "0" }}>
						<Dropdown item simple pointing="top right" text="Login">
							<Dropdown.Menu>
								<Dropdown.Item>
									<LoginComponent onSubmit={this.props.onSubmit} />
								</Dropdown.Item>
								<Dropdown.Item as={Link} to="/signup">
									Sign Up for CoderHive
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu>
			);
		}
	}
}
