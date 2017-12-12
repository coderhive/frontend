import UserProfileFeed from "../components/user/UserProfileFeed";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";
import {withRouter} from "react-router-dom";

const activities = gql`
	query($userId: Int!) {
    	activities(userId: $userId){
    		id
    		type
    		user_id
    		component_id
   			comment{
    			comment
    		}
   			user{
    			id
    			display_name
    			profile_picture
   			}
   			component{
    			id
    			title
   				component_picture
   			}
			created_at
    	}
    }
`;

export default compose(
    withRouter,
    graphql(activities, {
        options: props => ({
            variables: {
                userId: props.userId
            }
        })
    })
)(UserProfileFeed);
