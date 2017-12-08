import EditorPanes from "../components/editor/EditorPanes";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const oneComponent = gql`
	query($id: Int!) {
		oneComponent(id: $id) {
			id
			title
			description
			framework
			owner_user_id
			owner {
				id
				display_name
				experience
			}
			fans {
				id
				display_name
			}
			votes {
				id
				vote
				display_name
			}
			tags {
				id
				name
			}
			comments {
				id
				comment
			}
			score
			updated_at
			created_at
		}
	}
`;

export default compose(
	withRouter,
	graphql(oneComponent, {
		options: props => ({
			variables: {
				id: props.componentId
			}
		})
	})
)(EditorPanes);
