import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import "./chuck.css";
import checkAuthentication from "./helperFunctions/checkAuthentication";

const httpLink = new HttpLink({
	uri: `${process.env.REACT_APP_BASE_URL}graphql`
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem("token");
	// add the authorization to the headers
	if (token) {
		operation.setContext(context => ({
			...context,
			headers: {
				...context.headers,
				authorization: `Bearer ${token}`
			}
		}));
	}

	return forward(operation);
});

const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache()
});

async function render() {
	const authenticatedId = await checkAuthentication(process.env.REACT_APP_BASE_URL);
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App authenticatedId={authenticatedId} />
		</ApolloProvider>,
		document.getElementById("root")
	);
}

render();
