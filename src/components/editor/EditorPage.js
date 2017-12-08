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
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(1)}>
                            {this.state.panel1Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>
                    {this.state.panel1Collapsed ?
                        <div className="textHolderCollapsed">
                            <p className="closedText">Editor</p>
                        </div>
                        :
                        <p className="bodyText">Editor Panel</p>
                    }
                </div>
                <div className="centerPanelVertical">
                    <div className="toolbarBg" style={{"paddingLeft": "8px"}}>
                        <div className="editorRefreshButton">
                            <i class="refresh icon" size="mini"></i>
                        </div>
                    </div>
                    <p className="bodyText">Main Render Space</p>
                </div>
                <div className={this.state.panel3Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                    <div className="toolbarBg">
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(3)}>
                            {this.state.panel3Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>
                    {this.state.panel3Collapsed ?
                        <div className="textHolderCollapsed">
                            <p className="closedText">Tests</p>

                        </div>
                        :
                        <p className="bodyText">Testing Panel</p>
                    }
                </div>
                <div className={this.state.panel4Collapsed ? "panelsVerticalCollapsed" : "panelsVertical"}>
                    <div className="toolbarBg">
                        <div className="editorCollapseButton" onClick={() => this.handleToggle(4)}>
                            {this.state.panel4Collapsed ?
                                <i class="plus square outline icon" size="mini"></i> :
                                <i class="minus square outline icon" size="mini"></i>}
                        </div>
                    </div>

                    {this.state.panel4Collapsed ?
                        <div className="textHolderCollapsed">
                            <p className="closedText">Controls</p>
                        </div>
                        :
                        <p className="bodyText">Controls Panel</p>
                    }
                </div>
            </div>
        )
    }

}

