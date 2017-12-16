import React, { PureComponent } from "react";
import { Form, Message, Rail, Segment } from "semantic-ui-react";

export default class SignupForm extends PureComponent {
	state = {
		email: "",
		password: "",
		passwordCheck: "",
		errorPassword: false,
		errorLength: true,
		errorNumber: true,
		errorCap: true,
		existingEmail: false
	};

	handleChange = async (e, { name, value }) => {
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

	handleSubmit = async () => {
		const { email, password, passwordCheck } = this.state;

		if (password === passwordCheck) {
			const display_name = email.match(/[^@$]*/i)[0];
			let response = await this.props.mutate({
				variables: {
					email,
					password,
					display_name,
					profile_picture: "https://s3-us-west-1.amazonaws.com/coderhive/default.jpg"
				}
			});
			this.props.history.push(`/users`);
		} else {
			this.setState({ errorPassword: true });
		}
	};

	render() {
		const { email, password, passwordCheck } = this.state;
		return (
			<div className="signupForm">
				<Form onSubmit={this.handleSubmit} error>
					<div className="signupOne">
						<div className="honeyCombTopAngled" style={{ borderRight: "86.6px solid #FFE600" }} />
						<div
							className="honeyCombComponentAngled"
							style={{
								display: "flex",
								alignItems: "center",
								flexFlow: "wrap",
								backgroundColor: "#FFE600"
							}}>
							<Form.Input
								required
								placeholder="Email"
								name="email"
								value={email}
								onChange={this.handleChange}
								size="small"
							/>
						</div>
						<div className="honeyCombBottomAngled" style={{ borderLeft: "86.6px solid #FFE600" }} />
					</div>
					<div className="signupTwo">
						<div className="honeyCombTopAngled" style={{ borderRight: "86.6px solid #EEC900" }} />
						<div
							className="honeyCombComponentAngled"
							style={{ display: "flex", alignItems: "center", backgroundColor: "#EEC900" }}>
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
								<Segment style={{ fontSize: "15px", backgroundColor: "#FEF1B5", margin: "auto" }}>
									Your password must meet the following criteria:
									<div style={{ padding: "5px" }}>
										{this.state.errorLength
											? <li style={{ color: "gray" }}>Must be at least 6 characters long</li>
											: <li style={{ color: "green" }}>Must be at least 6 characters long</li>}
										{this.state.errorNumber
											? <li style={{ color: "gray" }}>Must include a number (e.g. 1234)</li>
											: <li style={{ color: "green" }}>Must include a number (e.g. 1234)</li>}
										{this.state.errorCap
											? <li style={{ color: "gray" }}>
													Must include a capitalized letter (e.g. ABC)
												</li>
											: <li style={{ color: "green" }}>
													Must include a capitalized letter (e.g. ABC)
												</li>}
									</div>
								</Segment>
							</Rail>
						</div>
						<div className="honeyCombBottomAngled" style={{ borderLeft: "86.6px solid #EEC900" }} />
					</div>
					<div className="signupThree">
						<div className="honeyCombTopAngled" style={{ borderRight: "86.6px solid #FFC125" }} />
						<div
							className="honeyCombComponentAngled"
							style={{ display: "flex", alignItems: "center", backgroundColor: "#FFC125" }}>
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
						<div className="honeyCombBottomAngled" style={{ borderLeft: "86.6px solid #FFC125" }} />
					</div>

					<Form.Button
						inverted
						color="yellow"
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
