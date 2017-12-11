import React, {PureComponent} from "react";
import {Button} from 'semantic-ui-react'
import NavBar from '../../graphql/NavbarContainer'

const moment = require('moment');

export default class UserProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            stateThing: false,
        };
    }

    handleToggle = thisNumber => {
        console.log(thisNumber)
    };

    componentWillReceiveProps(props) {
        console.log("props", props.data.oneUserById)
    }

    render() {
        console.log('foo bar')
        if (this.props.data.loading) return (<p style={{color: "white"}}>LOADING...</p>);
        if (!this.props.data.oneUserById) return (<p>LOADING USER DATA...</p>);
        return (
            <div style={{color: "white"}}>
                <p>{this.props.data.oneUserById.id}</p>
                <p>{this.props.data.oneUserById.display_name}</p>
                <p>{this.props.data.oneUserById.summary}</p>
                <p>{this.props.data.oneUserById.experience}</p>
                <p>{this.props.data.oneUserById.profile_picture}</p>
                <p>{this.props.data.oneUserById.created_at}</p>

                {this.props.data.oneUserById.components.map(component =>
                    <p key={component.id}>{component.title}</p>
                )}

                {this.props.data.oneUserById.fanOf.map(component =>
                    <p key={component.id}>{component.title}</p>
                )}

                {this.props.data.oneUserById.followers.map(follower =>
                    <p key={follower.id}>{follower.display_name}</p>
                )}

                {this.props.data.oneUserById.whoIFollow.map(user =>
                    <p key={user.id}>{user.display_name}</p>
                )}

                {this.props.data.oneUserById.activities.map(activity =>
                    <div key={activity.id}>
                    <p>{activity.type}</p>
                    <p>{activity.user_id}</p>
                    <p>{activity.component_id}</p>
                    <p>{activity.comment ? activity.comment.comment : ' -- '}</p>
                    </div>
                )}
            </div>

        )
    }

}

