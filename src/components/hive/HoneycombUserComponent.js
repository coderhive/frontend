import React from "react";

export default function HoneycombUserComponent({ user }) {
	return (
		<div className="userComponent" style={{ backgroundImage: "url(" + user.image + ")" }}>
			<div className="userTop" />
			<div className="userBottom" />
		</div>
	);
}
