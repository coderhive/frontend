import React, { PureComponent } from "react";
import HiveLayout from "./HiveLayout";
import HoneyCombUserGrid from "./HoneyCombUserGrid";

export default class HivePage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			toggleComponents: false
		};
	}
	render() {
		return <div>hi</div>;
	}
}
