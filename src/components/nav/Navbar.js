import React, { PureComponent } from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginComponent from "../login/LoginComponent";

export default class Navbar extends PureComponent {
	logOut = () => {
		this.props.onLogout();
	};

	render() {
		if (this.props.data) {
			let user = this.props.data.loggedUser;
			if (this.props.data.loading) {
				return <div>Loading...</div>;
			}
			return (
				<Menu fixed="top" inverted style={{ height: "45px" }}>
					<Menu.Item as={Link} to="/" header position="left">
						<Image size="tiny" src="/favicon.ico" style={{ marginTop: "20px" }} />
						CoderHive
					</Menu.Item>
					{this.props.data.loggedUser ?
					<Menu.Item as={Link} to="/components/new" header position="right">
						New Component
					</Menu.Item>
					:
						null
					}
					<Menu.Item style={{ padding: "0" }}>
						<Dropdown item simple text="Hive" position="right">
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to={`/users`} active={this.props.match.path === "/users"}>
									Users
								</Dropdown.Item>
								<Dropdown.Item
									as={Link}
									to={`/components`}
									active={this.props.match.path === "/components"}>
									Components
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
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
					<Menu.Item style={{ padding: "0" }}>
						<Dropdown item simple text="Hive" position="right">
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to={`/users`} active={this.props.match.path === "/users"}>
									Users
								</Dropdown.Item>
								<Dropdown.Item
									as={Link}
									to={`/components`}
									active={this.props.match.path === "/components"}>
									Components
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
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
