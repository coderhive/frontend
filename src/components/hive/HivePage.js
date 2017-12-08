import React, { PureComponent } from "react";
// import HiveLayout from "./HiveLayout";
import Navbar from "../nav/Navbar";
import HoneyCombUserGrid from "./HoneyCombUserGrid";
import HoneyCombComponentGrid from "./HoneyCombComponentGrid";
import { Button } from "semantic-ui-react";

export default class HivePage extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toggleComponents: true
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
				<Navbar
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				{this.state.toggleComponents
					? <div className="HivePage">
							<div className="toggleComponents">
								<div className="ui large buttons" style={{ marginTop: "90px" }}>
									<button className="ui button active">Components</button>
									<div className="or" />
									<button className="ui button" onClick={this.handleClick}>
										Users
									</button>
								</div>
							</div>
							<HoneyCombComponentGrid
								components={data.allComponents}
								history={this.props.history}
							/>
						</div>
					: <div className="HivePage">
							<div className="toggleComponents">
								<div className="ui large buttons" style={{ marginTop: "90px" }}>
									<button className="ui button" onClick={this.handleClick}>
										Components
									</button>
									<div className="or" />
									<button className="ui button active">Users</button>
								</div>
							</div>
							<HoneyCombUserGrid users={data.allUsers} history={this.props.history} />
						</div>}
			</div>
		);
	}
}
