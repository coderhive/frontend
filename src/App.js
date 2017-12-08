import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HiveContainer from "./graphql/HiveContainer";
import SignupContainer from "./graphql/SignupContainer";
import EditorContainer from "./graphql/EditorContainer";
import login from "./helperFunctions/login";
import jwtDecode from "jwt-decode";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticatedId: this.props.authenticatedId
        };
    }

    handleLogin = async ({email, password}) => {
        let {token} = await login({email, password}, "http://localhost:3000");
        if (token) {
            localStorage.setItem("token", token);
            let {sub: authenticatedId} = jwtDecode(token);
            this.setState({authenticatedId: parseInt(authenticatedId, 10)});
        }
        return;
    };

    handleLogOut = () => {
        localStorage.removeItem("token");
        this.setState({authenticatedId: null});
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
                        path="/hive"
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
                        path="/components/:componentId"
                        render={({match}) => {
                            const id = parseInt(match.params.componentId);
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
                </div>
            </Router>
        );
    }
}

export default App;
