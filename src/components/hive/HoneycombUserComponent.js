import React from "react";

export default function HoneyCombUserComponent({ user }) {
	return (
		<div className="honeyComb" style={styles.container}>
			<div
				className="userComponent"
				style={
					user.profile_picture
						? { backgroundImage: "url(" + user.profile_picture + ")" }
						: {
								backgroundImage: "url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
							}
				}>
				<div className="userTop" />
				<div className="userBottom" />
			</div>
			<div className="rank">
				{user.experience}
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
