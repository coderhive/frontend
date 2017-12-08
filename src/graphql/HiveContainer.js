import HivePage from "../components/hive/HivePage";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const usersAndComponents = gql`
	query {
		allUsers {
			id
			display_name
			profile_picture
			status
			experience
			created_at
			summary
		}
		allComponents {
			id
			created_at
			title
			description
			component_picture
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
	graphql(loggedUser, {
		name: "loggedUser",
		options: props => ({
			skip: !props.authenticatedId,
			variables: {
				id: props.authenticatedId
			}
		})
	}),
	graphql(usersAndComponents)
)(HivePage);
