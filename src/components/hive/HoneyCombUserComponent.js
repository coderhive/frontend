import React, { PureComponent } from "react";
import { Reveal, Table, Button } from "semantic-ui-react";

export default class HoneyCombUserComponent extends PureComponent {
	handleClick = (id, e) => {
		this.props.history.push(`/users/${id}`);
	};

	render() {
		return (
			<div className="honeyCombComponent" style={styles.container}>
				<Reveal animated="fade" onClick={this.handleClick.bind(this, this.props.user.id)}>
					<Reveal.Content visible>
						<div
							style={
								this.props.user.profile_picture
									? { backgroundImage: "url(" + this.props.user.profile_picture + ")" }
									: {
											backgroundImage:
												"url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
										}
							}
							className="honeyCombComponent">
							<div className="honeyCombTop" />
							<div className="honeyCombBottom" />
						</div>
					</Reveal.Content>
					<Reveal.Content hidden>
						<div className="hiddenText" style={styles.container}>
							<Table basic="very" style={{ padding: "20px" }}>
								<Table.Body>
									<Table.Row textAlign="center">
										<Table.Cell>
											<Button inverted style={{ color: "white" }}>
												{`${this.props.user.display_name} (Rank: ${this.props.user.experience})`}
											</Button>
										</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="center">
										<Table.Cell style={{ color: "white" }}>{`Member since ${this.props.user
											.created_at}`}</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="center">
										<Table.Cell style={{ color: "white" }}>{`Summary: ${this.props.user
											.summary}`}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</div>
					</Reveal.Content>
				</Reveal>
			</div>
		);
	}
}
let styles = {
	container: {
		width: "301px",
		paddingLeft: "1.3px",
		paddingRight: "1.3px"
	}
};
