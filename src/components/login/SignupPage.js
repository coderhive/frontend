import React, { PureComponent } from "react";
import SignupForm from "./SignupForm";
import Navbar from "../nav/Navbar";

export default class SignupPage extends PureComponent {
	render() {
		return (
			<div>
				<Navbar
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				<SignupForm handleSubmit={this.props.handleSignup} />
			</div>
		);
	}
}
