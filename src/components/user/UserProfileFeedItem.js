import React, {PureComponent} from "react";
import {Loader} from 'semantic-ui-react'

const moment = require('moment');

export default class UserProfileFeedItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
        };
    }

    sentenceGenerator = () => {
        switch (this.props.data.type) {
            case 'newComponent':
                return `${this.props.data.user.display_name} created a new component called ${this.props.data.component.title}.`

            case 'updatedComponent':
                return `${this.props.data.user.display_name} updated ${this.props.data.component.title}.`

            case 'newVote':
                return `${this.props.data.user.display_name} voted on ${this.props.data.component.title}.`

            case 'newComment':
                return `${this.props.data.user.display_name} posted a new comment on the ${this.props.data.component.title} component.
                It says, "${this.props.data.comment.comment}".`

            default:
                return "Reload Page"
        }
    };

    render() {
        return (
            <div className="userProfileFeedItem">
                <div style={{float: 'left', width: '100px'}}>
                    <div className="ownerFace" style={{
                        backgroundImage: `url('${this.props.data.user.profile_picture}')`,
                        verticalAlign: "middle"
                    }} />
                </div>
                <div>
                    <p style={{fontWeight: 'bold'}}>{moment(this.props.data.created_at).format('LLLL')}</p>
                    <p style={{textTransform: "capitalize"}}>{this.sentenceGenerator()}</p>
                </div>
            </div>
        )
    }
}
