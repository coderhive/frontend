import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";
import login from "./helperFunctions/login";
import jwtDecode from "jwt-decode";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleLogin = async ({ email, password }) => {
		let { token } = await login({ email, password }, "http://localhost:3000");
		if (token) {
			let { sub: authenticatedId } = jwtDecode(token);
			this.setState({ authenticatedId: parseInt(authenticatedId, 10) });
		}
		return;
	};

	render() {
		return (
			<Router>
				<div>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<HivePage
									handleLogin={this.handleLogin}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/hive"
						render={() => {
							return (
								<HivePage
									handleLogin={this.handleLogin}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
