import React, {PureComponent} from "react";
import UserProfileFeedItem from './UserProfileFeedItem'

export default class UserProfileFeed extends PureComponent {


    render() {
        return (
            <div>
                <h3>User Feed</h3>
                {this.props.data.loading ?
                    <div style={{padding: "30px"}}>
                        {/*<Loader*/}
                            {/*active*/}
                            {/*size="medium"*/}
                        {/*/>*/}
                        Loading...
                    </div>
                    :
                    <div>
                        {this.props.data.activities.map(activity =>
                        <UserProfileFeedItem
                            data={activity}
                            key={activity.id}
                        />
                        )}
                        <p style={{
                            textTransform: "uppercase",
                            letterSpacing: "4px",
                            wordSpacing: "10px",
                            textAlign: "center",
                            color: "grey"
                        }}>~ End of Feed ~</p>
                    </div>
                }
            </div>

        )
    }

}
