import React, {PureComponent} from "react";
import {Button, Label} from 'semantic-ui-react'
const moment = require('moment');

export default class EditorComments extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            toggle1: false
        };
    }

    handleToggle = panelNumber => {
        console.log("toggling")
    };

    render() {
        if (this.props.data.loading) return (<p>LOADING...</p>);
        if (!this.props.data.oneComponent) return (<p>LOADING...</p>);
        return (
            <div className="commentsContainer">Here we are<br/>Here we are<br/>Here we are<br/>Here we are<br/>Here we are<br/></div>
        )
    }
}

