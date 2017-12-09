import React, {PureComponent} from "react";
import {Button, Label} from 'semantic-ui-react'
import NavBar from '../../graphql/NavbarContainer'
import EditorComments from './EditorComments';

const moment = require('moment');

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
        };
    }

    handleToggle = panelNumber => {
        if (panelNumber === 1) this.setState({panel1Collapsed: !this.state.panel1Collapsed});
        if (panelNumber === 3) this.setState({panel3Collapsed: !this.state.panel3Collapsed});
        if (panelNumber === 4) this.setState({panel4Collapsed: !this.state.panel4Collapsed});
    };

    componentWillReceiveProps(props) {
        console.log(props.data.oneComponent.fans, '< fans')
        if (props.data.oneComponent) {
            let firstThreeFans = props.data.oneComponent.fans.slice(0, 3);
            firstThreeFans = firstThreeFans.map(fan => {
                let newFan = [...fan];
                newFan.display_name = fan.display_name.slice(0, 14);
                newFan.id = fan.id;
                return newFan
            });

            let firstThreeTags = props.data.oneComponent.tags.slice(0, 3);
            firstThreeTags = firstThreeTags.map(tag => {
                let newTag = [...tag];
                newTag.name = tag.name.slice(0, 14);
                newTag.id = tag.id;
                return newTag
            });

            let yesVotes = props.data.oneComponent.votes.filter(vote => vote.vote === 1);
            let noVotes = props.data.oneComponent.votes.filter(vote => vote.vote === -1);
            let myVote = null;
            if (this.props.authenticatedId) {
                myVote = props.data.oneComponent.votes.find(vote => vote.user_id === this.props.authenticatedId)
            }

            this.setState({
                tagsToDisplay: firstThreeTags,
                fansToDisplay: firstThreeFans,
                yesVotes: yesVotes.length,
                noVotes: noVotes.length,
                currentVote: myVote
            })
        }

    }

    renderVote() {
        if (!this.props.authenticatedId) return 'Please login to contribute';
        if (this.state.currentVote) {
            switch (this.state.currentVote.vote) {
                case 1:
                    return `You voted in favor of this one.`
                case -1:
                    return `You voted against this one.`
            }
        }
        return "You haven't voted yet"
    }

    render() {
        if (this.props.data.loading) return (<p>LOADING...</p>);
        if (!this.props.data.oneComponent) return (<p>LOADING...</p>);
        return (
            <div>
                <NavBar
                    authenticatedId={this.props.authenticatedId}
                    user={[this.props.loggedUser]}
                    onSubmit={this.props.handleLogin}
                    onLogout={this.props.handleLogOut}
                />
                <div className="editorContainer">
                    <div className="editorPaneContainer">
                        <div className={this.state.panel1Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                            <div className="toolbarBg">
                                <div className="editorCollapseButton" onClick={() => this.handleToggle(1)}>
                                    {this.state.panel1Collapsed ?
                                        <i className="plus square outline icon" size="mini"></i> :
                                        <i className="minus square outline icon" size="mini"></i>}
                                </div>
                            </div>
                            {this.state.panel1Collapsed ?
                                <div className="textHolderCollapsed">
                                    <p className="closedText">Editor</p>
                                </div>
                                :
                                <p className="bodyText">Code Editor</p>
                            }
                        </div>
                        <div className="panelsVertical">
                            <div className="toolbarBg" style={{"paddingLeft": "8px"}}>
                                <div className="editorRefreshButton">
                                    <i className="refresh icon" size="mini"></i>
                                </div>
                            </div>
                            <p className="bodyText">Main Render</p>
                        </div>
                        <div className={this.state.panel3Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                            <div className="toolbarBg">
                                <div className="editorCollapseButton" onClick={() => this.handleToggle(3)}>
                                    {this.state.panel3Collapsed ?
                                        <i className="plus square outline icon" size="mini"></i> :
                                        <i className="minus square outline icon" size="mini"></i>}
                                </div>
                            </div>
                            {this.state.panel3Collapsed ?
                                <div className="textHolderCollapsed">
                                    <p className="closedText">Styling</p>

                                </div>
                                :
                                <p className="bodyText">CSS Panel</p>
                            }
                        </div>
                    </div>
                    <div className="detailsBox">
                        <div className="pairHolder">
                        <div className="boxDetail1">
                            <h1>{this.props.data.oneComponent.title.slice(0, 30)}{this.props.data.oneComponent.title.length > 30 ? '...' : ''}</h1>
                            <p>framework: {this.props.data.oneComponent.framework.toUpperCase()}</p>
                            <p>created: {moment(this.props.data.oneComponent.created_at).format('LLLL')}</p>
                            <p>updated: {moment(this.props.data.oneComponent.updated_at).format('LLLL')}</p>
                        </div>
                        <div className="boxDetail2">
                            <div className="centerInBox" style={{marginTop: "6px"}}>
                                <p>Tags:</p>
                                {this.state.tagsToDisplay.map((thisTag) =>

                                    <Button
                                        compact
                                        color='yellow'
                                        content={thisTag.name}
                                        key={thisTag.id}
                                        style={{textTransform: 'capitalize', fontSize: '12px', paddingLeft: '4px', paddingRight: '4px'}}
                                    />)

                                }
                                {this.props.data.oneComponent.tags.length > this.state.tagsToDisplay.length ?
                                    <Button
                                        compact
                                        color='black'
                                        content={`${this.props.data.oneComponent.tags.length - this.state.tagsToDisplay.length}+`}
                                        style={{fontSize: '12px', paddingLeft: '4px', paddingRight: '4px'}}
                                    />
                                    :
                                    null
                                }

                                <div style={{marginTop: "10px"}}>
                                    <p>Followers:</p>
                                    {this.state.fansToDisplay.map((thisFan) =>
                                        <Button
                                            compact
                                            color='green'
                                            content={thisFan.display_name}
                                            key={thisFan.id}
                                            style={{textTransform: 'capitalize', fontSize: '12px', paddingLeft: '4px', paddingRight: '4px'}}

                                        />)
                                    }
                                    {this.props.data.oneComponent.fans.length > this.state.fansToDisplay.length ?
                                        <Button
                                            compact
                                            color='black'
                                            content={`${this.props.data.oneComponent.fans.length - this.state.fansToDisplay.length}+`}
                                            style={{fontSize: '12px', paddingLeft: '4px', paddingRight: '4px'}}
                                        />
                                        :
                                        null
                                    }
                                </div>
                            </div>


                        </div>
                        </div>
                        <div className="pairHolder">
                        <div className="boxDetail3">
                            <div className="buttonHolder">
                                <Button
                                    color='green'
                                    content=''
                                    icon='like outline'
                                    label={{
                                        basic: true,
                                        color: 'green',
                                        pointing: 'left',
                                        content: this.state.yesVotes
                                    }}
                                />
                            </div>
                            <div className="buttonHolder">
                                <Button
                                    color='black'
                                    content=''
                                    icon='dislike outline'
                                    label={{basic: true, color: 'black', pointing: 'left', content: this.state.noVotes}}
                                />
                            </div>
                            <p>{this.renderVote()}</p>
                        </div>
                        <div className="boxDetail4">
                            <div className="centerInBox">
                                <div className="ownerFace" style={{
                                    backgroundImage: `url('${this.props.data.oneComponent.owner.profile_picture}')`
                                }}></div>
                                <div style={{display: 'inline-block', marginRight: "20px"}}>
                                    <p>built by:</p>
                                    <h3>{this.props.data.oneComponent.owner.display_name.slice(0, 10)}</h3>
                                    <p>member since:</p>
                                    <p>{moment(this.props.data.oneComponent.owner.created_at).format('MM-YYYY')}</p>
                                </div>
                                <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                                    <div style={{margin: "6px"}}>
                                        <Button
                                            compact
                                            color='yellow'
                                            content='Follow Code'
                                            icon='bookmark'
                                        />
                                    </div>
                                    <div style={{margin: "6px"}}>
                                        <Button
                                            compact
                                            color='green'
                                            content='Follow User'
                                            icon='user'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="description">
                            <h2>Description</h2>
                            <p>{this.props.data.oneComponent.description}</p>
                        </div>
                    </div>
                </div>
                <EditorComments data={this.props.data}/>
            </div>

        )
    }

}

