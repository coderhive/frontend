import React, { PureComponent } from "react";
// import HiveLayout from "./HiveLayout";
import Navbar from "../nav/Navbar";
import HoneyCombUserGrid from "./HoneyCombUserGrid";
import HoneyCombComponentGrid from "./HoneyCombComponentGrid";
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
			summary
		}
		allComponents {
			id
			created_at
			title
			description
			component_picture
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
		return (
			<div>
				<Navbar user={data.allUsers[0]} />
				{this.state.toggleComponents
					? <div>
							<div className="ui large buttons" style={{ marginTop: "90px" }}>
								<button className="ui button active">Components</button>
								<div className="or" />
								<button className="ui button" onClick={this.handleClick}>
									Users
								</button>
							</div>
							<HoneyCombComponentGrid components={data.allComponents} />
						</div>
					: <div>
							<div className="ui large buttons" style={{ marginTop: "90px" }}>
								<button className="ui button" onClick={this.handleClick}>
									Components
								</button>
								<div className="or" />
								<button className="ui button active">Users</button>
							</div>
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
