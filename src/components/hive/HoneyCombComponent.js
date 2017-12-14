import React, { PureComponent } from "react";
import { Reveal, Table, Button } from "semantic-ui-react";
const moment = require("moment");

export default class HoneycombComponent extends PureComponent {
	handleClick = (id, e) => {
		this.props.history.push(`/components/${id}`);
	};

	render() {
		return (
			<div className="honeyCombComponent" style={styles.container}>
				<Reveal animated="fade" onClick={this.handleClick.bind(this, this.props.component.id)}>
					<Reveal.Content visible>
						<div
							style={
								this.props.component.component_picture
									? {
											backgroundImage: `url(${this.props.component
												.component_picture}?t=${new Date().getTime()})`
										}
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
							<Table className="fixed single line" basic="very">
								<Table.Body>
									<Table.Row textAlign="center">
										<Table.Cell>
											<Button inverted style={{ color: "white" }}>
												{`${this.props.component.title}`}
											</Button>
										</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="center">
										<Table.Cell style={{ color: "white" }}>{`Added on ${moment(
											this.props.component.created_at
										).format("LLL")}`}</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="left" style={{ padding: "10px" }} />
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
		width: "301px"
	}
};
