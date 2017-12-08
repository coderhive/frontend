import React, { PureComponent } from "react";
import SignupForm from "./SignupForm";
import Navbar from "../nav/Navbar";

export default class SignupPage extends PureComponent {
	render() {
		return (
			<div>
				<Navbar user={[]} />
				<SignupForm />
			</div>
		);
	}
}
