import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./graphqlConfig/graphqlConfig";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Student from "./component/student";

function App() {
	return (
		<ApolloProvider client={client}>
			<Student />
		</ApolloProvider>
	);
}
export default App;
