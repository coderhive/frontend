import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HiveContainer from "./graphql/HiveContainer";
import SignupContainer from "./graphql/SignupContainer";
import EditorContainer from "./graphql/EditorContainer";
import UserProfileContainer from "./graphql/UserProfileContainer";
import NewComponentContainer from "./graphql/NewComponentContainer";
import HomePageContainer from "./graphql/HomePageContainer";
import login from "./helperFunctions/login";
import jwtDecode from "jwt-decode";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticatedId: this.props.authenticatedId
		};
	}

	handleLogin = async ({ email, password }) => {
		let { token } = await login({ email, password }, "http://localhost:3000");
		if (token) {
			localStorage.setItem("token", token);
			let { sub: authenticatedId } = jwtDecode(token);
			this.setState({ authenticatedId: parseInt(authenticatedId, 10) });
		}
		return;
	};

	handleLogOut = () => {
		localStorage.removeItem("token");
		this.setState({ authenticatedId: null });
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<HomePageContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/components"
						render={() => {
							return (
								<HiveContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/components/new"
						render={() => {
							return (
								<NewComponentContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/components/:componentId"
						render={({ match }) => {
							const id = parseInt(match.params.componentId, 10);
							return (
								<EditorContainer
									componentId={id}
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/users"
						render={() => {
							return (
								<HiveContainer
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/users/:userId"
						render={({ match }) => {
                            const userId = parseInt(match.params.userId, 10);
                            return (
								<UserProfileContainer
									userId={userId}
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
									authenticatedId={this.state.authenticatedId}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/signup"
						render={() => {
							return (
								<SignupContainer
									authenticatedId={this.state.authenticatedId}
									handleLogin={this.handleLogin}
									handleLogOut={this.handleLogOut}
								/>
							);
						}}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
