import React, {PureComponent} from "react";
import UserProfileFollowItem from './UserProfileFollowItem'

export default class UserProfileComponent extends PureComponent {

    render() {
        return (
            <div>
                <h3 style={{margin: "20px 10px 10px 20px"}}>{this.props.title}</h3>
                {!this.props.data ?
                    <div style={{padding: "30px"}}>
                        Loading...
                    </div>
                    :
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        verticalAlign: "middle"
                    }}>
                        {this.props.data.map(user =>
                          <UserProfileFollowItem
                            data={user}
                            userId={this.props.userId}
                            authenticatedId={this.props.authenticatedId}
                            controls={this.props.controls}
                            handleDeleteFollow={this.props.handleDeleteFollow}
                            history={this.props.history}
                          />
                        )}
                    </div>
                }
            </div>

        )
    }

}
