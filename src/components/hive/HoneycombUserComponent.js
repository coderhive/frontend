import React from "react";

export default function HoneyCombUserComponent({ user }) {
	return (
		<div style={styles.container}>
			<div className="userComponent" style={{ backgroundImage: "url(" + user.image + ")" }}>
				<div className="userTop" />
				<div className="userBottom" />
			</div>
			<div className="rank">
				{user.rank}
			</div>
		</div>
	);
}

let styles = {
	container: {
		width: "300px",
		paddingLeft: "1.3px",
		paddingRight: "1.3px"
	}
};
