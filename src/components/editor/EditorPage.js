import React, {PureComponent} from "react";
import ReactDOM from "react-dom";

export default class EditorPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            panel1Collapsed: false,
            panel3Collapsed: false,
            panel4Collapsed: false,
        };
    }

    handleToggle = panelNumber => {
        if (panelNumber === 1) this.setState({panel1Collapsed: !this.state.panel1Collapsed});
        if (panelNumber === 3) this.setState({panel3Collapsed: !this.state.panel3Collapsed});
        if (panelNumber === 4) this.setState({panel4Collapsed: !this.state.panel4Collapsed});
    };

    render() {
        return (
            <div className="editorContainer">
                <div className={this.state.panel1Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                    <div className="toolbarBg">
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(1)}
                             style={this.state.panel1Collapsed ? {"backgroundColor": "#012ba3"} : {"backgroundColor": "#841300"}}>
                            {this.state.panel1Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>
                    {this.state.panel1Collapsed ?
                        <div style={{"marginTop": "70px", "textAlign": "center"}}>
                            <p className="closedText">E</p>
                            <p className="closedText">D</p>
                            <p className="closedText">I</p>
                            <p className="closedText">T</p>
                            <p className="closedText">O</p>
                            <p className="closedText">R</p>
                        </div>
                        :
                        <p className="bodyText">Editor Panel</p>
                    }
                </div>
                <div className="centerPanelVertical">
                    <div className="toolbarBg" style={{"paddingLeft": "8px"}}>
                        <div className="editorCollapseButton"
                             style={{"backgroundColor": "#159901"}}>
                            <i class="refresh icon" size="mini"></i>
                        </div>
                    </div>
                    <p className="bodyText">Main Render Space</p>
                </div>
                <div className={this.state.panel3Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                    <div className="toolbarBg">
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(3)}
                             style={this.state.panel3Collapsed ? {"backgroundColor": "#012ba3"} : {"backgroundColor": "#841300"}}>
                            {this.state.panel3Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>
                    {this.state.panel3Collapsed ?
                        <div style={{"marginTop": "70px", "textAlign": "center"}}>
                            <p className="closedText">T</p>
                            <p className="closedText">E</p>
                            <p className="closedText">S</p>
                            <p className="closedText">T</p>
                            <p className="closedText">S</p>
                        </div>
                        :
                        <p className="bodyText">Testing Panel</p>
                    }
                </div>
                <div className={this.state.panel4Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                    <div className="toolbarBg">
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(4)}
                             style={this.state.panel4Collapsed ? {"backgroundColor": "#012ba3"} : {"backgroundColor": "#841300"}}>
                            {this.state.panel4Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>

                    {this.state.panel4Collapsed ?
                        <div style={{"marginTop": "70px", "textAlign": "center"}}>
                            <p className="closedText">U</p>
                            <p className="closedText">S</p>
                            <p className="closedText">E</p>
                            <p className="closedText">R</p>
                        </div>
                        :
                        <p className="bodyText">User Panel</p>
                    }
                </div>
            </div>
        )
    }

}

