import React, {PureComponent} from "react";

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
            <div className="userProfileFeedItem" style={{display: "flex"}}>
                <div style={{width: "100px"}}>
                    <div className="ownerFace" style={{
                        backgroundImage: `url('${this.props.data.user.profile_picture}')`,
                        verticalAlign: "middle",
                        borderRadius: "50%",
                    }}
                         onClick={() => this.props.history.push(`/users/${this.props.data.user_id}`)}
                    />
                </div>
                <div style={{width: "700px"}}>
                    <p style={{color: 'grey'}}>{moment(this.props.data.created_at).fromNow()}</p>
                    <p style={{textTransform: "capitalize", fontWeight: 'bold'}}
                       onClick={() => this.props.history.push(`/components/${this.props.data.component_id}`)}
                    >
                        {this.sentenceGenerator()}
                        </p>
                </div>
            </div>
        )
    }
}
