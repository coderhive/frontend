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
            id: 0,
            summary: 'Loading...',
            display_name: 'Loading...',
        };
    }


    componentWillReceiveProps(props) {
        if (props.data.oneUserById) {
            this.setState({
                id: props.authenticatedId,
                display_name: props.data.oneUserById.display_name,
                summary: props.data.oneUserById.summary
            })
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let response = await this.props.updateUser({
            variables: {
                id: this.state.id,
                summary: this.state.summary,
                display_name: this.state.display_name,
            }
        });
    };

    handleDeleteFollow = async (event) => {
        let followee = event.data.id;
        let follower = event.userId;
        console.log(followee, follower)
        let response = await this.props.deleteFollow({
            variables: {followee, follower}
        });
        this.props.client.resetStore()
    };

    handleDeleteFan= async (id) => {
        let response = await this.props.deleteFan({
            variables: {id}
        });
        console.log(response)
        this.props.client.resetStore()
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

                                    {this.props.userId === this.props.authenticatedId ?
                                        <form style={{
                                            maxWidth: "600px",
                                            margin: "0 auto 40px auto",
                                        }}
                                              onSubmit={this.handleSubmit}
                                        >
                                            <h3>display name:</h3>
                                            <input style={{
                                                backgroundColor: "#3f3e3f",
                                                color: "white",
                                                fontSize: "50px",
                                                height: "70px",
                                                padding: "10px",
                                                boxShadow: "1px 1px 1px black",
                                                width: "100%",
                                            }}
                                                   name="display_name"
                                                   value={this.state.display_name}
                                                   onChange={this.handleChange}>
                                            </input>
                                            <input type="submit" value="save" style={{
                                                float: 'right', padding: '5px' +
                                                ' 20px 5px 20px'
                                            }}/>
                                        </form>
                                        :
                                        <h1>{this.props.data.oneUserById.display_name}</h1>
                                    }

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
                                        <form style={{
                                            maxWidth: "600px",
                                            margin: "10px auto"
                                        }}
                                              onSubmit={this.handleSubmit}
                                        >
                                            <textarea style={{
                                                backgroundColor: "#3f3e3f",
                                                color: "white",
                                                fontSize: "16px",
                                                height: "70px",
                                                padding: "10px",
                                                boxShadow: "1px 1px 1px black",
                                                width: "100%",
                                            }}
                                                      value={this.state.summary}
                                                      onChange={this.handleChange}
                                                      name="summary"
                                            >

                                        </textarea>
                                            <input type="submit" value="save" style={{
                                                float: 'right', padding: '5px' +
                                                ' 20px 5px 20px'
                                            }}/>
                                        </form>
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
                                                history={this.props.history}

                                            />
                                        </div>
                                        <div className="individualUserPane">
                                            <UserProfileComponents
                                                data={this.props.data.oneUserById.fanOf}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                title={"Components I Follow"}
                                                controls={true}
                                                handleDeleteFan={this.handleDeleteFan}
                                                history={this.props.history}

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
                                                history={this.props.history}
                                            />
                                        </div>
                                        <div className="individualUserPane">
                                            <UserProfileFollow
                                                data={this.props.data.oneUserById.whoIFollow}
                                                userId={this.props.data.oneUserById.id}
                                                authenticatedId={this.props.authenticatedId}
                                                handleDeleteFollow={this.handleDeleteFollow}
                                                title={"Who I Follow"}
                                                controls={true}
                                                history={this.props.history}
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

