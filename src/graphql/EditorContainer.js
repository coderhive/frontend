import EditorPanes from "../components/editor/EditorPanes";
import { graphql, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const oneComponent = gql`
	query($id: Int!) {
		oneComponent(id: $id) {
			id
			title
			description
			status
			code
			css
			framework
			owner_user_id
			owner {
				id
				display_name
				experience
				status
				profile_picture
				created_at
			}
			fans {
				id
				display_name
				user_id
			}
			votes {
				id
				vote
				user_id
				display_name
			}
			tags {
				id
				name
			}
			comments {
				id
				comment
				display_name
				profile_picture
				user_id
				created_at
			}
			score
			updated_at
			created_at
		}
	}
`;

const deleteComponent = gql`
	mutation($id: Int!) {
		deleteComponent(id: $id) {
			id
		}
	}
`;

const updateComponentCode = gql`
	mutation($id: Int!, $code: String, $css: String) {
		updateComponent(id: $id, code: $code, css: $css) {
			id
			code
			css
		}
	}
`;

const createComment = gql`
	mutation($user_id: Int!, $component_id: Int!, $comment: String!) {
		createComment(user_id: $user_id, component_id: $component_id, comment: $comment) {
			id
		}
	}
`;

const createVote = gql`
	mutation($user_id: Int!, $component_id: Int!, $vote: Int!) {
		createVote(user_id: $user_id, component_id: $component_id, vote: $vote) {
			id
		}
	}
`;

const deleteVote = gql`
	mutation($user_id: Int!, $component_id: Int!) {
		deleteVote(user_id: $user_id, component_id: $component_id) {
			id
		}
	}
`;

const createFan = gql`
	mutation($user_id: Int!, $component_id: Int!) {
		createFan(user_id: $user_id, component_id: $component_id) {
			id
		}
	}
`;

const deleteFan = gql`
	mutation($id: Int!) {
		deleteFan(id: $id) {
			id
		}
	}
`;

export default compose(
	withRouter,
	withApollo,
	graphql(oneComponent, {
		options: props => ({ variables: { id: props.componentId } })
	}),
	graphql(deleteComponent, { name: "deleteComponent" }),
	graphql(updateComponentCode, { name: "updateComponentCode" }),
	graphql(createComment, { name: "createComment" }),
	graphql(createVote, { name: "createVote" }),
	graphql(deleteVote, { name: "deleteVote" }),
	graphql(createFan, { name: "createFan" }),
	graphql(deleteFan, { name: "deleteFan" })
)(EditorPanes);
