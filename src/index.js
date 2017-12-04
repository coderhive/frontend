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
import checkAuthentication from "./helperFunctions/checkAuthentication";
import env from "./env";

const httpLink = new HttpLink({
	uri: "http://localhost:3000/graphql"
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
	const authentication = await checkAuthentication({
		baseUrl: env.BASE_URL
	});
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App authentication={authentication} />
		</ApolloProvider>,
		document.getElementById("root")
	);
}

render();
