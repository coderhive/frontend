import React, { PureComponent } from "react";
import { Loader } from "semantic-ui-react";
import NavbarContainer from "../../graphql/NavbarContainer";
import homeBg from "../../img/home_bg.jpg";
import hive from "../../img/hive.jpg";
import queen from "../../img/queen.jpg";
import honey from "../../img/honey.jpg";

const moment = require("moment");

export default class EditorPage extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toggle: false
		};
	}

	render() {
		return (
			<div>
				<NavbarContainer
					authenticatedId={this.props.authenticatedId}
					user={[this.props.loggedUser]}
					onSubmit={this.props.handleLogin}
					onLogout={this.props.handleLogOut}
				/>
				<div className="homeSplash">
					{this.props.authenticatedId
						? <div className="callToAction">
								<div style={{ border: "1px solid black" }}>
									<h1>Coder Hive</h1>
									<p>
										Welcome back to CoderHive, a place for React developers to build and to share.
										Check out our hive's top rated components to get inspiration or go an make a new
										component now!
									</p>
								</div>
								<div
									className="callToActionButton"
									onClick={() => this.props.history.push("/components/new")}>
									New Component
								</div>
							</div>
						: <div className="callToAction">
								<div style={{ border: "1px solid black" }}>
									<h1>Coder Hive</h1>
									<p>
										Welcome to CoderHive, a place for React developers to build and to share. Check
										out our hive's top rated components to get inspiration or create a free account
										to start building right now!
									</p>
								</div>
								<div
									className="callToActionButton"
									onClick={() => this.props.history.push("/signup")}>
									Sign Up
								</div>
							</div>}
				</div>
				<div className="homeContainer">
					<div className="homeColumn">
						<img
							alt="Coder Hive"
							src={hive}
							onClick={() => this.props.history.push("/components")}
						/>
						<h2 onClick={() => this.props.history.push("/components")}>Best Components</h2>
						<p />
						<p>
							See what everyone has been <span>droning</span> away on!
						</p>
						<p>
							Take a look at all of the highest rated components, as voted by our valued members.
						</p>
					</div>
					<div className="homeColumn">
						<img alt="Top Users" src={queen} onClick={() => this.props.history.push("/users")} />
						<h2 onClick={() => this.props.history.push("/users")}>Top Users</h2>
						<p>
							Find out who's the <span>queen</span> around this hive!
						</p>
						<p>
							It aint easy running things and competition is tight at the top... but you could be
							the next top user!
						</p>
					</div>
					<div className="homeColumn">
						<img alt="Get Started" src={honey} onClick={() => this.props.history.push("/signup")} />
						<h2 onClick={() => this.props.history.push("/signup")}>Get Started</h2>
						<p>
							Ready to <span>bee</span> creative?
						</p>
						<p>
							Sign up for free today and start making honey, whether you're an expert or just
							starting out!
						</p>
					</div>
					<div
						style={{
							flexGrow: "1",
							width: "80%",
							letterSpacing: "1px",
							wordSpacing: "2px",
							marginTop: "20px"
						}}>
						<h2>About Coder Hive</h2>
						<p>
							Coder Hive was the brainchild of{" "}
							<a href="https://github.com/chuckhagy" target="_blank" rel="noopener noreferrer">
								Chuck Hagy{" "}
							</a>
							and
							<a href="https://github.com/MelisaIm" target="_blank" rel="noopener noreferrer">
								{" "}Melisa Im
							</a>{" "}
							to empower developers to collaborate and learn JavaScript frameworks. At this time,
							the platform only supports React/JSX, but we aspire to extend the app to also support
							Vue and Angular. They named the application Coder Hive due to the collaborative nature
							of bees and most importantly because bees are neat.
						</p>{" "}
						<p>
							Would you like to work on our open source project?{" "}
							<a href="https://github.com/coderhive" target="_blank" rel="noopener noreferrer">
								Join the hive as a contributor
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
