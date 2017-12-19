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
			status
		}
	}
`;

export default compose(withRouter, graphql(usersAndComponents))(HivePage);
