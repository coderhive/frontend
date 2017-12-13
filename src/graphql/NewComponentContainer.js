import NewComponent from "../components/editor/NewComponent";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";
import {withRouter} from "react-router-dom";


const createComponent = gql`
	mutation(
	    $owner_user_id: Int!
	    $title: String!
	    $description: String
	    $framework: String!
	    $language: String!
	) {
		createComponent(
		owner_user_id: $owner_user_id
		title: $title
		description: $description
		framework: $framework
		language: $language
		) {
			id
			title
			description
			owner_user_id
		}
	}
`;


export default compose(
    withRouter,
    graphql(createComponent, {name: 'createComponent'})
)(NewComponent);