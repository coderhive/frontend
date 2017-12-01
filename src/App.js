import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";

const client = new ApolloClient({
	link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
	cache: new InMemoryCache()
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Route exact path="/" component={HivePage} />
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
