import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = new WebSocketLink({
	uri: "ws://1700-39-48-195-165.ngrok.io/graphql",
	options: {
		reconnect: true,
	},
});
const httpLink = new HttpLink({
	uri: "https://1700-39-48-195-165.ngrok.io/graphql",
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink,
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default client;
