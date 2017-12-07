import React, { PureComponent } from "react";
import { Form, Message } from "semantic-ui-react";

export default class SignupForm extends PureComponent {
	state = {
		email: "",
		password: "",
		passwordCheck: "",
		submittedEmail: "",
		submittedPassword: "",
		errorPassword: false
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value, errorPassword: false });

	handleSubmit = () => {
		const { email, password, passwordCheck } = this.state;
		if (password === passwordCheck) {
			return this.setState({ submittedEmail: email, submittedPassword: password });
		}
		this.setState({ errorPassword: true });
	};

	render() {
		const { email, password, passwordCheck, submittedPassword, submittedEmail } = this.state;
		return (
			<div className="signupForm">
				<Form onSubmit={this.handleSubmit} error={this.state.errorPassword}>
					<div className="signupOne">
						<div className="honeyCombTopAngled" />
						<div
							className="honeyCombComponentAngled"
							style={{ display: "flex", alignItems: "center", flexFlow: "wrap" }}>
							<Form.Input
								required
								placeholder="Email"
								name="email"
								value={email}
								onChange={this.handleChange}
								size="small"
							/>
						</div>
						<div className="honeyCombBottomAngled" />
					</div>
					<div className="signupTwo">
						<div className="honeyCombTopAngled" />
						<div
							className="honeyCombComponentAngled"
							style={{ display: "flex", alignItems: "center" }}>
							<Form.Input
								error={this.state.errorPassword}
								required
								type="password"
								placeholder="Password"
								name="password"
								value={password}
								onChange={this.handleChange}
								size="small"
							/>
						</div>
						<div className="honeyCombBottomAngled" />
					</div>
					<div className="signupThree">
						<div className="honeyCombTopAngled" />
						<div
							className="honeyCombComponentAngled"
							style={{ display: "flex", alignItems: "center" }}>
							<Form.Input
								error={this.state.errorPassword}
								required
								placeholder="Confirm Password"
								type="password"
								name="passwordCheck"
								value={passwordCheck}
								onChange={this.handleChange}
								size="small"
							/>
						</div>
						<div className="honeyCombBottomAngled" />
					</div>

					<Form.Button content="Join the Hive" className="SignupButton" />
					<Message error header="Password does not match" content="Please re-enter your password" />
				</Form>
			</div>
		);
	}
}
