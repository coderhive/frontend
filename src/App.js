import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";
import login from "./helperFunctions/login";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

// const currentUser = gql`
// 	query {
// 		loggedUser () {
// 			id
// 		}
// 	}
// `;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { token: null };
	}
	async handleLogin({ email, password }) {
		const { token } = await login({ email, password }, "http://localhost:3000");
		if (token) {
			this.setState({ token });
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Route
						exact
						path="/"
						render={() => {
							return <HivePage handleLogin={this.handleLogin} token={this.state.token} />;
						}}
					/>
					<Route
						exact
						path="/hive"
						render={() => {
							return <HivePage handleLogin={this.handleLogin} token={this.state.token} />;
						}}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
