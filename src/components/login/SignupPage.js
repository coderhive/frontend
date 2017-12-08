import React, { PureComponent } from "react";
import SignupForm from "./SignupForm";
import NavbarContainer from "../../graphql/NavbarContainer";

export default class SignupPage extends PureComponent {
	render() {
		console.log(this.props.client.readQuery({}));
		return (
			<div>
				<NavbarContainer
					authenticatedId={this.props.authenticatedId}
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				<SignupForm mutate={this.props.mutate} />
			</div>
		);
	}
}
