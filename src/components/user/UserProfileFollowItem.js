import React, {PureComponent} from "react";
import {Loader} from 'semantic-ui-react'

const moment = require('moment');

export default class UserProfileComponentItem extends PureComponent {

    render() {
        return (
            <div style={{
                flexGrow: "1",
            }}>
                <div className="ownerFace"
                     style={{
                         backgroundImage: `url('${this.props.data.profile_picture}')`,
                         border: "1px solid grey",
                         margin: "30px 10px 10px 10px",
                         width: "100px",
                         height: "100px",
                     }}>
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

                </div>
            </div>
        )
    }
}
