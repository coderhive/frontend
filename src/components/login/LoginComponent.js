import React, { PureComponent } from "react";
import { Button, Form } from "semantic-ui-react";

export default class LoginComponent extends PureComponent {
	handleSubmit = () => {};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Input label="Email" placeholder="Email" />
				<Form.Input label="Password" placeholder="Password" />
				<Button type="submit">Login</Button>
			</Form>
		);
	}
}
