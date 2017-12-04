import React from "react";

export default function HoneycombComponent({ component }) {
	return (
		<div className="honeyComb" style={styles.container}>
			<div
				className="component"
				style={
					component.component_picture
						? { backgroundImage: "url(" + component.component_picture + ")" }
						: {
								backgroundImage: "url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
							}
				}>
				<div className="componentTop" />
				<div className="componentBottom" />
			</div>
		</div>
	);
}

let styles = {
	container: {
		width: "301px",
		paddingLeft: "1.3px",
		paddingRight: "1.3px"
	}
};
