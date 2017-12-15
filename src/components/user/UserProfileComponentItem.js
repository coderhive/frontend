import React, { PureComponent } from "react";
const moment = require("moment");

export default class UserProfileComponentItem extends PureComponent {
	render() {
		return (
			<div
				style={{
					flexGrow: "1",
					borderTop: "1px solid darkgrey",
					display: "flex",
					flexDirection: "row",
					verticalAlign: "middle"
				}}>
				<div
					className="ownerFace"
					style={{
						backgroundImage: `url('${this.props.data.component_picture}')`,
						border: "1px solid grey",
						margin: "30px 10px 10px 10px",
						width: "200px",
						height: "70px"
					}}
					onClick={() => this.props.history.push(`/components/${this.props.data.id}`)}
				/>z
				<div style={{ flexGrow: "6", padding: "20px", verticalAlign: "middle" }}>
					<h3
						style={{ fontSize: "14px", margin: "3px", textDecoration: "underline" }}
						onClick={() => this.props.history.push(`/components/${this.props.data.id}`)}>
						{this.props.data.title}
					</h3>
					<p style={{ fontSize: "10px", margin: "3px" }}>
						{this.props.data.description.slice(0, 200)}
					</p>
					<p style={{ fontSize: "10px", fontWeight: "bold", margin: "3px" }}>
						created at: {moment(this.props.data.updated_at).format("LLLL")}
						<br />
						updated at: {moment(this.props.data.created_at).format("LLLL")}
					</p>
				</div>
				{this.props.userId === this.props.authenticatedId && this.props.controls
					? <p
							className="stopFollowButton"
							onClick={() => this.props.handleDeleteFan(this.props.data.id)}>
							unfollow
						</p>
					: null}
			</div>
		);
	}
}
