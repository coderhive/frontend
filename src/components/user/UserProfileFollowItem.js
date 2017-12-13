import React, {PureComponent} from "react";

export default class UserProfileComponentItem extends PureComponent {

    render() {
        return (
            <div style={{
                flexGrow: "1",
            }}>
                <div>
                    <div className="ownerFace"
                         style={{
                             backgroundImage: `url('${this.props.data.profile_picture}')`,
                             border: "1px solid grey",
                             margin: "30px 10px 10px 10px",
                             width: "100px",
                             height: "100px",
                         }}
                         onClick={() => this.props.history.push(`/users/${this.props.data.id}`)}
                    >
                        <div style={{
                            paddingTop: "10px",
                            textAlign: "center",
                            backgroundColor: "black",
                            width: '100px',
                        }}>
                            <h3 style={{
                                fontSize: "14px",
                                color: "white",
                                textTransform: "capitalize"
                            }}>{this.props.data.display_name}</h3>
                        </div>

                    {this.props.userId === this.props.authenticatedId && this.props.controls ?
                        <p
                            className="stopFollowButton2"
                            onClick={() => this.props.handleDeleteFollow(this.props)}
                        >
                            X
                        </p>
                        : null}
                    </div>




                </div>
            </div>
        )
    }
}
