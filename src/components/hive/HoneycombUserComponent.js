import React from "react";
import { Image, Reveal, Table } from "semantic-ui-react";

// user.profile_picture
// 	? { backgroundImage: "url(" + user.profile_picture + ")" }
// 	: {
// 			backgroundImage:
// 				"url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
// 		}

export default function HoneyCombUserComponent({ user }) {
	let image;
	if (!user.profile_picture) {
		image = "https://static.pexels.com/photos/20787/pexels-photo.jpg";
	} else {
		image = user.profile_picture;
	}
	return (
		<div className="honeyComb userComponent" style={styles.container}>
			<Reveal animated="fade">
				<Reveal.Content visible>
					<div
						style={
							user.profile_picture
								? { backgroundImage: "url(" + user.profile_picture + ")" }
								: {
										backgroundImage: "url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
									}
						}
						className="userComponent">
						<div className="userTop" />
						<div className="userBottom" />
					</div>
				</Reveal.Content>
				<Reveal.Content hidden>
					<div className="hiddenText" style={styles.container}>
						<Table basic="very">
							<Table.Row as="h1" textAlign="center">
								{user.display_name}
							</Table.Row>
							<Table.Row textAlign="center">
								{`Member since ${user.created_at}`}
							</Table.Row>
						</Table>
					</div>
				</Reveal.Content>
			</Reveal>
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

{
	/* <div className="honeyComb" style={styles.container}>
	<div className="userComponent">
		<Reveal animated="fade" className ="userComponent">
			<Reveal.Content visible>
				<Image src={image} />
			</Reveal.Content>
			<Reveal.Content hidden>
				<div>hi!</div>
			</Reveal.Content>
		</Reveal>
		<div className="userTop" />
		<div className="userBottom" />
	</div>
	<div className="rank">
		{user.experience}
	</div>
</div> */
}
