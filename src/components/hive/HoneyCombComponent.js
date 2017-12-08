import React, { PureComponent } from "react";
import { Reveal, Table, Button } from "semantic-ui-react";

export default class HoneycombComponent extends PureComponent {
	handleClick = (id, e) => {
		this.props.history.push(`/component/${id}`);
	};

	render() {
		return (
			<div className="honeyCombComponent" style={styles.container}>
				<Reveal animated="fade" onClick={this.handleClick.bind(this, this.props.component.id)}>
					<Reveal.Content visible>
						<div
							style={
								this.props.component.component_picture
									? { backgroundImage: "url(" + this.props.component.component_picture + ")" }
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
							<Table basic="very">
								<Table.Body>
									<Table.Row textAlign="center">
										<Table.Cell>
											<Button inverted style={{ color: "white" }}>
												{`${this.props.component.title}`}
											</Button>
										</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="center">
										<Table.Cell style={{ color: "white" }}>{`Added on ${this.props.component
											.created_at}`}</Table.Cell>
									</Table.Row>
									<Table.Row textAlign="left" style={{ padding: "30px", fontSize: "10px" }}>
										<Table.Cell
											style={{
												color: "white"
											}}>{`Description: ${this.props.component.description}`}</Table.Cell>
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
