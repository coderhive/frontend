import React, { PureComponent } from "react";
let aws = require("aws-sdk");

export default class ImageUpload extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { file: "" };
	}

	_handleSubmit(e) {
		e.preventDefault();
		let s3 = new aws.S3({
			params: {
				Bucket: "coderhive",
				Key: `profile_${this.props.userId}.jpeg`,
				ContentType: "image/jpeg"
			},
			accessKeyId: process.env.REACT_APP_AWSKEY,
			secretAccessKey: process.env.REACT_APP_AWSSECRET
		});

		if (this.state.file) {
			s3.upload({ Body: this.state.file }, function(err, data) {
				if (err) return console.log(err);
				console.log(data);
			});
		}
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
			<form onSubmit={e => this._handleSubmit(e)}>
				<input className="fileInput" type="file" onChange={e => this._handleImageChange(e)} />
				<button className="submitButton" type="submit" onClick={e => this._handleSubmit(e)}>
					Upload Image
				</button>
			</form>
		);
	}
}
