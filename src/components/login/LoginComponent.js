import React, { PureComponent } from "react";
import { Button, Form } from "semantic-ui-react";

export default class LoginComponent extends PureComponent {
	handleSubmit = () => {};

	render() {
		return (
			<Form unstackable onSubmit={this.handleSubmit}>
				<Form.Group widths={1}>
					<Form.Input label="Email" placeholder="Email" />
					<Form.Input label="Password" placeholder="Password" />
				</Form.Group>
				<Button type="submit">Login</Button>
			</Form>
		);
	}
}
