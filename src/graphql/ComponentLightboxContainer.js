import ComponentLightbox from "../components/editor/ComponentLightbox";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";


const updateComponent = gql`
	mutation(
	    $id: Int!
	    $title: String
	    $description: String
	    $code: String
	    $css: String
	    $owner_user_id: Int!
	) {
		updateComponent(
	    id: $id
	    title: $title
	    description: $description
	    code: $code
	    css: $css
	    owner_user_id: $owner_user_id
		) {
			id
			title
			description
			code
	    	css
	    	owner_user_id
		}
	}
`;

export default compose(
	withRouter,
	graphql(updateComponent, { name: "updateComponent" })
)(ComponentLightbox);
