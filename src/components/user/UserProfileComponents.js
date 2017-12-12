import React, {PureComponent} from "react";
import {Loader} from 'semantic-ui-react'
import UserProfileComponentItem from './UserProfileComponentItem'

const moment = require('moment');

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
                    <div>
                        {this.props.data.map(component =>
                          <UserProfileComponentItem
                            data={component}
                          />
                        )}
                    </div>
                }
            </div>

        )
    }

}
