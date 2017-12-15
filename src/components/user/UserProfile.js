import React, {PureComponent} from "react";
import {Loader, Button} from "semantic-ui-react";
import NavBar from "../../graphql/NavbarContainer";
import UserProfileFeedContainer from "../../graphql/UserProfileFeedContainer";
import UserProfileComponents from "./UserProfileComponents";
import UserProfileFollow from "./UserProfileFollow";
import ImageUpload from "./ImageUpload";
import loading from '../../img/loading.gif'

const moment = require("moment");

export default class UserProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            summary: "Loading...",
            display_name: "Loading...",
            iFollow: false,
            followSpinner: false,
        };
    }

    componentWillReceiveProps(props) {
        if (props.data.oneUserById) {
            this.setState({
                id: props.authenticatedId,
                display_name: props.data.oneUserById.display_name,
                summary: props.data.oneUserById.summary
            });
        }
        if (
            props.data.oneUserById.followers.find(follower => follower.id === this.props.authenticatedId)
        ) {
            this.setState({
                iFollow: true
            });
        } else {
            this.setState({
                iFollow: false
            });
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = async event => {
        if (!this.props.authenticatedId) return
        event.preventDefault();
        let response = await this.props.updateUser({
            variables: {
                id: this.state.id,
                summary: this.state.summary,
                display_name: this.state.display_name
            }
        });
    };

    handleDeleteFollow = async event => {
        if (!this.props.authenticatedId) return
        let followee = event.data.id;
        let follower = event.userId;
        console.log(followee, follower);
        let response = await this.props.deleteFollow({
            variables: {followee, follower}
        });
        this.props.client.resetStore();
    };

    handleDeleteFan = async id => {
        if (!this.props.authenticatedId) return
        let response = await this.props.deleteFan({
            variables: {id}
        });
        console.log(response);
        this.props.client.resetStore();
    };

    handleFollow = async () => {
        if (!this.props.authenticatedId) return
        this.setState({
            followSpinner: true,
        })
        let followee = this.props.data.oneUserById.id;
        let follower = this.props.authenticatedId;
        let response;
        if (this.state.iFollow) {
            response = await this.props.deleteFollow({
                variables: {followee, follower}
            });
            console.log(response)
        } else {
            response = await this.props.createFollow({
                variables: {followee, follower}
            });
        }
        let newResponse = await this.props.client.resetStore();
        if (newResponse) {
            this.setState({
                followSpinner: false,
            })
        }
        console.log(newResponse)
        return response;
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
                {this.props.data.loading
                    ? <div className="centeredSpinner">
                        <Loader active size="massive"/>
                    </div>
                    : <div className="userContainer">
                        <div>
                            <div className="profileBioTopBlack">
                                <div
                                    className="ownerFace"
                                    style={{
                                        backgroundImage: `url('${this.props.data.oneUserById.profile_picture}')`,
                                        margin: "30px",
                                        borderRadius: "50%",
                                        width: "200px",
                                        height: "200px",
                                        boxShadow: "1px 1px 1px 1px black"
                                    }}
                                />

                                <div className="topBioHolder2">
                                    {this.props.authenticatedId &&
                                    this.props.authenticatedId !== this.props.data.oneUserById.id
                                        ?
                                        !this.state.followSpinner
                                            ?
                                            this.state.iFollow
                                                ?
                                                <Button
                                                    color="grey"
                                                    content="Unfollow User"
                                                    width="150px"
                                                    style={{float: "right"}}
                                                    onClick={this.handleFollow}
                                                />
                                                :
                                                <Button
                                                    color="green"
                                                    content="Follow User"
                                                    width="150px"
                                                    style={{float: "right"}}
                                                    onClick={this.handleFollow}
                                                />
                                            :
                                            <img alt='loader' src={loading}
                                                 style={{width: '30px', float: 'right', marginRight: "30px"}}/>
                                        :
                                        ""
                                    }


                                    {this.props.userId === this.props.authenticatedId
                                        ? <form
                                            style={{
                                                maxWidth: "600px",
                                                margin: "0 auto 40px auto"
                                            }}
                                            onSubmit={this.handleSubmit}>
                                            <h3>display name:</h3>
                                            <input
                                                style={{
                                                    backgroundColor: "#3f3e3f",
                                                    color: "white",
                                                    fontSize: "50px",
                                                    height: "70px",
                                                    padding: "10px",
                                                    boxShadow: "1px 1px 1px black",
                                                    width: "100%"
                                                }}
                                                name="display_name"
                                                value={this.state.display_name}
                                                onChange={this.handleChange}
                                            />
                                            <input
                                                type="submit"
                                                value="save"
                                                style={{
                                                    float: "right",
                                                    padding: "5px" + " 20px 5px 20px"
                                                }}
                                            />
                                        </form>
                                        : <h1>
                                            {this.props.data.oneUserById.display_name}
                                        </h1>}

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            textAlign: "center"
                                        }}>
                                        <div style={{flexGrow: "1"}}>
                                            <h3>rank:</h3>
                                            <h4>
                                                {this.props.data.oneUserById.experience}
                                            </h4>
                                        </div>
                                        <div style={{flexGrow: "1"}}>
                                            <h3>member since:</h3>
                                            <h4>
                                                {moment(this.props.data.oneUserById.created_at).format("LLLL")}
                                            </h4>
                                        </div>
                                    </div>

                                    <h3>about me:</h3>
                                    {this.props.userId === this.props.authenticatedId
                                        ? <div>
                                            <form
                                                style={{
                                                    maxWidth: "600px",
                                                    margin: "10px auto"
                                                }}
                                                onSubmit={this.handleSubmit}>
														<textarea
                                                            style={{
                                                                backgroundColor: "#3f3e3f",
                                                                color: "white",
                                                                fontSize: "16px",
                                                                height: "70px",
                                                                padding: "10px",
                                                                boxShadow: "1px 1px 1px black",
                                                                width: "100%"
                                                            }}
                                                            value={this.state.summary}
                                                            onChange={this.handleChange}
                                                            name="summary"
                                                        />
                                                <input
                                                    type="submit"
                                                    value="save"
                                                    style={{
                                                        float: "right",
                                                        padding: "5px" + " 20px 5px 20px"
                                                    }}
                                                />
                                            </form>

                                            <ImageUpload userId={this.props.authenticatedId}/>
                                        </div>
                                        : <p>
                                            {this.props.data.oneUserById.summary}
                                        </p>}
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
                    </div>}
            </div>
        );
    }
}
