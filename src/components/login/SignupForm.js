import React, { PureComponent } from "react";
import { Form, Message, Rail, Segment } from "semantic-ui-react";

export default class SignupForm extends PureComponent {
	state = {
		email: "",
		password: "",
		passwordCheck: "",
		submittedEmail: "",
		submittedPassword: "",
		errorPassword: false,
		errorLength: true,
		errorSymbol: true,
		errorNumber: true,
		errorCap: true,
		existingEmail: false
	};

	handleChange = async (e, { name, value }) => {
		console.log(this.state.passwordCheck);
		await this.setState({ [name]: value, errorPassword: false });

		if (/[0-9]/.test(this.state.password)) {
			this.setState({ errorNumber: false });
		}
		if (/[A-Z]/.test(this.state.password)) {
			this.setState({ errorCap: false });
		}
		if (this.state.password.length >= 6) {
			this.setState({ errorLength: false });
		}
		if (!/^[a-zA-Z0-9]*$/.test(this.state.password)) {
			this.setState({ errorSymbol: false });
		}
		if (/^[a-zA-Z0-9]*$/.test(this.state.password)) {
			this.setState({ errorSymbol: true });
		}
		if (this.state.password.length < 6) {
			this.setState({ errorLength: true });
		}
		if (!/[0-9]/.test(this.state.password)) {
			this.setState({ errorNumber: true });
		}
		if (!/[A-Z]/.test(this.state.password)) {
			this.setState({ errorCap: true });
		}
	};

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
				<Form onSubmit={this.handleSubmit} error>
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
							<Rail
								attached
								position="right"
								style={{
									height: "300px",
									display: "flex",
									justifyContent: "center",
									marginLeft: "20px"
								}}>
								<Segment style={{ fontSize: "15px", backgroundColor: "white", margin: "auto" }}>
									Your password must meet the following criteria:
									<div style={{ padding: "5px" }}>
										{this.state.errorLength
											? <li style={{ color: "red" }}>Must be at least 6 characters long</li>
											: <li style={{ color: "green" }}>Must be at least 6 characters long</li>}
										{this.state.errorSymbol
											? <li style={{ color: "red" }}>Must include a symbol (e.g. !@#$)</li>
											: <li style={{ color: "green" }}>Must include a symbol (e.g. !@#$)</li>}
										{this.state.errorNumber
											? <li style={{ color: "red" }}>Must include a number (e.g. 1234)</li>
											: <li style={{ color: "green" }}>Must include a number (e.g. 1234)</li>}
										{this.state.errorCap
											? <li style={{ color: "red" }}>
													Must include a capitalized letter (e.g. ABC)
												</li>
											: <li style={{ color: "green" }}>
													Must include a capitalized letter (e.g. ABC)
												</li>}
									</div>
								</Segment>
							</Rail>
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

					<Form.Button
						content="Join the Hive"
						className="SignupButton"
						disabled={
							this.state.password.length !== this.state.passwordCheck.length ||
							!this.state.passwordCheck
						}
					/>
					{this.state.errorPassword
						? <Message
								error
								header="Passwords do not match"
								content="Please re-enter your password"
							/>
						: null}
					{this.state.existingEmail
						? <Message error header="That email is already in use" />
						: null}
				</Form>
			</div>
		);
	}
}
