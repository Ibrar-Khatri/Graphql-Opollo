import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./graphqlConfig/graphqlConfig";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Student from "./component/student";
import SearchStudent from "./searchStudent/searchStudent";

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Switch>
					<Route path='/' component={Student} exact />
				</Switch>
				<Switch>
					<Route path='/search' component={SearchStudent} exact />
				</Switch>
			</BrowserRouter>
		</ApolloProvider>
	);
}
export default App;
