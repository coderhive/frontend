import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={HivePage} />
			</Router>
		);
	}
}

export default App;
