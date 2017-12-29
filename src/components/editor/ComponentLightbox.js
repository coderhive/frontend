import React, { PureComponent } from "react";
import NavBar from "../../graphql/NavbarContainer";
let aws = require("aws-sdk");

export default class EditorPage extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			title: "",
			description: "",
			originalTitle: "",
			originalDescription: "",
			file: "",
			done: false,
			uploading: false,
			error: false
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	_handleImageChange = e => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];
		document.getElementById("ComponentPreview").src = window.URL.createObjectURL(file);
		reader.onloadend = () => {
			this.setState({
				file: file
			});
		};
		reader.readAsDataURL(file);
	};

	handleSubmit = async event => {
		event.preventDefault();
		this.setState({ uploading: true });
		let response = await this.props.updateComponent({
			variables: {
				id: this.state.id,
				title: this.state.title,
				description: this.state.description,
				owner_user_id: this.props.owner_user_id
			}
		});
		this.setState({ done: true });

		let s3 = new aws.S3({
			params: {
				Bucket: "coderhive",
				Key: `component_${this.state.id}.jpeg`,
				ContentType: "image/jpeg",
				ACL: "public-read-write"
			},
			accessKeyId: process.env.REACT_APP_AWSKEY,
			secretAccessKey: process.env.REACT_APP_AWSSECRET
		});

		if (this.state.file) {
			await s3.upload(
				{ Body: this.state.file },
				function(err, data) {
					if (err) {
						console.log("err", err);
						this.setState({ error: true });
					}
					if (data) {
						console.log("data", data);

						this.props.toggleEdit();
					}
				}.bind(this)
			);
		}
	};

	componentDidMount() {
		console.log(this.props);
		this.setState({
			title: this.props.title,
			originalTitle: this.props.title,
			description: this.props.description,
			originalDescription: this.props.description,
			id: this.props.component_id
		});
	}

	render() {
		return (
			<div>
				<NavBar
					authenticatedId={this.props.authenticatedId}
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				{this.props.authenticatedId
					? <div
							style={{
								backgroundColor: "#181718",
								width: "500px",
								padding: "20px",
								margin: "100px auto",
								color: "white",
								fontWeight: "100",
								border: "1px solid black",
								borderRadius: "8px",
								boxShadow: "0 0 0 5px #282728"
							}}>
							<h1
								style={{
									textAlign: "center",
									textTransform: "uppercase",
									letterSpacing: "5px",
									marginBottom: "15px"
								}}>
								Update Component
							</h1>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									marginBottom: "10px"
								}}>
								<img
									id="ComponentPreview"
									style={{ width: "80px", height: "80px", marginRight: "5px" }}
									src={`https://s3-us-west-1.amazonaws.com/coderhive/component_${this.state
										.id}.jpeg`}
									alt="Component"
								/>
								<div>
									{!this.state.done
										? <form onSubmit={e => this.handleSubmit(e)}>
												<input
													className="fileInput"
													type="file"
													onChange={e => this._handleImageChange(e)}
												/>
											</form>
										: <div>
												{this.state.error ? "Image Upload Failed" : "Image Upload Successful!"}
											</div>}
								</div>
							</div>
							<form id="form" onSubmit={this.handleSubmit}>
								<label
									style={{
										fontWeight: "bold",
										fontSize: "22px",
										textTransform: "uppercase",
										letterSpacing: "4px"
									}}>
									Name:
									<input
										type="text"
										value={this.state.title}
										name="title"
										onChange={this.handleChange}
										maxLength={25}
										style={{
											width: "430px",
											fontSize: "22px",
											margin: "15px",
											color: "black"
										}}
									/>
								</label>
								<br />
								<br />
								<label
									style={{
										fontWeight: "bold",
										fontSize: "22px",
										textTransform: "uppercase",
										letterSpacing: "4px"
									}}>
									Description:
									<textarea
										type="text"
										value={this.state.description}
										name="description"
										onChange={this.handleChange}
										style={{
											width: "430px",
											fontSize: "22px",
											height: "200px",
											margin: "15px",
											color: "black"
										}}
									/>
								</label>
								<div style={{ marginBottom: "20px", textAlign: "center" }} />
								<div style={{ textAlign: "center" }}>
									<input
										type="submit"
										value="U P D A T E"
										disabled={
											(this.state.description === this.state.originalDescription &&
												this.state.title === this.state.originalTitle &&
												!this.state.file) ||
											this.state.title.length === 0
										}
										style={{
											padding: "10px 30px 10px 30px"
										}}
									/>
								</div>
								<input
									type="button"
									value="Cancel"
									onClick={this.props.toggleEdit}
									style={{ padding: "10px 20px" }}
								/>
							</form>
						</div>
					: <p
							style={{
								color: "white",
								margin: "300px auto",
								width: "100%",
								textAlign: "center",
								fontSize: "30px"
							}}>
							Please Login to Update Components
						</p>}
			</div>
		);
	}
}
