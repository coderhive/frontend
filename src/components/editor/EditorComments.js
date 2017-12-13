import React, { PureComponent } from "react";
import { Button, Form } from "semantic-ui-react";

const moment = require("moment");

export default class EditorComments extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = () => {
		console.log(this.state.value);
		console.log(this.props.authenticatedId);
		console.log(this.props.data.oneComponent.id)
	};

	render() {
		if (this.props.data.loading) return <p style={{ color: "white" }}>LOADING PAGE...</p>;
		if (!this.props.data.oneComponent)
			return <p style={{ color: "white" }}>LOADING COMPONENT...}</p>;
		return (
			<div className="commentsContainer">
				<h2>
					{this.props.data.oneComponent.comments.length} Comments:
				</h2>
				{/*TODO ADD IN CONDITIONAL FOR NO COMMENTS YET*/}
				{this.props.data.oneComponent.comments.map(thisComment =>
					<div className="individualComment" key={thisComment.id}>
						<div>
							<div
								className="ownerFace"
								style={{ backgroundImage: `url('${thisComment.profile_picture}')` }}
								onClick={() => this.props.history.push(`/users/${thisComment.user_id}`)}

							/>
							<div className="commenterName">
								<div>
									<h3 onClick={() => this.props.history.push(`/users/${thisComment.user_id}`)}>
										{thisComment.display_name}
									</h3>
								</div>
								<div>
									<h4>
										{moment(thisComment.created_at).format("LLLL")}
									</h4>
								</div>
							</div>
							<p>
								{thisComment.comment}
							</p>
						</div>
					</div>
				)}

				<div className="commentForm">
					<h2>Join the Conversation</h2>

					{!this.props.authenticatedId
						? <p>Please login to leave a comment.</p>
						: <div>
								<p>Leave your comment below</p>
								<Form style={{ textAlign: "right" }}>
									<textarea
										type="text"
										value={this.state.value}
										onChange={this.handleChange}
										style={{ minHeight: "100px" }}
									/>
									<Button
										style={{ margin: "12px 0 0 12px" }}
										onClick={this.handleSubmit}
									>
										Submit
									</Button>

                                    />
								</Form>
							</div>}
				</div>
			</div>
		);
	}
}
