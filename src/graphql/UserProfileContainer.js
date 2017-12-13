import UserProfile from "../components/user/UserProfile";
import { graphql, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const oneUserById = gql`
	query($id: Int!) {
		oneUserById(id: $id) {
    		id
    		display_name
    		summary
    		status
    		experience
    		profile_picture
    		components{
    			id
    			title
    			component_picture
    			description
    			created_at
    			updated_at
    		}
    		fanOf{
    			id
    			component_id
    			component_picture
    			title
    			description
    			created_at
    			updated_at
    		}
    		followers{
    			id
    			display_name
    			profile_picture
    			created_at
    			updated_at

    		}
    		whoIFollow{
    			id
    			display_name
    			profile_picture
    			created_at
    			updated_at

    		}
    		created_at
    		updated_at
  		}
	}
`;


const updateUser = gql`
	mutation($id: Int!, $display_name: String, $summary: String) {
		updateUser(id: $id, display_name: $display_name, summary: $summary) {
			id
			display_name
			summary
		}
	}
`;

const deleteFollow = gql`
	mutation($follower: Int!, $followee: Int!) {
		deleteFollow(follower: $follower, followee: $followee) {
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
	graphql(oneUserById, {
		options: props => ({
			variables: {
				id: props.userId
			}
		})
	}),
    graphql(updateUser, { name: "updateUser" }),
    graphql(deleteFollow, { name: "deleteFollow" }),
    graphql(deleteFan, { name: "deleteFan" }),
)(UserProfile);
