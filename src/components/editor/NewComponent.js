import React, { PureComponent } from "react";
import NavBar from "../../graphql/NavbarContainer";

export default class NewComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			owner_user_id: "",
			title: "",
			description: "",
			framework: "react",
			language: "javascript"
		};
	}

	handleDelete = async () => {
		let response = await this.props.deleteComponent({
			variables: { id: this.props.data.oneComponent.id }
		});
		this.props.history.goBack();
		return response;
	};

	componentDidMount() {
		this.setState({ owner_user_id: this.props.authenticatedId });
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		let response = await this.props.createComponent({
			variables: {
				owner_user_id: this.state.owner_user_id,
				title: this.state.title,
				description: this.state.description,
				framework: this.state.framework,
				language: this.state.language
			}
		});

		// console.log(response)
		this.props.history.push(`/components/${response.data.createComponent.id}`);
	};

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
					? <form
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
							}}
							onSubmit={this.handleSubmit}>
							<h1
								style={{
									textAlign: "center",
									textTransform: "uppercase",
									letterSpacing: "5px",
									marginBottom: "35px"
								}}>
								New Component
							</h1>
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
							<div style={{ textAlign: "center" }}>
								<input
									type="submit"
									value="C R E A T E"
									disabled={this.state.title.length === 0 || this.state.description.length === 0}
									style={{
										padding: "10px 30px 10px 30px"
									}}
								/>
							</div>
						</form>
					: <p
							style={{
								color: "white",
								margin: "300px auto",
								width: "100%",
								textAlign: "center",
								fontSize: "30px"
							}}>
							Please Login to Create Components
						</p>}
			</div>
		);
	}
}
