import React, { PureComponent } from "react";

export default class RenderComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			update: this.props.time,
			url: `http://localhost:3000/component/${this.props.id}`
		};
	}

	componentWillReceiveProps(props) {
		if (props.time) {
			this.setState({ update: props.time });
		}
	}

	render() {
		return (
			<iframe
				id="reactIframe"
				name="myIframe"
				title="react"
				height="100%"
				width="100%"
				key={this.state.update}
				src={this.state.url}
			/>
		);
	}
}
