import React, { PureComponent } from "react";
var aws = require("aws-sdk");

export default class ImageUpload extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { file: "" };
	}

	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
		console.log("handle uploading-", this.state.file);

		let s3 = new aws.S3({
			params: {
				Bucket: "coderhive",
				Key: `profile_${this.props.userId}.jpeg`,
				ContentType: "image/jpeg",
				ACL: "public-read"
			}
		});

		s3.upload({ Body: this.state.file }, function(err, data) {
			if (err) return console.log(err);
		});
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file
			});
		};

		reader.readAsDataURL(file);
	}

	render() {
		return (
			<div className="ImageUpload">
				<form onSubmit={e => this._handleSubmit(e)}>
					<input className="fileInput" type="file" onChange={e => this._handleImageChange(e)} />
					<button className="submitButton" type="submit" onClick={e => this._handleSubmit(e)}>
						Upload Image
					</button>
				</form>
			</div>
		);
	}
}
