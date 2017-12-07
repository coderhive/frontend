import React, { PureComponent } from "react";
import { Form } from "semantic-ui-react";

export default class SignupForm extends PureComponent {
	state = {
		email: "",
		password: "",
		passwordCheck: "",
		submittedEmail: "",
		submittedPassword: ""
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	handleSubmit = () => {
		const { email, password } = this.state;
		this.setState({ submittedEmail: email, submittedPassword: password });
	};

	render() {
		const { email, password, passwordCheck, submittedPassword, submittedEmail } = this.state;
		return (
			<div className="signupForm">
				<Form onSubmit={this.handleSubmit}>
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
								required
								placeholder="Re-enter Password"
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
				</Form>
			</div>
		);
	}
}
