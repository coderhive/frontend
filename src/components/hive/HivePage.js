import React, { PureComponent } from "react";
// import HiveLayout from "./HiveLayout";
import NavbarContainer from "../../graphql/NavbarContainer";
import HoneyCombUserGrid from "./HoneyCombUserGrid";
import HoneyCombComponentGrid from "./HoneyCombComponentGrid";

export default class HivePage extends PureComponent {
	constructor(props) {
		super(props);

		// this.state = {
		// 	toggleComponents: this.props.match.path.replace(/\//, "")
		// };
	}

	// handleClick = () => {
	// 	this.setState(prevState => {
	// 		return { toggleComponents: !prevState.toggleComponents };
	// 	});
	// };

	render() {
		console.log(this.props);
		let { data } = this.props;

		if (data.loading) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<NavbarContainer
					authenticatedId={this.props.authenticatedId}
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				{this.props.match.path === "/components"
					? <div className="HivePage">
							<div className="toggleComponents" />
							<HoneyCombComponentGrid
								components={data.allComponents}
								history={this.props.history}
							/>
						</div>
					: null}
				{this.props.match.path === "/users"
					? <div className="HivePage">
							<div className="toggleComponents" />
							<HoneyCombUserGrid users={data.allUsers} history={this.props.history} />
						</div>
					: null}
			</div>
		);
	}
}
