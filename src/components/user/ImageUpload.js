import React, { PureComponent } from "react";
let aws = require("aws-sdk");

export default class ImageUpload extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { file: "", done: false, uploading: false, error: false };
	}

	_handleSubmit = e => {
		e.preventDefault();

		if (this.props.componentId) {
			let s3 = new aws.S3({
				params: {
					Bucket: "coderhive",
					Key: `component_${this.props.componentId}.jpeg`,
					ContentType: "image/jpeg",
					ACL: "public-read-write"
				},
				accessKeyId: process.env.REACT_APP_AWSKEY,
				secretAccessKey: process.env.REACT_APP_AWSSECRET
			});

			if (this.state.file) {
				this.setState({ uploading: true });
				s3.upload(
					{ Body: this.state.file },
					function(err, data) {
						if (err) {
							console.log(err);
							this.setState({ error: true });
						}
						if (data) {
							console.log(data);
							this.setState({ done: true });
						}
					}.bind(this)
				);
			}
		} else {
			let s3 = new aws.S3({
				params: {
					Bucket: "coderhive",
					Key: `profile_${this.props.userId}.jpeg`,
					ContentType: "image/jpeg",
					ACL: "public-read-write"
				},
				accessKeyId: process.env.REACT_APP_AWSKEY,
				secretAccessKey: process.env.REACT_APP_AWSSECRET
			});

			if (this.state.file) {
				this.setState({ uploading: true });
				s3.upload(
					{ Body: this.state.file },
					function(err, data) {
						if (err) {
							console.log(err);
							this.setState({ error: true });
						}
						if (data) {
							console.log(data);
							this.setState({ done: true });
						}
					}.bind(this)
				);
			}
		}
	};

	_handleImageChange = e => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file
			});
		};

		reader.readAsDataURL(file);
	};

	render() {
		return (
			<div>
				{!this.state.done
					? <form onSubmit={e => this._handleSubmit(e)}>
							<input className="fileInput" type="file" onChange={e => this._handleImageChange(e)} />
							{!this.state.uploading
								? <button
										className="submitButton"
										type="submit"
										onClick={e => this._handleSubmit(e)}>
										Upload Image
									</button>
								: <button
										disabled
										className="submitButton"
										type="submit"
										onClick={e => this._handleSubmit(e)}>
										Uploading...
									</button>}
						</form>
					: <div>
							{this.state.error ? "Image Upload Failed" : "Image Upload Successful!"}
						</div>}
			</div>
		);
	}
}
