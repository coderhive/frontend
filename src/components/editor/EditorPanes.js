import React, {PureComponent} from "react";
import {Button} from 'semantic-ui-react'
import NavBar from '../../graphql/NavbarContainer'

const moment = require('moment');

export default class EditorPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            panel1Collapsed: false,
            panel3Collapsed: false,
        };
    }

    handleToggle = panelNumber => {
        if (panelNumber === 1) this.setState({panel1Collapsed: !this.state.panel1Collapsed});
        if (panelNumber === 3) this.setState({panel3Collapsed: !this.state.panel3Collapsed});
        if (panelNumber === 4) this.setState({panel4Collapsed: !this.state.panel4Collapsed});
    };



    render() {
        if (this.props.data.loading) return (<p>LOADING...</p>);
        return (
            <div>
                <NavBar />
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
                        <div className="boxDetail1">
                            <h1>{this.props.data.oneComponent.title}</h1>
                            <p>framework: {this.props.data.oneComponent.framework.toUpperCase()}</p>
                            <p>created: {moment(this.props.data.oneComponent.created_at).format('LLLL')}</p>
                            <p>updated: {moment(this.props.data.oneComponent.updated_at).format('LLLL')}</p>
                        </div>
                        <div className="boxDetail2">
                            <p>{this.props.data.oneComponent.tags.length} tags:</p>
                            {this.props.data.oneComponent.tags.map((thisTag) =>
                                <div className="tag" key={thisTag.id}>{thisTag.name}</div>)
                            }
                            <div className="tag">...</div>
                            <div style={{marginTop: "20px"}}>
                                <p>{this.props.data.oneComponent.fans.length} fans:</p>
                                {this.props.data.oneComponent.fans.map((thisFan) =>
                                    <div className="fan" key={thisFan.id}>{thisFan.display_name}</div>)
                                }
                                <div className="fan">...</div>
                            </div>
                        </div>
                        <div className="boxDetail3">
                            <Button
                                color='green'
                                content='Like'
                                icon='like outline'
                                label={{basic: true, color: 'green', pointing: 'left', content: '2,048'}}
                                style={{borderBottom: "25px"}}
                            />
                            <Button
                                color='black'
                                content='Dislike'
                                icon='dislike outline'
                                label={{basic: true, color: 'black', pointing: 'left', content: '2,048'}}
                            />
                        </div>
                    </div>
                </div>
                </div>

                )
                }

                }

