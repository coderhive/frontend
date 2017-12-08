import SignupPage from "../components/login/SignupPage";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

let createUser = async () => {
	const { email, password, display_name } = this.state;

	try {
		const response = await this.props.createUser({ variables: { email, password, display_name } });

		this.props.history.push("/");
	} catch (e) {
		console.error("An error occured: ", e);
		this.props.history.push("/");
	}
};

const signupUser = gql`
	mutation createUser($email: String!, $password: String!, $display_name: String!) {
		createUser(email: $email, password: $password, display_name: $display_name) {
			id
			display_name
			email
		}
	}
`;

const loggedUser = gql`
	query($id: Int!) {
		loggedUser(id: $id) {
			id
			display_name
		}
	}
`;

export default compose(
	withRouter,
	graphql(signupUser, {
		name: "createUser",
		options: props => ({
			skip: !props.email || !props.password || !props.display_name,
			variables: {
				email: props.email,
				password: props.password,
				display_name: props.display_name
			}
		})
	}),
	graphql(loggedUser, {
		name: "loggedUser",
		options: props => ({
			skip: !props.authenticatedId,
			variables: {
				id: props.authenticatedId
			}
		})
	})
)(SignupPage);
