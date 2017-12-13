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
	) {
		updateComponent(
	    id: $id
	    title: $title
	    description: $description
	    code: $code
	    css: $css
		) {
			id
			title
			description
			code
	    	css
		}
	}
`;

export default compose(
	withRouter,
	graphql(updateComponent, { name: "updateComponent" })
)(ComponentLightbox);
