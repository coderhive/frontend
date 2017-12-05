import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";
import login from "./helperFunctions/login";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
	// state = {
	// 	token: this.props.token
	// };

	handleLogin({ email, password }) {
		const { token } = login({ email, password }, "http://localhost:3000");
		if (token) {
			// const user = await this.props.loggedUser({ variables: { email, password } });
			console.log(token);
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
							return <HivePage handleLogin={this.handleLogin} />;
						}}
					/>
					<Route
						exact
						path="/hive"
						render={() => {
							return <HivePage handleLogin={this.handleLogin} />;
						}}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
