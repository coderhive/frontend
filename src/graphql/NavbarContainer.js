import Navbar from "../components/nav/Navbar";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

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
	graphql(loggedUser, {
		options: props => ({
			skip: !props.authenticatedId,
			variables: {
				id: props.authenticatedId
			}
		})
	})
)(Navbar);
