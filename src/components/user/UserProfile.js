import React, {PureComponent} from "react";
import {Loader} from 'semantic-ui-react'
import NavBar from '../../graphql/NavbarContainer'
import UserProfileFeedContainer from "../../graphql/UserProfileFeedContainer";
import UserProfileComponents from "./UserProfileComponents"
import UserProfileFollow from "./UserProfileFollow"


const moment = require('moment');

export default class UserProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            panel1Toggle: {height: "600px", overflow: "hidden"},
            panel2Toggle: {height: "600px", overflow: "hidden"},
            panel3Toggle: {height: "600px", overflow: "hidden"},
            panel4Toggle: {height: "600px", overflow: "hidden"},
            panel5Toggle: {height: "600px", overflow: "hidden"},
        };
    }


    componentWillReceiveProps(props) {
        console.log(props)
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

                                <div className="ownerFace" style={{
                                    backgroundImage: `url('${this.props.data.oneUserById.profile_picture}')`,
                                    margin: "30px",
                                    borderRadius: "50%",
                                    width: "200px",
                                    height: "200px",
                                    boxShadow: "1px 1px 1px 1px black"
                                }}/>

                                {/*<div className="topBioHolder1">*/}
                                {/*<div className="honeyCombComponent2" style={styles.container}>*/}
                                {/*<div style={*/}
                                {/*this.props.data.oneUserById.profile_picture*/}
                                {/*? {backgroundImage: "url(" + this.props.data.oneUserById.profile_picture + ")"}*/}
                                {/*: {*/}
                                {/*backgroundImage:*/}
                                {/*"url(https://static.pexels.com/photos/20787/pexels-photo.jpg)"*/}
                                {/*}*/}
                                {/*}*/}
                                {/*className="honeyCombComponent2">*/}
                                {/*<div className="honeyCombTop2"/>*/}
                                {/*<div className="honeyCombBottom2"/>*/}
                                {/*</div>*/}

                                {/*</div>*/}
                                {/*</div>*/}

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
                                                <UserProfileComponents
                                                    data={this.props.data.oneUserById.components}
                                                    userId={this.props.data.oneUserById.id}
                                                    authenticatedId={this.props.authenticatedId}
                                                    title={"My Components"}
                                                />
                                        </div>
                                        <div className="individualUserPane" >
                                            <UserProfileComponents
                                                data={this.props.data.oneUserById.fanOf}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                title={"Components I Follow"}
                                            />
                                        </div>
                                    </div>
                                    <div className="userPanesRow">
                                        <div className="individualUserPane">
                                            <UserProfileFollow
                                                data={this.props.data.oneUserById.followers}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                title={"My Followers"}
                                            />
                                        </div>
                                        <div className="individualUserPane">
                                            <UserProfileFollow
                                                data={this.props.data.oneUserById.whoIFollow}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                title={"Who I Follow"}
                                            />
                                        </div>
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

