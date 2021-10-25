const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const cors = require("cors");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typedefs");
const dbHelper = require("./DBHelper/DBHelper");

(async function () {
	const app = express();
	const httpServer = createServer(app);
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});
	app.use(cors());
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		);
		res.header("Access-Control-Allow-Methods", "*");
		next();
	});

	const server = new ApolloServer({
		schema,
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});
	const subscriptionServer = SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: server.graphqlPath },
	);
	await server.start();
	server.applyMiddleware({ app });

	const port = process.env.PORT || 3002;
	httpServer.listen(port, () => {
		console.log(`Server is now running on ${port}`);
		dbHelper.dbConnector();
	});
})();
