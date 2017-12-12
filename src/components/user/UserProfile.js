import React, {PureComponent} from "react";
import {Loader} from 'semantic-ui-react'
import NavBar from '../../graphql/NavbarContainer'
import UserProfileFeedContainer from "../../graphql/UserProfileFeedContainer";


const moment = require('moment');

export default class UserProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            stateThing: false,
        };
    }

    handleToggle = thisNumber => {
        console.log(thisNumber)
    };

    componentWillReceiveProps(props) {
        console.log("")
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
                {this.props.data.loading ?
                    <div className="centeredSpinner">
                        <Loader
                            active
                            size="massive"
                        />
                    </div>
                    :
                    <div className="userContainer">
                        <div>
                            <div className="profileBioTopBlack">
                                {/*<h4>User Profile:</h4>*/}
                                <div className="topBioHolder1">
                                    <div className="honeyCombComponent" style={styles.container}>
                                        <div style={
                                            this.props.data.oneUserById.profile_picture
                                                ? {backgroundImage: "url(" + this.props.data.oneUserById.profile_picture + ")"}
                                                : {
                                                    backgroundImage:
                                                        "url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"
                                                }
                                        }
                                             className="honeyCombComponent">
                                            <div className="honeyCombTop"/>
                                            <div className="honeyCombBottom"/>
                                        </div>

                                    </div>
                                </div>

                                <div className="topBioHolder2">
                                    <h1>{this.props.data.oneUserById.display_name}</h1>
                                    <div
                                        style={{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
                                        <div style={{flexGrow: "1"}}>
                                            <h3>rank:</h3>
                                            <h4>{this.props.data.oneUserById.experience}</h4>
                                        </div>
                                        <div style={{flexGrow: "1"}}>
                                            <h3>member since:</h3>
                                            <h4>{moment(this.props.data.oneUserById.created_at).format('LLLL')}</h4>
                                        </div>
                                    </div>
                                    <h2>about me:</h2>
                                    <p>{this.props.data.oneUserById.summary}</p>
                                </div>
                            </div>
                            <div>
                                <div className="userPanesHolder">
                                    <div className="userPanesRow">
                                        <div className="individualUserPane">
                                            <p>My Components</p>
                                        </div>
                                        <div className="individualUserPane"><p>Components I Follow</p></div>
                                    </div>
                                    <div className="userPanesRow">
                                        <div className="individualUserPane"><p>Followers</p></div>
                                        <div className="individualUserPane"><p>Who I Follow</p></div>
                                    </div>
                                    <div className="userPanesRow">
                                        <div className="individualUserFeedPane">
                                            <UserProfileFeedContainer
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                            />
                                        </div>
                                    </div>
                                </div>


                                {/*{this.props.data.oneUserById.components.map(component =>*/}
                                {/*<p key={component.id}>{component.title}</p>*/}
                                {/*)}*/}
                                {/*{this.props.data.oneUserById.fanOf.map(component =>*/}
                                {/*<p key={component.id}>{component.title}</p>*/}
                                {/*)}*/}
                                {/*{this.props.data.oneUserById.followers.map(follower =>*/}
                                {/*<p key={follower.id}>{follower.display_name}</p>*/}
                                {/*)}*/}
                                {/*{this.props.data.oneUserById.whoIFollow.map(user =>*/}
                                {/*<p key={user.id}>{user.display_name}</p>*/}
                                {/*)}*/}
                                {/*{this.props.data.oneUserById.activities.map(activity =>*/}
                                {/*<div key={activity.id}>*/}
                                {/*<p>{activity.type}</p>*/}
                                {/*<p>{activity.user_id}</p>*/}
                                {/*<p>{activity.component_id}</p>*/}
                                {/*<p>{activity.comment ? activity.comment.comment : ' -- '}</p>*/}
                                {/*</div>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    }

}

let styles = {
    container: {
        width: "301px",
        paddingLeft: "1.3px",
        paddingRight: "1.3px"
    }
};

