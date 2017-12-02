import React, { PureComponent } from "react";
// import HiveLayout from "./HiveLayout";
import Navbar from "../nav/Navbar";
import HoneyCombUserGrid from "./HoneyCombUserGrid";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const user = gql`
	query {
		oneUser(email: "chuckhagy@gmail.com") {
			id
			display_name
			profile_picture
			status
			role
			experience
			email
			created_at
		}
	}
`;

class HivePage extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toggleComponents: false
		};
	}

	render() {
		let { data } = this.props;
		if (data.loading) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<Navbar user={data.oneUser} />
				<HoneyCombUserGrid users={[data.oneUser]} />
			</div>
		);
	}
}

const queryOptions = {
	options: props => ({
		variables: {
			email: "chuckhagy@gmail.com"
		}
	})
};

export default graphql(user, queryOptions)(HivePage);
