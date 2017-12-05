import React from "react";
import { Reveal, Table } from "semantic-ui-react";

export default function HoneycombComponent({ component }) {
	return (
		<div className="honeyCombComponent" style={styles.container}>
			<Reveal animated="fade">
				<Reveal.Content visible>
					<div
						style={
							component.component_picture
								? { backgroundImage: "url(" + component.component_picture + ")" }
								: {
										backgroundImage: "url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
									}
						}
						className="honeyCombComponent">
						<div className="honeyCombTop" />
						<div className="honeyCombBottom" />
					</div>
				</Reveal.Content>
				<Reveal.Content hidden>
					<div className="hiddenText" style={styles.container}>
						<Table basic="very">
							<Table.Body>
								<Table.Row textAlign="center">
									<Table.Cell>
										<h2>
											{`${component.title}`}
										</h2>
									</Table.Cell>
								</Table.Row>
								<Table.Row textAlign="center">
									<Table.Cell>{`Created on ${component.created_at}`}</Table.Cell>
								</Table.Row>
								<Table.Row textAlign="left">
									<Table.Cell>{`Description: ${component.description}`}</Table.Cell>
								</Table.Row>
							</Table.Body>
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
