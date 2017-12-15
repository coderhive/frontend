import React, {PureComponent} from "react";
import {Loader, Button, Header, Icon, Modal} from "semantic-ui-react";
import NavBar from "../../graphql/NavbarContainer";
import ComponentLightboxContainer from "../../graphql/ComponentLightboxContainer";
import EditorComments from "./EditorComments";
import RenderComponent from "./render/RenderComponent";
import CodeEditor from "./codeEditor/CodeEditor";
import CSSPanel from "./css/CSSPanel";

const moment = require("moment");

export default class EditorPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            panel1Collapsed: false,
            panel3Collapsed: false,
            tagsToDisplay: [],
            fansToDisplay: [],
            yesVotes: 0,
            noVotes: 0,
            currentVote: null,
            editSettingsOn: false,
            iAmAFan: false,
            loaderToggle: false,
        };
    }

    ModalBasicExample = () => (
        <Modal trigger={<Button
            compact
            color="black"
            content="Delete Component"
            icon="archive"
            style={{fontSize: "11px", width: "150px", textAlign: "left"}}
        >
            Delete Component
        </Button>}
               basic
               size='large'
               closeIcon={true}
        >
            <Header icon='delete' content='Delete Component'/>
            <Modal.Content>
                <p>Are you sure you want to delete this component forever?</p>
            </Modal.Content>
            <Modal.Actions>
                {!this.state.loaderToggle
                    ?
                    <Button color='green' inverted
                            onClick={this.handleDelete}
                    >
                        <Icon
                            name='checkmark'
                        /> Yes
                    </Button>
                    :
                    null
                }
            </Modal.Actions>
        </Modal>
    )

    handleToggle = panelNumber => {
        if (panelNumber === 1) this.setState({panel1Collapsed: !this.state.panel1Collapsed});
        if (panelNumber === 3) this.setState({panel3Collapsed: !this.state.panel3Collapsed});
        if (panelNumber === 4) this.setState({panel4Collapsed: !this.state.panel4Collapsed});
    };

    componentWillReceiveProps(props) {
        if (props.data.oneComponent) {
            let firstThreeFans = props.data.oneComponent.fans.slice(0, 3);
            firstThreeFans = firstThreeFans.map(fan => {
                let newFan = [...fan];
                newFan.display_name = fan.display_name.slice(0, 14);
                newFan.id = fan.id;
                return newFan;
            });

            let firstThreeTags = props.data.oneComponent.tags.slice(0, 3);
            firstThreeTags = firstThreeTags.map(tag => {
                let newTag = [...tag];
                newTag.name = tag.name.slice(0, 14);
                newTag.id = tag.id;
                return newTag;
            });

            let yesVotes = props.data.oneComponent.votes.filter(vote => vote.vote === 1);
            let noVotes = props.data.oneComponent.votes.filter(vote => vote.vote === -1);
            let myVote = null;
            if (this.props.authenticatedId) {
                myVote = props.data.oneComponent.votes.find(
                    vote => vote.user_id === this.props.authenticatedId
                );
            }

            let iAmAFan = false;
            if (props.data.oneComponent.fans.find(user => user.user_id === this.props.authenticatedId)) {
                iAmAFan = true;
            }


            this.setState({
                tagsToDisplay: firstThreeTags,
                fansToDisplay: firstThreeFans,
                yesVotes: yesVotes.length,
                noVotes: noVotes.length,
                currentVote: myVote,
                iAmAFan
            });
        }
    }

    renderVote() {
        if (!this.props.authenticatedId) return "Please login to contribute";
        if (this.state.currentVote) {
            switch (this.state.currentVote.vote) {
                case 1:
                    return `You voted in favor of this one.`;
                case -1:
                    return `You voted against this one.`;
                default:
                    return "Your vote hasn't been counted yet.";
            }
        }
        return "You haven't voted yet";
    }

    handleDelete = async () => {
        this.setState({
            loaderToggle: true
        });
        let response = await this.props.deleteComponent({
            variables: {id: this.props.data.oneComponent.id}
        });
        this.setState({
            loaderToggle: false
        });
        this.props.history.push('/components/');
        return response;
    };

    toggleEdit = () => {
        this.setState({editSettingsOn: !this.state.editSettingsOn});
    };

    handleRefresh = () => {
        this.setState({time: Date.now()});
    };

    handleEdit = (type, code) => {
        if (type === "jsx") {
            this.props.updateComponentCode({
                variables: {
                    id: this.props.data.oneComponent.id,
                    code,
                    css: this.props.data.oneComponent.css
                }
            });
        }
        if (type === "css") {
            this.props.updateComponentCode({
                variables: {
                    id: this.props.data.oneComponent.id,
                    code: this.props.data.oneComponent.code,
                    css: code
                }
            });
        }
    };

    handleVote = async (vote) => {
        if (!this.props.authenticatedId) return
        let user_id = this.props.authenticatedId;
        let component_id = this.props.data.oneComponent.id;
        let response;
        console.log(this.state.currentVote)
        if (this.state.currentVote && this.state.currentVote.vote === vote) {
            response = await this.props.deleteVote({
                variables: {user_id, component_id}
            });
        } else {
            response = await this.props.createVote({
                variables: {user_id, component_id, vote}
            });

        }
        this.props.client.resetStore()
        return response
    };

    handleFan = async () => {
        let user_id = this.props.authenticatedId;
        let component_id = this.props.data.oneComponent.id;
        let response;
        if (this.state.iAmAFan) {
            let id = this.props.data.oneComponent.fans.find(fan => fan.user_id === this.props.authenticatedId).id;
            response = await this.props.deleteFan({
                variables: {id}
            })
        } else {
            response = await this.props.createFan({
                variables: {user_id, component_id}
            })
        }
        this.props.client.resetStore()
        return response;
    }

    render() {
        if (this.state.editSettingsOn)
            return (
                <ComponentLightboxContainer
                    authenticatedId={this.props.authenticatedId}
                    toggleEdit={this.toggleEdit}
                    component_id={this.props.data.oneComponent.id}
                    title={this.props.data.oneComponent.title}
                    description={this.props.data.oneComponent.description || ""}
                />
            );
        if (this.props.data.loading) return <p>LOADING...</p>;
        if (!this.props.data.oneComponent) return <p>LOADING...</p>;
        if (this.props.data.oneComponent.status === "deleted")
            return (
                <p style={{color: "white", margin: "200px", textAlign: "center"}}>Deleted Component</p>
            );
        return (
            <div>
                <NavBar
                    authenticatedId={this.props.authenticatedId}
                    user={[this.props.loggedUser]}
                    onSubmit={this.props.handleLogin}
                    onLogout={this.props.handleLogOut}
                />
                <div className="editorContainer">
                    {this.state.loaderToggle ?
                        <div className="centeredSpinner">
                            <Loader
                                active
                                size="massive"
                            />
                        </div>
                        :
                        null
                    }
                    <div className="editorPaneContainer">
                        <div
                            className={this.state.panel1Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                            <div className="toolbarBg">
                                <div className="editorCollapseButton" onClick={() => this.handleToggle(1)}>
                                    {this.state.panel1Collapsed
                                        ? <i className="plus square outline icon" size="mini"/>
                                        : <i className="minus square outline icon" size="mini"/>}
                                </div>
                            </div>
                            {this.state.panel1Collapsed
                                ? <div className="textHolderCollapsed">
                                    <p className="closedText">Editor</p>
                                </div>
                                : <div
                                    className="bodyText"
                                    style={{
                                        margin: "0",
                                        overflow: "auto"
                                    }}>
                                    <CodeEditor
                                        code={this.props.data.oneComponent.code}
                                        toggle={this.state.panel1Collapsed}
                                        handleChange={this.handleEdit}
                                        owner={this.props.data.oneComponent.owner_user_id}
                                        authenticatedId={this.props.authenticatedId}
                                    />
                                </div>}
                        </div>
                        <div className="panelsVertical">
                            <div className="toolbarBg" style={{paddingLeft: "8px"}}>
                                <div className="editorRefreshButton" onClick={this.handleRefresh}>
                                    <i className="refresh icon" size="mini"/>
                                </div>
                            </div>
                            <p
                                className="bodyText"
                                style={{
                                    height: "80%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "auto"
                                }}>
                                <RenderComponent
                                    id={this.props.data ? this.props.data.oneComponent.id : null}
                                    time={this.state.time ? this.state.time : null}
                                />
                            </p>
                        </div>
                        <div
                            className={this.state.panel3Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                            <div className="toolbarBg">
                                <div className="editorCollapseButton" onClick={() => this.handleToggle(3)}>
                                    {this.state.panel3Collapsed
                                        ? <i className="plus square outline icon" size="mini"/>
                                        : <i className="minus square outline icon" size="mini"/>}
                                </div>
                            </div>
                            {this.state.panel3Collapsed
                                ? <div className="textHolderCollapsed">
                                    <p className="closedText">Styling</p>
                                </div>
                                : <div
                                    className="bodyText"
                                    style={{
                                        margin: "0",
                                        overflow: "auto"
                                    }}>
                                    <CSSPanel
                                        css={this.props.data.oneComponent.css}
                                        handleChange={this.handleEdit}
                                        owner={this.props.data.oneComponent.owner_user_id}
                                        authenticatedId={this.props.authenticatedId}
                                    />
                                </div>}
                        </div>
                    </div>
                    <div className="detailsBox">
                        <div className="pairHolder">
                            <div className="boxDetail1">
                                <h1>
                                    {this.props.data.oneComponent.title.slice(0, 30)}
                                    {this.props.data.oneComponent.title.length > 30 ? "..." : ""}
                                </h1>
                                <p>
                                    framework: {this.props.data.oneComponent.framework.toUpperCase()}
                                </p>
                                <p>
                                    created: {moment(this.props.data.oneComponent.created_at).format("LLLL")}
                                </p>
                                <p>
                                    updated: {moment(this.props.data.oneComponent.updated_at).format("LLLL")}
                                </p>
                            </div>
                            <div className="boxDetail2">
                                <div className="centerInBox" style={{marginTop: "6px"}}>
                                    <p>Tags:</p>
                                    {this.state.tagsToDisplay.map(thisTag =>
                                        <Button
                                            compact
                                            color="yellow"
                                            content={thisTag.name}
                                            key={thisTag.id}
                                            style={{
                                                textTransform: "capitalize",
                                                fontSize: "12px",
                                                paddingLeft: "4px",
                                                paddingRight: "4px"
                                            }}
                                        />
                                    )}
                                    {this.props.data.oneComponent.tags.length > this.state.tagsToDisplay.length
                                        ? <Button
                                            compact
                                            color="black"
                                            content={`${this.props.data.oneComponent.tags.length -
                                            this.state.tagsToDisplay.length}+`}
                                            style={{fontSize: "12px", paddingLeft: "4px", paddingRight: "4px"}}
                                        />
                                        : null}

                                    <div style={{marginTop: "10px"}}>
                                        <p>Followers:</p>
                                        {this.state.fansToDisplay.map(thisFan =>
                                            <Button
                                                compact
                                                color="green"
                                                content={thisFan.display_name}
                                                key={thisFan.id}
                                                style={{
                                                    textTransform: "capitalize",
                                                    fontSize: "12px",
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px"
                                                }}
                                            />
                                        )}
                                        {this.props.data.oneComponent.fans.length > this.state.fansToDisplay.length
                                            ? <Button
                                                compact
                                                color="black"
                                                content={`${this.props.data.oneComponent.fans.length -
                                                this.state.fansToDisplay.length}+`}
                                                style={{fontSize: "12px", paddingLeft: "4px", paddingRight: "4px"}}
                                            />
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pairHolder">
                            <div className="boxDetail3">
                                <div className="buttonHolder">
                                    <Button
                                        color="green"
                                        content=""
                                        icon="like outline"
                                        label={{
                                            basic: true,
                                            color: "green",
                                            pointing: "left",
                                            content: this.state.yesVotes
                                        }}
                                        onClick={() => this.handleVote(1)}
                                    />
                                </div>
                                <div className="buttonHolder">
                                    <Button
                                        color="black"
                                        content=""
                                        icon="dislike outline"
                                        label={{
                                            basic: true,
                                            color: "black",
                                            pointing: "left",
                                            content: this.state.noVotes
                                        }}
                                        onClick={() => this.handleVote(-1)}
                                    />
                                </div>
                                <p>
                                    {this.renderVote()}
                                </p>
                            </div>
                            <div className="boxDetail4">
                                {this.props.data.oneComponent.owner_user_id === this.props.authenticatedId
                                    ? <div className="centerInBox">
                                        <div
                                            className="ownerFace"
                                            style={{
                                                backgroundImage: `url('${this.props.data.oneComponent.owner
                                                    .profile_picture}')`,
                                                verticalAlign: "middle"
                                            }}
                                            onClick={() => this.props.history.push(`/users/${this.props.data.oneComponent.owner_user_id}`)}
                                        />
                                        <div style={{display: "inline-block", verticalAlign: "middle"}}>
                                            <div style={{margin: "3px"}}>
                                                <Button
                                                    compact
                                                    color="green"
                                                    content="Edit Information"
                                                    icon="info circle"
                                                    style={{fontSize: "11px", width: "150px", textAlign: "left"}}
                                                    onClick={() => this.toggleEdit()}
                                                />
                                            </div>
                                            <div style={{margin: "3px"}}>

                                                {this.ModalBasicExample()}

                                                {/*<Button*/}
                                                {/*compact*/}
                                                {/*color="black"*/}
                                                {/*content="Delete Component"*/}
                                                {/*icon="delete"*/}
                                                {/*style={{fontSize: "11px", width: "150px", textAlign: "left"}}*/}
                                                {/*onClick={() => this.handleDelete()}*/}
                                                {/*/>*/}


                                            </div>
                                        </div>
                                    </div>
                                    : <div className="centerInBox">
                                        <div
                                            className="ownerFace"
                                            style={{
                                                backgroundImage: `url('${this.props.data.oneComponent.owner
                                                    .profile_picture}')`
                                            }}
                                            onClick={() => this.props.history.push(`/users/${this.props.data.oneComponent.owner_user_id}`)}
                                        />
                                        <div style={{display: "inline-block", marginRight: "20px"}}>
                                            <p>built by:</p>
                                            <h3>
                                                {this.props.data.oneComponent.owner.display_name.slice(0, 10)}
                                            </h3>
                                            <p>experience:</p>
                                            <p>
                                                {this.props.data.oneComponent.owner.experience}
                                            </p>
                                        </div>
                                        <div
                                            style={{display: "inline-block", verticalAlign: "top", paddingTop: "20px"}}>
                                            {this.props.authenticatedId ?
                                                this.state.iAmAFan ?
                                                    <Button
                                                        compact color="grey"
                                                        content="Unfollow Code"
                                                        icon="bookmark"
                                                        onClick={this.handleFan}
                                                        style={{width: "150px"}}
                                                    />
                                                    :
                                                    <Button
                                                        compact
                                                        color="yellow"
                                                        content="Follow Code"
                                                        icon="bookmark"
                                                        onClick={this.handleFan}
                                                        style={{width: "150px"}}
                                                    />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        <div className="description">
                            <h2>Description</h2>
                            <p>
                                {this.props.data.oneComponent.description}
                            </p>
                        </div>
                    </div>
                </div>
                <EditorComments
                    data={this.props.data}
                    authenticatedId={this.props.authenticatedId}
                    history={this.props.history}
                    createComment={this.props.createComment}
                    client={this.props.client}
                />
            </div>
        );
    }
}
