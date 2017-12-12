import UserProfile from "../components/user/UserProfile";
import { graphql, compose } from "react-apollo";
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

export default compose(
	withRouter,
	graphql(oneUserById, {
		options: props => ({
			variables: {
				id: props.userId
			}
		})
	})
)(UserProfile);
