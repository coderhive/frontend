import React, { PureComponent } from "react";

export default class RenderComponent extends PureComponent {
	render() {
		return (
			<iframe
				id="reactIframe"
				name="myIframe"
				title="react"
				src={`http://localhost:3000/component/${this.props.id}`}
				height="100%"
				width="100%"
			/>
		);
	}
}
