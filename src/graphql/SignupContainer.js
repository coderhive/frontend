import SignupPage from "../components/login/SignupPage";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const createUser = gql`
	mutation($email: String!, $password: String!, $display_name: String!) {
		createUser(email: $email, password: $password, display_name: $display_name) {
			id
			display_name
			email
		}
	}
`;

export default compose(withRouter, graphql(createUser))(SignupPage);
