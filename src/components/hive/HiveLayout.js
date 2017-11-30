import React from "react";

export default function HiveLayout(props) {
	console.log(this.props.children);
	return (
		<div>
			{this.props.children[0]}
		</div>
	);
}
