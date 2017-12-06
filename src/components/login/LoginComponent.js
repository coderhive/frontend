import React, { PureComponent } from "react";
import { Button, Form } from "semantic-ui-react";

export default class LoginComponent extends PureComponent {
	handleSubmit = event => {
		event.preventDefault();
		const { email, password } = event.target;
		this.props.onSubmit({
			email: email.value.trim(),
			password: password.value.trim(),
			history: this.props.history
		});
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Input label="Email" placeholder="Email" name="email" required />
				<Form.Input
					label="Password"
					placeholder="Password"
					name="password"
					type="password"
					required
				/>
				<Button type="submit">Login</Button>
			</Form>
		);
	}
}
