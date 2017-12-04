import React, { PureComponent } from "react";
// import HiveLayout from "./HiveLayout";
import Navbar from "../nav/Navbar";
import HoneyCombUserGrid from "./HoneyCombUserGrid";
import { Button } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const users = gql`
	query {
		allUsers {
			id
			display_name
			profile_picture
			status
			experience
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

	handleClick = () => {
		this.setState(prevState => {
			return { toggleComponents: !prevState.toggleComponents };
		});
	};

	render() {
		let { data } = this.props;
		if (data.loading) {
			return <div>Loading...</div>;
		}
		console.log(data.allUsers);
		return (
			<div>
				<Navbar user={data.allUsers[0]} />
				{this.state.toggleComponents
					? <div style={{ marginTop: "90px" }}>
							<Button primary onClick={this.handleClick}>
								Components
							</Button>
							<Button secondary onClick={this.handleClick}>
								Users
							</Button>
						</div>
					: <div style={{ marginTop: "90px" }}>
							<Button secondary onClick={this.handleClick}>
								Components
							</Button>
							<Button primary onClick={this.handleClick}>
								Users
							</Button>
							<HoneyCombUserGrid users={data.allUsers} />
						</div>}
			</div>
		);
	}
}

const queryOptions = {
	options: props => ({})
};

export default graphql(users)(HivePage);
