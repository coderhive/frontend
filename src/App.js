import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HivePage from "./components/hive/HivePage";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={HivePage} />
					<Route exact path="/hive" component={HivePage} />
				</div>
			</Router>
		);
	}
}

export default App;
