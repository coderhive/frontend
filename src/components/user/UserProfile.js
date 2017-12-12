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
            aboutMe: '',
            panel1Toggle: {height: "600px", overflow: "hidden"},
            panel2Toggle: {height: "600px", overflow: "hidden"},
            panel3Toggle: {height: "600px", overflow: "hidden"},
            panel4Toggle: {height: "600px", overflow: "hidden"},
            panel5Toggle: {height: "600px", overflow: "hidden"},
        };
    }


    componentWillReceiveProps(props) {
        console.log(props.data)
        if (props.data.oneUserById) {
            console.log('YEAHHHHHHHHHHHH<<<<<<<<<<<<<<<<')
            this.setState({
                aboutMe: props.data.oneUserById.summary
            })
        }
    }

    handleChange = event => {
        this.setState({value: event.target.value});
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

                                    <h3>about me:</h3>
                                    {this.props.userId === this.props.authenticatedId ?
                                        <textarea style={{
                                            backgroundColor: "#3f3e3f",
                                            color: "white",
                                            fontSize: "16px",
                                            height: "70px",
                                            padding: "10px",
                                            boxShadow: "1px 1px 1px black",
                                            width: "100%",
                                            value: this.state.aboutMe
                                        }}
                                                  onChange={this.handleChange}>
                                        </textarea>
                                        :
                                        <p>{this.props.data.oneUserById.summary}</p>
                                    }
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
                                        <div className="individualUserPane">
                                            <UserProfileComponents
                                                data={this.props.data.oneUserById.fanOf}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                title={"Components I Follow"}
                                                controls={true}
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
                                                controls={true}
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

